import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface mapState {
     isMapLoaded: boolean;
     style: string;
     mouseCoordinate: Array<number>;
     dragPan: boolean;
     viewPort: {
          latitude: number;
          longitude: number;
          zoom: number;
     };
     zoomStepValue: number;
     isDrawMode: boolean;
     listLayerShow: Array<string>;
     selectedTextId: string;
}

const initialState: mapState = {
     isMapLoaded: false,
     style: "default",
     mouseCoordinate: [0, 0],
     dragPan: true,
     viewPort: {
          latitude: 21,
          longitude: 105,
          zoom: 8,
     },
     zoomStepValue: 0,
     isDrawMode: false,
     listLayerShow: [
          "LAYER_DUONG_THUY",
          "LAYER_BIEN_GIOI",
          "LAYER_HANH_CHINH_TINH",
          "LAYER_DUONG_BO",
     ],
     selectedTextId: "",
};

export const mapSD = createSlice({
     name: "mapSD",
     initialState,
     reducers: {
          setMapLoaded: (state, action: PayloadAction<any>) => {
               state.isMapLoaded = action.payload;
          },
          changeMapStyle: (state, action: PayloadAction<string>) => {
               state.style = action.payload;
          },
          setMouseCoordinate: (state, action: PayloadAction<any>) => {
               state.mouseCoordinate = action.payload;
          },
          setViewPort: (state, action: PayloadAction<any>) => {
               state.viewPort = action.payload;
          },
          setDragPanable: (state, action: PayloadAction<boolean>) => {
               state.dragPan = action.payload;
          },
          setZoomStepValue: (state, action: PayloadAction<number>) => {
               state.zoomStepValue = action.payload;
          },
          setIsDrawMode: (state, action: PayloadAction<boolean>) => {
               state.isDrawMode = action.payload;
          },
          setListLayerShow: (state, action: PayloadAction<any>) => {
               state.listLayerShow = action.payload;
          },
          setSelectedTextId: (state, action: PayloadAction<any>) => {
               state.selectedTextId = action.payload;
          },
     },
});

export const {
     setMapLoaded,
     changeMapStyle,
     setMouseCoordinate,
     setViewPort,
     setDragPanable,
     setZoomStepValue,
     setIsDrawMode,
     setListLayerShow,
     setSelectedTextId,
} = mapSD.actions;

export default mapSD.reducer;
