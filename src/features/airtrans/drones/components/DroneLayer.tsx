/* eslint-disable testing-library/render-result-naming-convention */
import droneIcon1Src from "@/assets/drone_img_1.png";
import { useEffect, useState } from "react";
import { Drone } from "../types";
import * as turf from "@turf/turf";
import { getAllTracks } from "../api/droneService";
import { useMap } from "react-map-gl/dist/esm/components/use-map";
import { MapMouseEvent } from "mapbox-gl";
import { Layer, Source } from "react-map-gl";
import { useDispatch } from "react-redux";
import { TrackWorker } from "@/workers/track.worker";
import WorkerBuilder from "@/workers/worker-builder";
import { setCurrentTrackId, setUpdatedTracks } from "@/slices/sd/trackSlice";
import { BoundLayer } from "./BoundLayer";

const trackWorkerInstance = new WorkerBuilder(TrackWorker);

const droneIcon = new Image();
droneIcon.src = droneIcon1Src;
const FOCUS_AREA = [
     [105.51818712551693, 21.008616550690675],
     [105.52404520875757, 21.010154607908333],
     [105.5351206473868, 21.018869965922804],
     [105.5421686537876, 21.02228761434729],
     [105.5496285566644, 21.023611932051296],
     [105.55351869006819, 21.00729209982525],
     [105.55525780852918, 20.998875153469015],
     [105.5539763528198, 20.997080616207384],
     [105.55365598889296, 20.994986962137574],
     [105.53081861750508, 20.99532878521549],
     [105.52779804333471, 20.99549969646185],
     [105.52587585977153, 20.998960607085678],
     [105.52486900171345, 21.002421437468342],
     [105.52139076478949, 21.007505721727924],
     [105.52152806361426, 21.009257409792],
     [105.52358754600408, 21.01002643707946],
     [105.51818712551693, 21.008616550690675],
];

export const DroneLayer = () => {
     const [sourceDraw, setSourceDraw] = useState<any>(turf.featureCollection([]));

     const dispatch = useDispatch();
     const { current: map } = useMap();

     const initWorker = () => {
          trackWorkerInstance.addEventListener("message", (event) => {
               const { cmd, payload } = event.data;
               if (cmd === "R_LIST_TRACK") {
                    setSourceDraw(turf.featureCollection(payload));
               }
          });
     };

     useEffect(() => {
          initWorker();
          const interval = setInterval(() => {
               getAllTracks().then((res) => {
                    dispatch(setUpdatedTracks(res));
                    trackWorkerInstance.postMessage({
                         cmd: "LIST_TRACK",
                         payload: res,
                    });
               });
          }, 700);
          return () => {
               clearTimeout(interval);
          };
     }, []);

     const onMapLoad = () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          map.getMap().addImage("drone_image", droneIcon, { sdf: false });
     };

     const handleClickMap = (e: MapMouseEvent) => {
          console.log(e.lngLat.toArray());
          const renderedFeatures = map.queryRenderedFeatures(e.point);
          let isFoundTrack = false;
          renderedFeatures.forEach((f) => {
               if (f.layer.id === "LAYER_TRACK_LIST") {
                    isFoundTrack = true;
                    dispatch(setCurrentTrackId(f.properties.id));
               }
          });
          if (!isFoundTrack) {
               dispatch(setCurrentTrackId(-1));
          }
     };

     const handleZoomEnd = () => {};

     useEffect(() => {
          if (!map) return;

          map.on("load", onMapLoad);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          map.on("click", handleClickMap);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          map.on("mouseenter", ["LAYER_TRACK_LIST"], () => {
               map.getCanvas().style.cursor = "pointer";
          });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          map.on("mouseleave", ["LAYER_TRACK_LIST"], () => {
               map.getCanvas().style.cursor = "default";
          });
          map.on("zoomend", (e) => {
               console.log(e.target.getBounds(), e.target.getZoom());
          });

          map.on("style.load", (e) => {
               if (!e.target.hasImage("drone_image")) {
                    e.target.addImage("drone_image", droneIcon, { sdf: false });
               }
          });

          return () => {
               // map.off('load', onMapLoad)
               map.off("click", handleClickMap);
          };
     }, [map]);

     return (
          <>
               <BoundLayer />
               <Source type="geojson" data={sourceDraw} cluster clusterMaxZoom={3}>
                    <Layer
                         id="LAYER_TRACK_LIST"
                         type="symbol"
                         layout={{
                              "icon-image": "drone_image",
                              "icon-size": 0.055,
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
