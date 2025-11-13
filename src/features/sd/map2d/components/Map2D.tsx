/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/no-onchange */
import { useEffect, useState, useRef, useCallback, useMemo, useId } from "react";

import Map, { MapLayerMouseEvent, Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import MapEvent from "react-map-gl";
// import "maplibre-gl/dist/maplibre-gl.css";
import "mapbox-gl/dist/mapbox-gl.css";
import maplibreGl from "maplibre-gl";
import VNMLayer from "./VNMLayer";
import { TrackLayer } from "./TrackLayer";
import { TrackSelectLayer } from "./TrackSelectLayer";
import {
     addSelectedTrack,
     setSelectedTrackID,
     setSelectedTrackIDs,
} from "@/slices/sd/mapTrackSlice";
import {
     setMapLoaded,
     setMouseCoordinate,
     setSelectedTextId,
     setViewPort,
} from "@/slices/sd/mapSlice";
import FormTrack from "../../interactiveForm/formTrack";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HelloWorker from "workerize-loader?inline!../../../../workers/hello.worker";
import { useNavigate } from "react-router-dom";
import { ContextMenu } from "./TextMarker/ContextMenu";
import { TextMarker } from "./TextMarker";

import { MAPBOX_TOKEN } from "@/config/constantConfigs";
import { defaultStyle, heatmapStyle, sateliteStyle, topoStyle } from "../config/mapConfig";

import { DrawModeChangeEvent } from "@mapbox/mapbox-gl-draw";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import LotsOfPointsMode from "./DrawControl/lots_of_point";
// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const useStyles = makeStyles((theme: any) => {
     return {
          labelSelect: {
               background: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.87)" : "#fff",
          },
     };
});
let helloWorker = HelloWorker();

export const Map2D = () => {
     const { t, i18n } = useTranslation();
     const dispatch = useDispatch();
     const classes = useStyles();
     const { dragPan, viewPort, isDrawMode, style } = useSelector((state: any) => state.mapSD);
     const [mapStyle, setMapStyle] = useState(defaultStyle);
     const { selectedTrackIds } = useSelector((state: any) => state.mapTrack);
     const selectedTrackIdsRef = useRef<Array<number>>(selectedTrackIds || []);

     const [valueTextMarker, setValueTextMarker] = useState({
          idText: "",
          fontSize: 16,
          color: "#000000",
     });
     const [elementTextarea, setElementTextarea] = useState();
     const [viewState, setViewState] = useState({
          latitude: 21,
          longitude: 105,
          zoom: 8,
     });

     const [displayAddText, setDisplayAddText] = useState(false);
     const [anchorContexMenu, setAnchorContexMenu] = useState(null);
     const [topContextMenu, setTopContextMenu] = useState(0);
     const [leftContextMenu, setLeftContextMenu] = useState(0);

     const drawRef = useRef<MapboxDraw>(null);

     const MODES = useMemo(() => {
          return [
               { id: "draw_line_string", text: "Draw.Polyline" },
               { id: "draw_polygon", text: "Draw.Polygon" },
               { id: "draw_point", text: "Draw.Point" },
               { id: "lots_of_points", text: "Multi Points (custom draw mode)" },
               { id: "addNote", text: "Văn bản" },
          ];
     }, []);

     const getListText = useMemo(() => {
          return JSON.parse(window.localStorage.getItem("listText")) || [];
     }, [window.localStorage.getItem("listText")]);

     useEffect(() => {
          switch (style) {
               case "topo": {
                    setMapStyle(topoStyle);
                    break;
               }
               case "heatmap": {
                    setMapStyle(heatmapStyle);
                    break;
               }
               case "satelite": {
                    setMapStyle(sateliteStyle);
                    break;
               }
               default: {
                    setMapStyle(defaultStyle);
                    break;
               }
          }
     }, [style]);

     useEffect(() => {
          helloWorker.postMessage("test");
          helloWorker.addEventListener("message", (event: any) => {
               console.log("Worker reply: ", event.data.msg);
          });
          // const td: any = window.open("/td", "", "width=1920,height=1080,left=1920,top=0");
          // td.onload = () => {
          //      td.document.title = "TD";
          // };

          const langChannel = new BroadcastChannel("langChannel");
          langChannel.onmessage = (event) => {
               i18n.changeLanguage(event.data.language);
          };

          return () => {
               langChannel.close();
          };
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     useEffect(() => {
          selectedTrackIdsRef.current = selectedTrackIds;
     }, [selectedTrackIds]);

     const displayAddNote = (isDisplay?: boolean): any => {
          setDisplayAddText(isDisplay);
     };

     const handleOnMouseMoveEvent = (e: MapLayerMouseEvent) => {
          dispatch(setMouseCoordinate(e.lngLat));
     };

     const closeContextMenu = () => {
          setValueTextMarker({
               ...valueTextMarker,
          });
     };

     const handleElementInput = (value) => {
          setElementTextarea(value);
     };

     const handleFontSize = (value: number) => {
          setValueTextMarker({
               ...valueTextMarker,
               fontSize: value,
          });
     };

     const handleColor = (value: string) => {
          setValueTextMarker({
               ...valueTextMarker,
               color: value,
          });
     };

     const mouseCoordinate = useSelector((state: any) => state.mapSD.mouseCoordinate);

     const layerText = () => {
          if (!mouseCoordinate.lng || !mouseCoordinate.lat) return <></>;
          return (
               <TextMarker
                    handleDisplay={displayAddNote}
                    longitude={mouseCoordinate.lng}
                    latitude={mouseCoordinate.lat}
               />
          );
     };

     const renderListText = useMemo(() => {
          return getListText.map((item, index) => {
               if (!item.longitude || !item.latitude) return <></>;
               return (
                    <div key={index}>
                         <TextMarker
                              longitude={item.longitude}
                              latitude={item.latitude}
                              action="edit"
                              id={item.id}
                              fontSize={item.fontSize}
                              color={item.color}
                              handleElementInput={handleElementInput}
                              anchorContextMenu={(anchor) => setAnchorContexMenu(anchor)}
                              setPosContextMenu={(pos) => {
                                   setValueTextMarker({
                                        ...valueTextMarker,
                                        idText: item.id,
                                   });
                                   setTopContextMenu(pos.top), setLeftContextMenu(pos.left);
                              }}
                         />
                    </div>
               );
          });
     }, [getListText]);

     const onChangeStateViewPort = (viewport: any) => {
          const { latitude, longitude, zoom } = viewport;
          const newViewPort = { latitude, longitude, zoom };

          dispatch(setViewPort(newViewPort));
     };

     const handleChangeDrawMode = (e: SelectChangeEvent) => {
          const modeId_ = e.target.value;
          if (modeId_ === "addNote") {
               displayAddNote(true);
          } else {
               drawRef.current.changeMode(modeId_);
          }
     };

     const _renderToolBar = () => {
          return (
               <FormControl
                    className={classes.labelSelect}
                    fullWidth
                    style={{
                         position: "absolute",
                         fontSize: "1em",
                         top: "4.8em",
                         right: "1.2em",
                         maxWidth: "10em",
                         zIndex: 10,
                    }}
               >
                    <InputLabel id="input-draw-mode">{t("Draw.mode")}</InputLabel>
                    <Select
                         labelId="input-draw-mode"
                         onChange={handleChangeDrawMode}
                         label={t("Draw.mode")}
                    >
                         {MODES.map((mode) => (
                              <MenuItem key={mode.id} value={mode.id}>
                                   {t(mode.text)}
                              </MenuItem>
                         ))}
                    </Select>
               </FormControl>
          );
     };

     const handleOnClickMap = useCallback((event: any) => {
          dispatch(setSelectedTextId(""));
          // handle click on "tracks layer"
          const trackFeature = event.features?.find((f) => f.layer.id === "TRACKS_LAYER");
          if (trackFeature) {
               const trackID = trackFeature.properties.trackNumber;
               if (event.srcEvent.ctrlKey) {
                    dispatch(addSelectedTrack(trackID));
                    dispatch(setSelectedTrackID(trackID));
               } else {
                    if (selectedTrackIdsRef.current.length > 0) dispatch(setSelectedTrackIDs([]));
                    dispatch(setSelectedTrackID(trackID));
                    dispatch(addSelectedTrack(trackID));
               }
          } else {
               dispatch(setSelectedTrackIDs([]));
               dispatch(setSelectedTrackID(0));
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     const drawModes = {
          ...MapboxDraw.modes,
          lots_of_points: LotsOfPointsMode,
     };
     return (
          <>
               <Map
                    {...viewState}
                    style={{ width: "100vw", height: "100vh" }}
                    onMove={(evt) => setViewState(evt.viewState)}
                    // onLoad={() => dispatch(setMapLoaded(true))}
                    // onError={(err) => console.log("Map err", err)}
                    onClick={(e) => {
                         handleOnClickMap(e);
                         closeContextMenu();
                    }}
                    onMouseMove={handleOnMouseMoveEvent}
                    RTLTextPlugin=""
                    // scrollZoom={true}
                    dragRotate={false}
                    // dragPan={true}
                    // mapStyle="mapbox://styles/mapbox/basic-v9"
                    // mapStyle="https://qc.c4i.vn/tiles/proxy/style.json?host=https://qc.c4i.vn"
                    // mapStyle="http://192.168.205.17:30080/styles/osm-bright.json?optimize=true"
                    mapStyle={mapStyle}
                    attributionControl={false}
                    onContextMenu={closeContextMenu}
                    mapboxAccessToken={MAPBOX_TOKEN}
                    // projection={"globe"}
               >
                    {/* <TrackLayer />

                    <VNMLayer />

                    <TrackSelectLayer /> */}

                    {displayAddText && layerText()}
                    {renderListText}
                    <ContextMenu
                         getListText={getListText}
                         id={valueTextMarker.idText}
                         handleDisplay={closeContextMenu}
                         handleFontSize={handleFontSize}
                         handleColor={handleColor}
                         elementInput={elementTextarea}
                         anchorContexMenu={anchorContexMenu}
                         handleClose={() => setAnchorContexMenu(null)}
                         handleClickMenuItem={() => setAnchorContexMenu(null)}
                         top={topContextMenu}
                         left={leftContextMenu}
                    />
                    {/* <Button
                    style={{
                         backgroundColor: "black",
                         width: "100px",
                         height: "100px",
                         zIndex: 20,
                    }}
                    onClick={() => {
                         console.log("EDIT_REF", editRef.current.getFeatures());
                    }}
               /> */}
               </Map>

               {selectedTrackIds.length === 1 && (
                    <FormTrack
                         handleClose={() => {
                              dispatch(setSelectedTrackID(0));
                              dispatch(setSelectedTrackIDs([]));
                         }}
                    />
               )}
               {isDrawMode && _renderToolBar()}
          </>
     );
};
