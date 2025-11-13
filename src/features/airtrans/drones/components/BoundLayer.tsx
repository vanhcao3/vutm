import { RootState } from "@/slices";
import { useSelector } from "react-redux";

import { Layer, Source } from "react-map-gl";
import * as turf from "@turf/turf";
import { useCallback, useEffect, useState } from "react";
import { searchHistoryById } from "../api/droneService";

export const BoundLayer = () => {
     const selectedTrackId = useSelector((state: RootState) => state.track.selected_id);

     const tracks = useSelector((state: RootState) => state.track.tracks);
     const currentTrack = tracks[selectedTrackId];
     const [sourceHistoryDraw, setSourceHistoryDraw] = useState<any>(turf.featureCollection([]));

     const getTrackHistory = useCallback((trackId: number) => {
          const historyFeatures: Array<any> = [];
          searchHistoryById(trackId).then((histories) => {
               histories.forEach((historyInfo) => {
                    const {
                         location_json: {
                              geodetic_position: { longitude, latitude },
                         },
                    } = historyInfo;
                    historyFeatures.push(
                         turf.point([longitude, latitude], { type: "history_point" })
                    );
               });
               setSourceHistoryDraw(turf.featureCollection(historyFeatures));
          });
     }, []);

     useEffect(() => {
          if (selectedTrackId <= 0) {
               setSourceHistoryDraw(turf.featureCollection([]));
               return;
          }
          console.log("selectedTrackId", selectedTrackId);
          const historyInterval = setInterval(() => getTrackHistory(selectedTrackId), 1000);

          return () => {
               clearInterval(historyInterval);
          };
     }, [selectedTrackId]);

     if (!currentTrack) return <></>;

     if (selectedTrackId < 0) return <></>;
     const {
          position: { longitude = 0, latitude = 0 },
     } = currentTrack || {};

     return (
          <>
               <Source type="geojson" data={sourceHistoryDraw}>
                    <Layer type="circle" paint={{ "circle-color": "yellow", "circle-radius": 4 }} />
                    <Layer type="line" paint={{ "line-color": "black", "line-width": 2 }} />
               </Source>
               <Source
                    type="geojson"
                    data={turf.featureCollection([
                         //  turf.point(currentCenter),
                         turf.circle([longitude, latitude] as number[], 0.05, { steps: 200 }),
                    ])}
               >
                    <Layer type="line" paint={{ "line-width": 3, "line-color": "red" }} />
               </Source>

               <Source
                    type="geojson"
                    data={turf.featureCollection([turf.point([longitude, latitude])])}
               >
                    <Layer type="circle" paint={{ "circle-color": "red", "circle-radius": 5 }} />
               </Source>
          </>
     );
};
