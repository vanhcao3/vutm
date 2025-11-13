import { RootState } from "@/slices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as turf from "@turf/turf";
import { getAllHubs } from "../api/lockerService";
import { setHubList, setHubs } from "@/slices/sd/hubSlice";
import { convertArrayToObject, reverseLatLong } from "@/utils/convert";
import { Layer, Source } from "react-map-gl";

export const HubLayer = () => {
     const hubs = useSelector((state: RootState) => state.hub.hubs);
     const [sourceDraw, setSourceDraw] = useState<any>(turf.featureCollection([]));
     const dispatch = useDispatch();

     // useEffect(() => {
     //      getAllHubs().then((res) => {
     //           dispatch(setHubList(res));
     //           const HubObjects = convertArrayToObject(res);
     //           dispatch(setHubs(HubObjects));
     //      });
     // }, []);

     useEffect(() => {
          const features = [];
          Object.values(hubs).forEach((hubInfo) => {
               features.push(
                    turf.point(reverseLatLong(hubInfo.position) as [number, number], {
                         name: hubInfo.name,
                         id: hubInfo.id,
                    })
               );
               if (hubInfo.lockers && hubInfo.lockers.length) {
                    hubInfo.lockers.forEach((childHub) => {
                         features.push(
                              turf.point(reverseLatLong(childHub.position) as [number, number], {
                                   name: childHub.name,
                                   id: childHub.id,
                              })
                         );
                    });
               }
          });
          setSourceDraw(turf.featureCollection(features));
     }, [hubs]);

     return (
          <>
               <Source type="geojson" data={sourceDraw}>
                    <Layer type="circle" paint={{ "circle-radius": 5, "circle-color": "blue" }} />
                    <Layer
                         type="symbol"
                         layout={{
                              "text-field": ["get", "name"],
                              "text-size": 10,
                              "text-offset": [5, 1],
                              "text-variable-anchor": ["top"],
                         }}
                    />
               </Source>
          </>
     );
};
