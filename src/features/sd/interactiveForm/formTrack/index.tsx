import { memo } from "react";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";

import "../styles/index.scss";
import { radian2Degree, transformDEGtoDDMMSS } from "@/utils/convert";

const FormTrack = (props: any) => {
     const { t } = useTranslation();
     const { selectedTrackDetail } = useSelector((state: any) => state.mapTrack);

     return (
          <Draggable>
               {/* <div style={{ top: "7%", left: "2%", position: "absolute", zIndex: 99 }}>
                    <input />
               </div> */}
               <Paper className="FormTrack">
                    <form>
                         <div className="FormTrack-FormInput">
                              <label htmlFor="ID">ID</label>
                              <Input
                                   value={selectedTrackDetail?.trackNumber}
                                   id="ID"
                                   disableUnderline
                                   disabled
                              />
                         </div>
                         <div className="FormTrack-FormInput">
                              <label htmlFor="altitude">{t("track.altitude")}</label>
                              <Input
                                   value={selectedTrackDetail?.altitude}
                                   id="altitude"
                                   disableUnderline
                                   disabled
                              />
                         </div>
                         <div className="FormTrack-FormInput">
                              <label htmlFor="3a">{t("track.mode3a")}</label>
                              <Input
                                   value={selectedTrackDetail?.mode3a}
                                   id="3a"
                                   disableUnderline
                                   disabled
                              />
                         </div>
                         <div className="FormTrack-FormInput">
                              <label htmlFor="longitude">{t("track.longitude")}</label>
                              <Input
                                   value={transformDEGtoDDMMSS(
                                        radian2Degree(selectedTrackDetail?.longitude || 0)
                                   )}
                                   id="longitude"
                                   disableUnderline
                                   disabled
                              />
                         </div>
                         <div className="FormTrack-FormInput">
                              <label htmlFor="latitude">{t("track.latitude")}</label>
                              <Input
                                   value={transformDEGtoDDMMSS(
                                        radian2Degree(selectedTrackDetail?.latitude || 0)
                                   )}
                                   id="latitude"
                                   disableUnderline
                                   disabled
                              />
                         </div>
                         <div className="FormTrack-FormInput">
                              <label htmlFor="heading">{t("track.heading")}</label>
                              <Input
                                   value={radian2Degree(selectedTrackDetail?.heading || 0).toFixed(
                                        3
                                   )}
                                   id="heading"
                                   disableUnderline
                                   disabled
                              />
                         </div>
                    </form>
               </Paper>
          </Draggable>
     );
};

export default memo(FormTrack);
