// eslint-disable-next-line no-restricted-imports
import { DroneInfo, Track } from "@/features/airtrans/drones/types";
import { convertArrayToObject } from "@/utils/convert";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TrackState {
     currentTrack: Track | null;
     tracks: Record<string, Track>;
     selected_id: number;
}

const initialState: TrackState = {
     currentTrack: null,
     selected_id: -1,
     tracks: {},
};

export const trackSlice = createSlice({
     name: "trackSlice",
     initialState,
     reducers: {
          setCurrentTrack: (state, action: PayloadAction<Track>) => {
               state.currentTrack = action.payload;
          },
          setCurrentTrackField: (state, action: PayloadAction<Partial<DroneInfo>>) => {
               if (state.currentTrack)
                    state.currentTrack = { ...state.currentTrack, ...action.payload };
          },
          updateSingleTrack: (state, action: PayloadAction<DroneInfo>) => {
               const { id } = action.payload;
               state.currentTrack[id] = action.payload;
          },
          setCurrentTrackId: (state, action: PayloadAction<number>) => {
               state.selected_id = action.payload;
          },
          setUpdatedTracks: (state, action: PayloadAction<Track[]>) => {
               const recordTrack = convertArrayToObject(action.payload, "object_track_id");
               state.tracks = recordTrack;
          },
     },
});

export const {
     setCurrentTrack,
     setCurrentTrackField,
     updateSingleTrack,
     setCurrentTrackId,
     setUpdatedTracks,
} = trackSlice.actions;

export default trackSlice.reducer;
