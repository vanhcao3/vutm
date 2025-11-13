/* eslint-disable no-restricted-imports */
import { FlightCorridor } from "@/features/airtrans/flightCorridor/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FlightCorridorState {
     flight_corridors_list: Array<FlightCorridor>;
     flight_corridors: Record<string, FlightCorridor>;
     selected_id: string;
}

const initialState: FlightCorridorState = {
     flight_corridors_list: [],
     selected_id: "",
     flight_corridors: {},
};

export const flightCorridorSlice = createSlice({
     name: "flightCorridorSlice",
     initialState,
     reducers: {
          setFlightCorridorList: (state, action: PayloadAction<Array<FlightCorridor>>) => {
               state.flight_corridors_list = action.payload;
          },
          setFlightCorridors: (state, action: PayloadAction<Record<string, FlightCorridor>>) => {
               state.flight_corridors = action.payload;
          },
     },
});

export const { setFlightCorridorList, setFlightCorridors } = flightCorridorSlice.actions;

export default flightCorridorSlice.reducer;
