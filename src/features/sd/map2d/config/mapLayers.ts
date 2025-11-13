import { LayerProps, SourceProps } from "react-map-gl";
import {
     daoUrl,
     defaultFont,
     duongboUrl,
     duongthuyUrl,
     hanhChinhHuyenUrl,
     hanhChinhTinhUrl,
     hanhChinhXaUrl,
     huyenLabelUrl,
     mainRoadUrl,
     ranhgioiUrl,
     tinhLabelUrl,
     xaLabelUrl,
} from "./mapConfig";

export const SOURCE_BIEN_GIOI_PROPS: SourceProps = {
     type: "vector",
     tiles: [ranhgioiUrl],
};

export const LAYER_BIEN_GIOI_PROPS: LayerProps = {
     id: "LAYER_BIEN_GIOI",
     type: "line",
     "source-layer": "ranhgioi",
     layout: {
          "line-cap": "round",
          "line-join": "round",
     },
     paint: {
          "line-color": "#ffa600",
          "line-opacity": 1,
          "line-width": 2,
          "line-dasharray": [1, 3],
     },
};

export const SOURCE_HANH_CHINH_XA_PROPS: SourceProps = {
     type: "vector",
     tiles: [hanhChinhXaUrl],
};

export const LAYER_HANH_CHINH_XA_PROPS: LayerProps = {
     id: "LAYER_HANH_CHINH_XA",
     type: "line",
     "source-layer": "HANHCHINH_XA",
     layout: {
          "line-cap": "round",
          "line-join": "round",
     },
     paint: {
          "line-color": "#666666",
          "line-opacity": 1,
          "line-width": 1,
     },
};

export const SOURCE_LABEL_XA_PROPS: SourceProps = {
     type: "geojson",
     data: xaLabelUrl,
};

export const LAYER_LABEL_XA_PROPS: LayerProps = {
     id: "LAYER_LABEL_XA",
     type: "symbol",
     minzoom: 12,
     maxzoom: 15,
     layout: {
          "text-allow-overlap": false,
          "text-ignore-placement": false,
          "text-optional": true,
          "text-field": ["get", "diaDanh"],
          "text-font": defaultFont,
          "text-size": 10,
          "text-letter-spacing": 0.05,
          "text-offset": [0, 0],
          "text-variable-anchor": ["top"],
     },
     paint: {},
};

export const SOURCE_HANH_CHINH_HUYEN_PROPS: SourceProps = {
     type: "vector",
     tiles: [hanhChinhHuyenUrl],
};

export const LAYER_HANH_CHINH_HUYEN_PROPS: LayerProps = {
     id: "LAYER_HANH_CHINH_HUYEN",
     type: "line",
     "source-layer": "HANHCHINH_HUYEN",
     layout: {
          "line-cap": "round",
          "line-join": "round",
     },
     paint: {
          "line-color": "#666666",
          "line-opacity": 1,
          "line-width": 1.5,
     },
};

export const SOURCE_LABEL_HUYEN_PROPS: SourceProps = {
     type: "geojson",
     data: huyenLabelUrl,
};

export const LAYER_LABEL_HUYEN_PROPS: LayerProps = {
     id: "LAYER_LABEL_HUYEN",
     type: "symbol",
     minzoom: 10,
     maxzoom: 13,
     layout: {
          "text-allow-overlap": false,
          "text-ignore-placement": false,
          "text-optional": true,
          "text-field": ["get", "diaDanh"],
          "text-font": defaultFont,
          "text-size": 11,
          "text-letter-spacing": 0.05,
          "text-offset": [0, 0],
          "text-variable-anchor": ["top"],
     },
     paint: {},
};

export const SOURCE_HANH_CHINH_TINH_PROPS: SourceProps = {
     type: "vector",
     tiles: [hanhChinhTinhUrl],
};

export const LAYER_HANH_CHINH_TINH_PROPS: LayerProps = {
     id: "LAYER_HANH_CHINH_TINH",
     type: "line",
     "source-layer": "HANHCHINH_TINH",
     layout: {
          "line-cap": "round",
          "line-join": "round",
     },
     paint: {
          "line-color": "#666666",
          "line-opacity": 1,
          "line-width": 1.5,
     },
};

export const SOURCE_LABEL_TINH_PROPS: SourceProps = {
     type: "geojson",
     data: tinhLabelUrl,
};

export const LAYER_LABEL_TINH_PROPS: LayerProps = {
     id: "LAYER_LABEL_TINH",
     type: "symbol",
     minzoom: 7,
     maxzoom: 12,
     layout: {
          "text-allow-overlap": false,
          "text-ignore-placement": false,
          "text-optional": true,
          "text-field": ["format", ["upcase", ["get", "DIADANH"]]],
          "text-font": defaultFont,
          "text-size": 12,
          "text-letter-spacing": 0.05,
          "text-offset": [0, 0],
          "text-variable-anchor": ["top"],
     },
     paint: {},
};

export const SOURCE_DUONG_THUY_PROPS: SourceProps = {
     type: "vector",
     tiles: [duongthuyUrl],
};

export const LAYER_DUONG_THUY_PROPS: LayerProps = {
     id: "LAYER_DUONG_THUY",
     type: "line",
     "source-layer": "SongSuoiA",
     layout: {
          "line-cap": "round",
          "line-join": "round",
     },
     paint: {
          "line-color": "#3fd3fe",
          "line-opacity": 1,
          "line-width": 1,
     },
};

export const LAYER_LABEL_DUONG_THUY_PROPS: LayerProps = {
     id: "LAYER_LABEL_DUONG_THUY",
     type: "symbol",
     minzoom: 12,
     "source-layer": "SongSuoiA",
     layout: {
          "text-allow-overlap": false,
          "text-ignore-placement": false,
          "text-optional": true,
          "text-field": ["get", "ten"],
          "text-font": defaultFont,
          "text-size": 11,
          "text-letter-spacing": 0.05,
          "text-offset": [0, 0],
          "text-variable-anchor": ["top"],
     },
     paint: {},
};

export const SOURCE_DUONG_BO_PROPS: SourceProps = {
     type: "geojson",
     data: mainRoadUrl,
};

export const LAYER_DUONG_BO_PROPS: LayerProps = {
     id: "LAYER_DUONG_BO",
     type: "line",
     layout: {
          "line-cap": "round",
          "line-join": "round",
     },
     paint: {
          "line-color": "#693838",
          "line-opacity": 1,
          "line-width": 1,
     },
};

export const SOURCE_DAO_PROPS: SourceProps = {
     type: "vector",
     tiles: [daoUrl],
};

export const LAYER_DAO_LINE_PROPS: LayerProps = {
     id: "LAYER_DAO_LINE",
     type: "line",
     "source-layer": "DaoA",
     layout: {
          "line-cap": "round",
          "line-join": "round",
     },
     paint: {
          "line-color": "#666666",
          "line-opacity": 1,
          "line-width": 1.5,
     },
};

export const LAYER_DAO_LABEL_PROPS: LayerProps = {
     id: "LAYER_DAO_LABEL",
     type: "symbol",
     "source-layer": "DaoA",
     minzoom: 10,
     layout: {
          "text-allow-overlap": false,
          "text-ignore-placement": false,
          "text-optional": true,
          "text-field": ["format", ["upcase", ["get", "ten"]]],
          "text-font": defaultFont,
          "text-size": 11,
          "text-letter-spacing": 0.05,
          "text-offset": [0, 0],
          "text-variable-anchor": ["top"],
     },
     paint: {},
};
