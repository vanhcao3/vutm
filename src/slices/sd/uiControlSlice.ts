import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import BasicMap from "@/assets/images/mapPreview/Basic.png";
import OSM_1 from "@/assets/images/mapPreview/OSM_1.png";
import OSM_2 from "@/assets/images/mapPreview/OSM_2.png";
import Street from "@/assets/images/mapPreview/Street.png";
import Tinh from "@/assets/images/mapPreview/Tinh.png";
import Xa from "@/assets/images/mapPreview/Xa.png";

export interface MapMenuInterface {
     label: string;
     img: string;
     url: string;
}
export const MAP_MENU = [
     {
          label: "Lớp cơ bản",
          img: BasicMap,
          url: "https://airtransys.site:9443/ms-tile-server/styles/basic/style.json",
     },
     {
          label: "Open Street Map 1",
          img: OSM_1,
          url: "https://airtransys.site:9443/ms-tile-server/styles/liberty/style.json",
     },
     {
          label: "Open Street Map 2",
          img: OSM_2,
          url: "https://airtransys.site:9443/ms-tile-server/styles/streets-v2/style.json",
     },
     {
          label: "Open Street Map 3",
          img: Street,
          url: "https://airtransys.site:9443/ms-tile-server/styles/openstreetmap/style.json",
     },
     {
          label: "Tỉnh (sau sát nhập)",
          img: Tinh,
          url: "https://airtransys.site:9443/ms-tile-server/styles/hanhchinh_tinh/style.json",
     },
     {
          label: "Xã (sau sát nhập)",
          img: Xa,
          url: "https://airtransys.site:9443/ms-tile-server/styles/hanhchinh_xa/style.json",
     },
];

interface UiControlSliceState {
     selectedMap: MapMenuInterface;
}

const initialState: UiControlSliceState = {
     selectedMap: MAP_MENU[0],
};

export const uiControlSlice = createSlice({
     name: "uiControlSlice",
     initialState,
     reducers: {
          setCurrentMap: (state, action: PayloadAction<MapMenuInterface>) => {
               state.selectedMap = action.payload;
          },
     },
});

export const { setCurrentMap } = uiControlSlice.actions;

export default uiControlSlice.reducer;
