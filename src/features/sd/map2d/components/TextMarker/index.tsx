import { Marker } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { setIsDrawMode, setSelectedTextId } from "@/slices/sd/mapSlice";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import Moveable, { OnDrag, OnResize, OnRotate, OnScale } from "react-moveable";
import { flushSync } from "react-dom";
import { saveDataToLocalStorage } from "../../service";

interface TextMarkerProps {
     longitude: number;
     latitude: number;
     action?: string;
     id?: string;
     fontSize?: number;
     color?: string;
     width?: number;
     height?: number;
     rotate?: string;
     handleElementInput?: (value) => void;
     handleDisplay?: (isDisplay?: boolean) => void;
     anchorContextMenu?: any;
     setPosContextMenu?: any;
}

export function TextMarker(props: TextMarkerProps) {
     const {
          longitude,
          latitude,
          action = "create",
          id,
          width = 176,
          height = 66,
          rotate = "rotate(0deg)",
          fontSize = 16,
          color = "#000000",
          handleElementInput,
          handleDisplay,
          anchorContextMenu,
          setPosContextMenu,
     } = props;
     const dispatch = useDispatch();
     const { selectedTextId } = useSelector((state: any) => state.mapSD);
     const { isDrawMode } = useSelector((state: any) => state.mapSD);
     const [message, setMessage] = useState("");
     const anchorRef = useRef<any>(null);
     const [valueField, setValueField] = useState({
          color: color,
          fontSize: fontSize,
          width: width,
          height: height,
          rotate: rotate,
     });
     const [isDisplayContextMenu, setIsDisplayContextMenu] = useState<boolean>(false);

     const mouseCoordinate = useSelector((state: any) => state.mapSD.mouseCoordinate);

     const handleMessageChange = (event) => {
          setMessage(event.target.value);
          saveDataToLocalStorage({
               name: "listText",
               id: id,
               modify: [
                    {
                         value: event.target.value,
                         name: "value",
                    },
               ],
          });
     };

     const addNewTextMarker = (longitude, latitude) => {
          saveDataToLocalStorage({
               name: "listText",
               id: id,
               dataPush: {
                    id: uuidv4(),
                    longitude: longitude,
                    latitude: latitude,
                    value: "Text Example",
                    fontSize: 16,
                    color: "#000000",
               },
          });
     };

     const handleLocationText = () => {
          saveDataToLocalStorage({
               name: "listText",
               id: id,
               modify: [
                    {
                         value: mouseCoordinate?.lng,
                         name: "longitude",
                    },
                    {
                         value: mouseCoordinate?.lat,
                         name: "latitude",
                    },
               ],
          });
     };

     const handleResize = (width: number, height: number) => {
          saveDataToLocalStorage({
               name: "listText",
               id: id,
               modify: [
                    {
                         value: width,
                         name: "width",
                    },
                    {
                         value: height,
                         name: "height",
                    },
               ],
          });
     };

     const handleRotate = (rotate: string) => {
          saveDataToLocalStorage({
               name: "listText",
               id: id,
               modify: [
                    {
                         value: `rotate(${rotate}deg)`,
                         name: "rotate",
                    },
               ],
          });
     };

     const handleOnMouseRightClickEvent = () => {
          handleElementInput && handleElementInput(anchorRef.current);
          setIsDisplayContextMenu(!isDisplayContextMenu);
     };

     const handleRotateToNumber = (): number => {
          const a = valueField.rotate;
          a.slice(0, -4).slice(7);
          return Number(a);
     };
     useEffect(() => {
          const listText = JSON.parse(window.localStorage.getItem("listText")) || [];
          const itemText = listText.find((item) => item.id === id);
          setMessage(itemText?.value || "");
     }, [id]);

     useEffect(() => {
          const listText = JSON.parse(window.localStorage.getItem("listText")) || [];
          const itemText = listText.find((item) => item.id === id);
          setValueField({
               color: itemText?.color || "",
               fontSize: itemText?.fontSize || null,
               width: itemText?.width || null,
               height: itemText?.height || null,
               rotate: itemText?.rotate || "",
          });
     }, [color, fontSize, rotate, width, height]);

     if (!longitude || !latitude) return <></>;
     return (
          <div
               role="presentation"
               onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
               }}
               onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
               }}
               style={{
                    width: "150px",
                    height: "70px",
               }}
          >
               <Marker
                    rotation={handleRotateToNumber()}
                    longitude={longitude}
                    latitude={latitude}
                    onClick={(e) => {
                         const getElementTextarea: any = e.target;

                         if (action === "create") {
                              addNewTextMarker(longitude, latitude);
                              dispatch(setIsDrawMode(!isDrawMode));
                              handleDisplay(false);
                         } else {
                              dispatch(setSelectedTextId(id));
                              handleElementInput(getElementTextarea._element.children[0]);
                         }
                    }}
               >
                    <textarea
                         ref={anchorRef}
                         value={message}
                         onChange={handleMessageChange}
                         style={{
                              resize: "none",
                              background: "unset",
                              fontSize: `${valueField.fontSize}px`,
                              color: valueField.color,
                              width: `${valueField.width}px`,
                              height: `${valueField.height}px`,
                              transform: valueField.rotate,
                              overflow: "hidden",
                         }}
                         onMouseDown={handleOnMouseRightClickEvent}
                         onContextMenu={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              anchorContextMenu(e.currentTarget);
                              setPosContextMenu({
                                   top: e.clientY,
                                   left: e.clientX,
                              });
                         }}
                    />
                    {selectedTextId === id && (
                         <Moveable
                              target={anchorRef.current}
                              container={null}
                              origin={true}
                              flushSync={flushSync}
                              edge={false}
                              draggable={true}
                              throttleDrag={0}
                              onDragStart={({ target, clientX, clientY }) => {
                                   // console.log('OnDragStart', target, clientX, clientY);
                              }}
                              onDrag={({
                                   target,
                                   beforeDelta,
                                   beforeDist,
                                   left,
                                   top,
                                   right,
                                   bottom,
                                   delta,
                                   dist,
                                   transform,
                                   clientX,
                                   clientY,
                              }: OnDrag) => {
                                   // target!.style.transform = transform;
                                   handleLocationText();
                              }}
                              onDragEnd={({ target, isDrag, clientX, clientY }) => {
                                   // console.log("onDragEnd: ", target, isDrag, clientX, clientY);
                              }}
                              keepRatio={true}
                              resizable={true}
                              throttleResize={0}
                              onResizeStart={({ target, clientX, clientY }) => {
                                   // console.log('onResizeStart: ', target);
                              }}
                              onResize={({
                                   target,
                                   width,
                                   height,
                                   dist,
                                   delta,
                                   direction,
                                   clientX,
                                   clientY,
                              }: OnResize) => {
                                   // console.log('onResize: ', target);

                                   delta[0] && (target!.style.width = `${width}px`);
                                   delta[1] && (target!.style.height = `${height}px`);
                                   handleResize(width, height);
                              }}
                              onResizeEnd={({ target, isDrag, clientX, clientY }) => {
                                   console.log("onResizeEnd: ", target, isDrag);
                              }}
                              scalable={true}
                              throttleScale={0}
                              onScaleStart={({ target, clientX, clientY }) => {
                                   // console.log('onScaleStart: ', target);
                              }}
                              onScale={({
                                   target,
                                   scale,
                                   dist,
                                   delta,
                                   transform,
                                   clientX,
                                   clientY,
                              }: OnScale) => {
                                   // console.log('onScale scale:', scale);
                                   target!.style.transform = transform;
                              }}
                              onScaleEnd={({ target, isDrag, clientX, clientY }) => {
                                   // console.log('onScaleEnd: ', target, isDrag);
                              }}
                              rotatable={true}
                              throttleRotate={0}
                              onRotateStart={({ target, clientX, clientY }) => {
                                   // console.log('onRotateStart: ', target);
                              }}
                              onRotate={({
                                   target,
                                   dist,
                                   delta,
                                   transform,
                                   clientX,
                                   clientY,
                              }: OnRotate) => {
                                   target!.style.transform = transform;
                                   const a = transform.slice(0, -5).slice(8);
                                   handleRotate(a);
                              }}
                              onRotateEnd={({ target, isDrag, clientX, clientY }) => {
                                   // console.log('onRotateEnd: ', target, isDrag, clientX, clientY);
                              }}
                              pinchable={true}
                              onPinchStart={({ target, clientX, clientY, datas }) => {
                                   // console.log('onPinchStart: ');
                              }}
                              onPinch={({ target, datas, clientX, clientY }) => {
                                   // console.log('onPinch:', target, datas);
                              }}
                              onPinchEnd={({ target, isDrag, clientX, clientY, datas }) => {
                                   // console.log('onPinchEnd: ');
                              }}
                         />
                    )}
               </Marker>
          </div>
     );
}
