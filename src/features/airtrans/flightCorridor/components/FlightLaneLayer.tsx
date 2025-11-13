import { RootState } from "@/slices";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as turf from "@turf/turf";
import { Layer, Source } from "react-map-gl";

export const FlightLaneLayer = () => {
     const flightLanes = useSelector((state: RootState) => state.flightLane.flight_lanes);
     console.log("flightLanes", flightLanes);

     const [sourceDraw, setSourceDraw] = useState<any>(turf.featureCollection([]));
     const [bufferData, setBufferData] = useState<any>(turf.featureCollection([]));

     useEffect(() => {
          const features = [];
          const bufferFeatures = [];
          Object.values(flightLanes)
               .filter((lane) => lane.created_by === "f0")
               .forEach((lane) => {
                    const laneWaypoints = [[lane.position[0].longitude, lane.position[0].latitude]];
                    for (let i = 1; i < lane.position.length; i++) {
                         const prevWaypoint = lane.position[i - 1];
                         const currentWaypoint = lane.position[i];
                         if (
                              prevWaypoint.longitude !== currentWaypoint.longitude ||
                              prevWaypoint.latitude !== currentWaypoint.latitude
                         ) {
                              laneWaypoints.push([
                                   lane.position[i].longitude,
                                   lane.position[i].latitude,
                              ]);
                         }
                    }

                    //    console.log("laneWaypoints", laneWaypoints);
                    features.push(turf.lineString(laneWaypoints));
                    bufferFeatures.push(
                         turf.buffer(turf.lineString(laneWaypoints), 10, { units: "meters" })
                    );
                    //    features.push(turf.buffer(turf.lineString(laneWaypoints), 10));
               });
          setSourceDraw(turf.featureCollection(features));
          setBufferData(turf.featureCollection(bufferFeatures));
     }, [flightLanes]);

     return (
          <>
               <Source type="geojson" data={bufferData}>
                    <Layer type="fill" paint={{ "fill-opacity": 1, "fill-color": "pink" }} />
               </Source>
               <Source type="geojson" data={sourceDraw}>
                    <Layer type="line" paint={{ "line-width": 2 }} />
               </Source>
          </>
     );
};
