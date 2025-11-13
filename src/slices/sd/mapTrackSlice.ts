import { initialTrack } from "@/config/defaultValue";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// eslint-disable-next-line import/no-unresolved,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { Point, LngLat } from "!mapbox-gl";

interface TrackState {
     fullMapTrack: any;
     selectedTrackDetail: any;
     selectedTrackId: number;
     mapSize: number;
     selectedTrackIds: number[];
     selectedManualTrackId: number;
     flyToCoordinate: Array<number>;
     isOpenFormHistory: boolean;
     ctxMenuMapLocation: Point;
     ctxMenuMapLngLat: LngLat;
     trackConfirmId: number;
     isUpdateTrack: boolean;
}

const initialState: TrackState = {
     fullMapTrack: new Map(),
     selectedTrackDetail: initialTrack,
     selectedTrackId: 0,
     mapSize: 0,
     selectedTrackIds: [],
     selectedManualTrackId: 0,
     flyToCoordinate: [],
     isOpenFormHistory: false,
     ctxMenuMapLocation: { x: 0, y: 0 },
     ctxMenuMapLngLat: { x: 0, y: 0 },
     trackConfirmId: 0,
     isUpdateTrack: false,
};

export const mapTrack = createSlice({
     name: "mapTrack",
     initialState,
     reducers: {
          setMapTracks: (state, action: PayloadAction<any>) => {
               state.fullMapTrack = action.payload;
          },
          setSelectedTrackID: (state, action: PayloadAction<any>) => {
               state.selectedTrackId = action.payload;
          },
          setSelectedTrackDetail: (state, action: PayloadAction<any>) => {
               state.selectedTrackDetail = action.payload;
          },
          setSelectedTrackIDs: (state, action: PayloadAction<any>) => {
               state.selectedTrackIds = action.payload;
          },
          addSelectedTrack: (state, action: PayloadAction<any>) => {
               const listSelectedTrackIds = [...state.selectedTrackIds];
               const trackIndex = listSelectedTrackIds.indexOf(action.payload);
               if (trackIndex === -1) listSelectedTrackIds.push(action.payload);
               else {
                    const selectedTrackIndex = listSelectedTrackIds.findIndex(
                         (value: number) => value === action.payload
                    );
                    if (selectedTrackIndex >= 0) listSelectedTrackIds.splice(selectedTrackIndex, 1);
               }
               state.selectedTrackIds = action.payload === undefined ? [] : listSelectedTrackIds;
          },
          setMapSize: (state, action: PayloadAction<number>) => {
               state.mapSize = action.payload;
          },
          updateMapTrack: (state, action: PayloadAction<any>) => {
               const { trackId, trackDetail } = action.payload;
               state.fullMapTrack.set(trackId, trackDetail);
          },
          removeMapTrack: (state, action: PayloadAction<any>) => {
               const idToRemove = [...action.payload];
               const newMap = new Map(state.fullMapTrack);
               idToRemove.forEach((trackId: number) => {
                    newMap.delete(trackId);
               });
               state.fullMapTrack = newMap;
          },
     },
});

export const {
     setMapTracks,
     setSelectedTrackID,
     setSelectedTrackIDs,
     addSelectedTrack,
     setSelectedTrackDetail,
     setMapSize,
     updateMapTrack,
     removeMapTrack,
} = mapTrack.actions;

export default mapTrack.reducer;
