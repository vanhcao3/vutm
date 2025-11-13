import { TRACK_MANAGER_SOCKET } from "@/config/apiConfig";
import {
     removeMapTrack,
     setMapSize,
     setMapTracks,
     updateMapTrack,
} from "@/slices/sd/mapTrackSlice";
import { useEffect, useContext, useRef, useState } from "react";

import { Source, Layer, useMap, GeoJSONSource } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import WorkerBuilder from "@/workers/worker-builder";
import { TrackWorker } from "@/workers/track.worker";
import { getTracks } from "./api";
import { data2hashMap } from "@/utils/convert";
const trackWorkerInstance = new WorkerBuilder(TrackWorker);

import elintRadarIconSrc from "@/assets/images/icons/TrackIcons/ic_elint_radar.png";
// eslint-disable-next-line import/no-duplicates
import highComintIconSrc from "@/assets/images/icons/TrackIcons/ic_high_comint.png";
// eslint-disable-next-line import/no-duplicates
import unConfirmTrackIconSrc from "@/assets/images/icons/TrackIcons/ic_high_comint.png";
import lowComintIconSrc from "@/assets/images/icons/TrackIcons/ic_low_comint.png";
import unknownTrackIconSrc from "@/assets/images/icons/TrackIcons/ic_MT_CXD.png";
import groundTrackIconSrc from "@/assets/images/icons/TrackIcons/ic_MT_mat_dat.png";
import subMarineTrackIconSrc from "@/assets/images/icons/TrackIcons/ic_MT_ngam.png";
import vesselTrackIconSrc from "@/assets/images/icons/TrackIcons/ic_MT_tren_bien.png";
import aircraftTrackIconSrc from "@/assets/images/icons/TrackIcons/ic_MT_tren_khong.png";
import { TrackImage } from "@/config/enum";
import { SocketContext } from "@/lib/socket";

const aircraftTrackIcon = new Image();
aircraftTrackIcon.src = aircraftTrackIconSrc;
const highComintIcon = new Image();
highComintIcon.src = highComintIconSrc;
const lowComintIcon = new Image();
lowComintIcon.src = lowComintIconSrc;
const elintRadarIcon = new Image();
elintRadarIcon.src = elintRadarIconSrc;
const vesselTrackIcon = new Image();
vesselTrackIcon.src = vesselTrackIconSrc;
const unknownTrackIcon = new Image();
unknownTrackIcon.src = unknownTrackIconSrc;
const groundTrackIcon = new Image();
groundTrackIcon.src = groundTrackIconSrc;
const subMarineTrackIcon = new Image();
subMarineTrackIcon.src = subMarineTrackIconSrc;
const unconfirmTargetIcon = new Image();
unconfirmTargetIcon.src = unConfirmTrackIconSrc;

export const TrackLayer = () => {
     const map = useMap().current.getMap();
     const dispatch = useDispatch();

     const socket = useContext(SocketContext);

     const { fullMapTrack } = useSelector((state: any) => state.mapTrack);

     useEffect(() => {
          trackWorkerInstance.postMessage({
               cmd: "LIST_TARGET",
               payload: fullMapTrack,
          });
     }, [fullMapTrack]);

     const initWorker = () => {
          trackWorkerInstance.addEventListener("message", (event) => {
               const { cmd, payload } = event.data;
               if (cmd === "R_LIST_TARGET" && map.getSource("SOURCE_TRACKS")) {
                    const geoSource = map.getSource("SOURCE_TRACKS") as GeoJSONSource;
                    geoSource.setData(payload.features);
               }
          });
     };

     const initMapOnLoad = () => {
          initWorker();

          // if (!map.hasImage(TrackImage.AircraftTrack))
          //      map.addImage(TrackImage.AircraftTrack, aircraftTrackIcon, { sdf: true });

          // if (!map.hasImage(TrackImage.ElintRadar)) {
          //      map.addImage(TrackImage.ElintRadar, elintRadarIcon, { sdf: true });
          // }

          // if (!map.hasImage(TrackImage.HighComint)) {
          //      map.addImage(TrackImage.HighComint, highComintIcon, { sdf: true });
          // }

          // if (!map.hasImage(TrackImage.LowComint)) {
          //      map.addImage(TrackImage.LowComint, lowComintIcon, { sdf: true });
          // }

          // if (!map.hasImage(TrackImage.VesselTrack))
          //      map.addImage(TrackImage.VesselTrack, vesselTrackIcon, { sdf: true });

          // if (!map.hasImage(TrackImage.UnknownTrack))
          //      map.addImage(TrackImage.UnknownTrack, unknownTrackIcon, { sdf: true });

          // if (!map.hasImage(TrackImage.GroundTrack))
          //      map.addImage(TrackImage.GroundTrack, groundTrackIcon, { sdf: true });

          // if (!map.hasImage(TrackImage.SubMarineTrack))
          //      map.addImage(TrackImage.SubMarineTrack, subMarineTrackIcon, { sdf: true });

          // if (!map.hasImage(TrackImage.UnconfirmTrack))
          //      map.addImage(TrackImage.UnconfirmTrack, unconfirmTargetIcon, { sdf: true });
     };

     useEffect(() => {
          if (map) {
               map.on("load", initMapOnLoad);
               map.dragPan.disable();
          }
          return () => {
               if (map) {
                    map.off("load", initMapOnLoad);
               }
          };
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [map]);

     useEffect(() => {
          socket.emit("receiverPlot", "");
          socket.on("UPDATE_ALL", (data: any) => {
               dispatch(setMapSize(data.length));
          });

          socket.on("REMOVE", (data: any) => {
               dispatch(removeMapTrack(data));
          });

          socket.on("UPDATE", (data: any) => {
               const messageDetail = data[0].messageDetail;
               const { trackNumber, heading, plotMsg, createdTime, mode3a, speed } = messageDetail;
               const { longitude, latitude, altitude } = plotMsg;
               dispatch(
                    updateMapTrack({
                         trackId: trackNumber,
                         trackDetail: {
                              trackNumber,
                              heading,
                              createdTime,
                              mode3a,
                              speed,
                              longitude,
                              latitude,
                              altitude,
                         },
                    })
               );
          });

          return () => {
               socket.off("UPDATE");
               socket.off("REMOVE");
               socket.off("UPDATE_ALL");
          };
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [socket]);

     return (
          <Source
               id="SOURCE_TRACKS"
               type="geojson"
               data={{ type: "FeatureCollection", features: [] }}
               buffer={0}
               cluster
               clusterMaxZoom={3}
          >
               <Layer
                    id="TRACKS_LAYER"
                    type="symbol"
                    source="SOURCE_TRACKS"
                    filter={["!", ["has", "point_count"]]}
                    layout={{
                         "icon-image": ["get", "image"],
                         "icon-size": 0.25,
                         "icon-allow-overlap": true,
                         "icon-rotate": ["get", "heading"],
                    }}
                    paint={{
                         "icon-color": ["get", "color"],
                         "icon-halo-color": "#15429f",
                         "icon-halo-width": 0.55,
                    }}
               />
          </Source>
     );
};
