import { useContext, useEffect, useState } from "react";
import { Source, Layer, useMap, GeoJSONSource } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { Track } from "../TrackLayer/types";
import * as turf from "@turf/turf";
import { setSelectedTrackDetail } from "@/slices/sd/mapTrackSlice";
import { radian2Degree } from "@/utils/convert";

export const TrackSelectLayer = (props: any) => {
     const { map } = useMap();
     const { fullMapTrack, selectedTrackIds } = useSelector((state: any) => state.mapTrack);
     const [selectedTracks, setSelectedTracks] = useState<Array<Track>>([]);
     const dispatch = useDispatch();

     useEffect(() => {
          if (!map || !fullMapTrack) return;
          const tracks: Track[] = [];
          selectedTrackIds.forEach((item: number) => {
               const currentTrack = fullMapTrack.get(item);
               if (currentTrack) tracks.push(currentTrack);
          });

          setSelectedTracks(tracks);
     }, [fullMapTrack, selectedTrackIds, map]);

     useEffect(() => {
          if (!map) return;

          const features: Array<any> = [];

          selectedTracks.forEach((track: any) => {
               const { longitude: lng, latitude: lat } = track;
               const { trackNumber: trackId = 0 } = track;
               features.push(
                    turf.point([radian2Degree(lng), radian2Degree(lat)], { trackInfo: trackId })
               );
          });

          if (map.getSource("SOURCE_SELECTED_TRACK")) {
               const geoSource = map.getSource("SOURCE_SELECTED_TRACK") as GeoJSONSource;
               geoSource.setData(turf.featureCollection(features));
          }
     }, [selectedTracks, map]);

     // useEffect(() => {
     //      if (map && isMapLoaded) {
     //           if (!map.getSource("SOURCE_SELECTED_TRACK")) {
     //                map.addSource("SOURCE_SELECTED_TRACK", {
     //                     type: "geojson",
     //                     data: {
     //                          type: "FeatureCollection",
     //                          features: [],
     //                     },
     //                     buffer: 0,
     //                     cluster: true,
     //                     clusterMaxZoom: 3,
     //                });

     //                map.addLayer({
     //                     id: "TRACK_LAYER_SELECTED",
     //                     type: "circle",
     //                     source: "SOURCE_SELECTED_TRACK",
     //                     filter: ["!", ["has", "point_count"]],
     //                     paint: {
     //                          "circle-stroke-color": "red",
     //                          "circle-stroke-width": 1,
     //                          "circle-opacity": 0,
     //                          "circle-radius": 12,
     //                     },
     //                });
     //           }
     //      }
     // }, [map, isMapLoaded]);

     useEffect(() => {
          const lastestTrackId = selectedTrackIds[selectedTrackIds.length - 1];
          const track = fullMapTrack.get(lastestTrackId);
          if (track) dispatch(setSelectedTrackDetail(track));
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [fullMapTrack, selectedTrackIds]);

     return (
          <Source
               id="SOURCE_SELECTED_TRACK"
               type="geojson"
               data={{
                    type: "FeatureCollection",
                    features: [],
               }}
               buffer={0}
               cluster
               clusterMaxZoom={3}
          >
               <Layer
                    id="TRACK_LAYER_SELECTED"
                    type="circle"
                    source="SOURCE_SELECTED_TRACK"
                    filter={["!", ["has", "point_count"]]}
                    paint={{
                         "circle-stroke-color": "red",
                         "circle-stroke-width": 1,
                         "circle-opacity": 0,
                         "circle-radius": 12,
                    }}
               />
          </Source>
     );
};
