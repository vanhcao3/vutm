/* eslint-disable no-restricted-imports */

import { FlightLane } from "@/features/airtrans/flightCorridor/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FlightLaneState {
     flight_lane_list: Array<FlightLane>;
     flight_lanes: Record<string, FlightLane>;
     selected_id: string;
}

const initialState: FlightLaneState = {
     flight_lane_list: [],
     selected_id: "",
     flight_lanes: {},
};

export const flightLaneSlice = createSlice({
     name: "flightLaneSlice",
     initialState,
     reducers: {
          setFlightLaneList: (state, action: PayloadAction<Array<FlightLane>>) => {
               state.flight_lane_list = action.payload;
          },
          setFlightLanes: (state, action: PayloadAction<Record<string, FlightLane>>) => {
               state.flight_lanes = action.payload;
          },
     },
});

export const { setFlightLaneList, setFlightLanes } = flightLaneSlice.actions;

export default flightLaneSlice.reducer;
