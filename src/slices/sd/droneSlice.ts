// eslint-disable-next-line no-restricted-imports
import { DroneInfo } from "@/features/airtrans/drones/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DroneInfoState {
     currentDrone: DroneInfo | null;
     drones: Record<string, DroneInfo>;
}

const initialState: DroneInfoState = {
     currentDrone: null,
     drones: {},
};

export const droneSlice = createSlice({
     name: "droneInfoSlice",
     initialState,
     reducers: {
          setCurrentDrone: (state, action: PayloadAction<DroneInfo>) => {
               state.currentDrone = action.payload;
          },
          setCurrentDroneField: (state, action: PayloadAction<Partial<DroneInfo>>) => {
               if (state.currentDrone)
                    state.currentDrone = { ...state.currentDrone, ...action.payload };
          },
          updateSingleDrone: (state, action: PayloadAction<DroneInfo>) => {
               const { id } = action.payload;
               state.drones[id] = action.payload;
          },
          setDrones: (state, action: PayloadAction<Record<string, DroneInfo>>) => {
               state.drones = action.payload;
          },
     },
});

export const { setCurrentDrone, setCurrentDroneField, updateSingleDrone, setDrones } =
     droneSlice.actions;

export default droneSlice.reducer;
