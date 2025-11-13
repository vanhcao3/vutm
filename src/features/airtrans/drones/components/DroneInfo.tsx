/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
import { useDispatch, useSelector } from "react-redux";
import "../styles/droneStyle.scss";
import { Track, TrackType } from "../types";
import { RootState } from "@/slices";
import Draggable from "react-draggable";
import { convertTimeToDate } from "@/utils/convert";
import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { ensureStream } from "../api/streamService";
import { joinHls } from "../utils/url";
import StreamModal from "./StreamModal";
import { STREAM_URL } from "@/config";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { getTrackById } from "../api/droneService";
import { setCurrentTrack } from "@/slices/sd/trackSlice";

const ORDER_ID = nanoid(10);
export const DroneInfo = () => {
     const selectedTrackId = useSelector((state: RootState) => state.track.selected_id);
     const drones = useSelector((state: RootState) => state.drone.drones);
     const tracks = useSelector((state: RootState) => state.track.tracks);
     const trackInfo = tracks[selectedTrackId];
     const userId = "1";

     const [loading, setLoading] = React.useState(false);
     const dispatch = useDispatch();
     const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
     const [open, setOpen] = React.useState(false);
     const [iframeSrc, setIframeSrc] = React.useState<string | null>(null);
     // const [trackInfo, setTrackInfo] = useState<Track | null>(null);

     const getTrackType = (id: string) => {
          if (!id) return TrackType.UFO;
          if (Object.keys(drones).includes(id)) return TrackType.DRONE;
          return TrackType.UFO;
     };

     const droneId = "123456";
     const droneName = "123456";
     const rtspSource = "rtsp://172.21.55.79:8554/mystream2";
     const apiBase = STREAM_URL;

     const handleOpenStream = async () => {
          setErrorMsg(null);
          if (!droneId) {
               setErrorMsg("Missed DroneId");
               return;
          }
          if (!userId) {
               setErrorMsg("Missed X-UserId");
               return;
          }
          setLoading(true);
          try {
               const data = await ensureStream({
                    apiBase,
                    droneId,
                    droneName,
                    rtspSource,
                    userId,
               });
               const url = joinHls(data.hlsUrl, data.streamName, data.jwt);
               setOpen(true);
               setIframeSrc(url);
          } catch (e: any) {
               setErrorMsg(e?.message || "Khoong thee lay thong tin stream");
          } finally {
               setLoading(false);
          }
     };

     // // console.log("droneInfo", droneInfo);
     // if (!droneInfo) return <></>;
     if (selectedTrackId < 0) return <></>;
     if (!trackInfo) return <></>;

     return (
          <>
               <Draggable>
                    <div className="drone-form">
                         <div
                              className="drone-field"
                              style={{ justifyContent: "space-between", fontSize: "15px" }}
                         >
                              <div>Chi tiết</div>
                              <IconButton>
                                   <Close />
                              </IconButton>
                         </div>

                         <div className="drone-field">
                              <div className="drone-label">Nhận dạng</div>
                              <div className="drone-value">{getTrackType(trackInfo.object_id)}</div>
                         </div>
                         {getTrackType(trackInfo.object_id) === TrackType.UFO ? (
                              <div className="drone-field">
                                   <div className="drone-label">ID</div>
                                   <div className="drone-value">{trackInfo.object_track_id}</div>
                              </div>
                         ) : (
                              <div className="drone-field">
                                   <div className="drone-label">REMOTE ID</div>
                                   <div className="drone-value">{trackInfo.object_id}</div>
                              </div>
                         )}
                         <div className="drone-field">
                              <div className="drone-label">Kinh độ</div>
                              <div className="drone-value">
                                   {trackInfo.position.longitude.toFixed(5)}
                              </div>
                         </div>

                         <div className="drone-field">
                              <div className="drone-label">Vĩ độ</div>
                              <div className="drone-value">
                                   {trackInfo.position.latitude.toFixed(5)}
                              </div>
                         </div>

                         <div className="drone-field">
                              <div className="drone-label">Độ cao (m)</div>
                              <div className="drone-value">
                                   {trackInfo.position.altitude.toFixed(5)}
                              </div>
                         </div>

                         <div className="drone-field">
                              <div className="drone-label">Cập nhật</div>
                              <div className="drone-value">
                                   {convertTimeToDate(Math.floor(trackInfo.updated_at / 1000))}
                              </div>
                         </div>
                         <div
                              className="drone-field"
                              style={{
                                   justifyContent: "space-evenly",
                                   alignItems: "center",
                              }}
                         >
                              <div className="drone-data-source">
                                   <span>BV5</span>
                              </div>

                              <div className="drone-data-source">
                                   <span>RMID</span>
                              </div>

                              <div className="drone-data-source">
                                   <span>GCS</span>
                              </div>
                         </div>
                         {getTrackType(trackInfo.object_id) === TrackType.DRONE && (
                              <>
                                   <div className="drone-field">
                                        <div className="drone-label">Đơn</div>
                                        <div className="drone-value">#350359</div>
                                   </div>

                                   <div className="drone-field">
                                        <div className="drone-label">Pin (%)</div>
                                        <div className="drone-value">98</div>
                                   </div>

                                   <div className="drone-field">
                                        <div className="drone-label">Trạng thái</div>
                                        <div className="drone-value">HOẠT ĐỘNG</div>
                                   </div>

                                   <div
                                        className="drone-field"
                                        style={{
                                             gap: "10px",
                                             textAlign: "center",
                                             // marginTop: "30px",
                                             alignItems: "center",
                                        }}
                                   >
                                        <button
                                             className="stream-btn"
                                             style={{ width: "50%", fontSize: "10px" }}
                                             onClick={handleOpenStream}
                                             disabled={loading}
                                             aria-busy={loading}
                                        >
                                             {loading ? "Đang chuẩn bị..." : "Stream"}
                                        </button>

                                        <button
                                             className="stream-btn"
                                             style={{ width: "50%", fontSize: "10px" }}
                                             onClick={handleOpenStream}
                                             disabled={loading}
                                             aria-busy={loading}
                                        >
                                             Gửi mệnh lệnh
                                        </button>
                                   </div>
                              </>
                         )}
                    </div>
               </Draggable>

               <StreamModal
                    open={open}
                    iframeSrc={iframeSrc}
                    onClose={() => setOpen(false)}
                    title={`Live stream - ${droneId}`}
               />
          </>
     );
};
