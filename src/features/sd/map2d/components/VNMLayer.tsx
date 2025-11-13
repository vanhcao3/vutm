import { useRef, useContext, useEffect, memo } from "react";

import { Layer, Source, useMap } from "react-map-gl";
import { useSelector } from "react-redux";
import { defaultStyle, heatmapStyle, sateliteStyle, topoStyle } from "../config/mapConfig";
import {
     LAYER_BIEN_GIOI_PROPS,
     LAYER_DAO_LABEL_PROPS,
     LAYER_DAO_LINE_PROPS,
     LAYER_DUONG_BO_PROPS,
     LAYER_DUONG_THUY_PROPS,
     LAYER_HANH_CHINH_HUYEN_PROPS,
     LAYER_HANH_CHINH_TINH_PROPS,
     LAYER_HANH_CHINH_XA_PROPS,
     LAYER_LABEL_DUONG_THUY_PROPS,
     LAYER_LABEL_HUYEN_PROPS,
     LAYER_LABEL_TINH_PROPS,
     LAYER_LABEL_XA_PROPS,
     SOURCE_BIEN_GIOI_PROPS,
     SOURCE_DAO_PROPS,
     SOURCE_DUONG_BO_PROPS,
     SOURCE_DUONG_THUY_PROPS,
     SOURCE_HANH_CHINH_HUYEN_PROPS,
     SOURCE_HANH_CHINH_TINH_PROPS,
     SOURCE_HANH_CHINH_XA_PROPS,
     SOURCE_LABEL_HUYEN_PROPS,
     SOURCE_LABEL_TINH_PROPS,
     SOURCE_LABEL_XA_PROPS,
} from "../config/mapLayers";

const VNMLayer = () => {
     const { map } = useMap();
     const { style, listLayerShow } = useSelector((state: any) => state.mapSD);

     useEffect(() => {
          // if (map) {
          //      switch (style) {
          //           case "topo": {
          //                map.current.maps.setStyle(topoStyle);
          //                break;
          //           }
          //           case "heatmap": {
          //                map.setStyle(heatmapStyle);
          //                break;
          //           }
          //           case "satelite": {
          //                map.setStyle(sateliteStyle);
          //                break;
          //           }
          //           default: {
          //                map.setStyle(defaultStyle);
          //                break;
          //           }
          //      }
          // }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [style]);

     useEffect(() => { }, [map]);

     return (
          <>
               <Source {...SOURCE_BIEN_GIOI_PROPS}>
                    {LAYER_BIEN_GIOI_PROPS.id &&
                         listLayerShow.includes(LAYER_BIEN_GIOI_PROPS.id) && (
                              <Layer {...LAYER_BIEN_GIOI_PROPS} />
                         )}
               </Source>

               <Source {...SOURCE_DUONG_THUY_PROPS}>
                    {LAYER_DUONG_THUY_PROPS.id &&
                         listLayerShow.includes(LAYER_DUONG_THUY_PROPS.id) && (
                              <Layer {...LAYER_DUONG_THUY_PROPS} />
                         )}
                    <Layer {...LAYER_LABEL_DUONG_THUY_PROPS} />
               </Source>

               <Source {...SOURCE_HANH_CHINH_XA_PROPS}>
                    {LAYER_HANH_CHINH_XA_PROPS.id &&
                         listLayerShow.includes(LAYER_HANH_CHINH_XA_PROPS.id) && (
                              <Layer {...LAYER_HANH_CHINH_XA_PROPS} />
                         )}
               </Source>

               <Source {...SOURCE_HANH_CHINH_HUYEN_PROPS}>
                    {LAYER_HANH_CHINH_HUYEN_PROPS.id &&
                         listLayerShow.includes(LAYER_HANH_CHINH_HUYEN_PROPS.id) && (
                              <Layer {...LAYER_HANH_CHINH_HUYEN_PROPS} />
                         )}
               </Source>

               <Source {...SOURCE_HANH_CHINH_TINH_PROPS}>
                    {LAYER_HANH_CHINH_TINH_PROPS.id &&
                         listLayerShow.includes(LAYER_HANH_CHINH_TINH_PROPS.id) && (
                              <Layer {...LAYER_HANH_CHINH_TINH_PROPS} />
                         )}
               </Source>

               <Source {...SOURCE_DUONG_BO_PROPS}>
                    {LAYER_DUONG_BO_PROPS.id && listLayerShow.includes(LAYER_DUONG_BO_PROPS.id) && (
                         <Layer {...LAYER_DUONG_BO_PROPS} />
                    )}
               </Source>

               <Source {...SOURCE_LABEL_XA_PROPS}>
                    <Layer {...LAYER_LABEL_XA_PROPS} />
               </Source>

               <Source {...SOURCE_LABEL_HUYEN_PROPS}>
                    <Layer {...LAYER_LABEL_HUYEN_PROPS} />
               </Source>

               <Source {...SOURCE_LABEL_TINH_PROPS}>
                    <Layer {...LAYER_LABEL_TINH_PROPS} />
               </Source>

               <Source {...SOURCE_DAO_PROPS}>
                    {LAYER_DAO_LINE_PROPS.id && listLayerShow.includes(LAYER_DAO_LINE_PROPS.id) && (
                         <Layer {...LAYER_DAO_LINE_PROPS} />
                    )}
                    <Layer {...LAYER_DAO_LABEL_PROPS} />
               </Source>
          </>
     );
};

export default memo(VNMLayer);
