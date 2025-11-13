import { useEffect, useState } from "react";
import { FlightData } from "../type/FlightData";
import { getAllFlights } from "../api/flightDataService";
import * as turf from "@turf/turf";
import { Layer, Source, useMap } from "react-map-gl";
import airplaneIcon from "@/assets/images/icons/TrackIcons/ic_MT_tren_khong.png";

const airplaneSrc = new Image();
airplaneSrc.src = airplaneIcon;

export const FlightLayer = () => {
     const [sourceDraw, setSourceDraw] = useState<any>(turf.featureCollection([]));
     const { current: map } = useMap();

     // useEffect(() => {
     //      const flightGetInterval = setInterval(() => {
     //           getAllFlights().then((res: FlightData[]) => {
     //                const features = res.map((flightInfo) => {
     //                     const { lng, lat, alt, spd, hd } = flightInfo;
     //                     return turf.point([lng, lat], { alt, spd, heading: hd });
     //                });
     //                setSourceDraw(turf.featureCollection(features));
     //           });
     //      }, 11000);

     //      return () => {
     //           clearInterval(flightGetInterval);
     //      };
     // }, []);

     const onMapLoad = () => {
          console.log("on map load ");
          map.getMap().addImage("airplane", airplaneSrc, { sdf: true });
     };

     useEffect(() => {
          if (!map) return;

          map.on("mouseenter", ["LAYER_PLANE_LIST"], () => {
               map.getCanvas().style.cursor = "pointer";
          });

          map.on("style.load", (e) => {
               if (!e.target.hasImage("airplane")) {
                    e.target.addImage("airplane", airplaneSrc, { sdf: true });
               }
          });

          map.on("mouseleave", ["LAYER_PLANE_LIST"], () => {
               map.getCanvas().style.cursor = "default";
          });

          map.on("load", onMapLoad);
     }, [map]);

     return (
          <>
               <Source type="geojson" data={sourceDraw} cluster clusterMaxZoom={3}>
                    <Layer
                         id="LAYER_PLANE_LIST"
                         type="symbol"
                         layout={{
                              "icon-image": "airplane",
                              "icon-size": 0.15,
                              "icon-allow-overlap": true,
                              "icon-rotate": ["get", "heading"],
                         }}
                         paint={{
                              "icon-color": "red",
                              "icon-halo-width": 0.55,
                              "icon-halo-blur": 1,
                         }}
                    />
               </Source>
          </>
     );
};
