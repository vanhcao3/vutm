/* eslint-disable no-restricted-imports */
import { FlightArea } from "@/features/airtrans/flightArea/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "zod";

interface FlighAreaState {
     flight_area_list: Array<FlightArea>;
     flight_areas: Record<string, FlightArea>;
}

const initialState: FlighAreaState = {
     flight_area_list: [],
     flight_areas: {},
};

export const flightAreaSlice = createSlice({
     name: "flightAreaSlice",
     initialState,
     reducers: {
          setFlightAreaList: (state, action: PayloadAction<Array<FlightArea>>) => {
               state.flight_area_list = action.payload;
          },
          setFlightAreas: (state, action: PayloadAction<Record<string, FlightArea>>) => {
               state.flight_areas = action.payload;
          },
     },
});

export const { setFlightAreaList, setFlightAreas } = flightAreaSlice.actions;

export default flightAreaSlice.reducer;
