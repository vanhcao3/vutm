/* eslint-disable no-restricted-imports */
import { DirectCommand } from "@/features/airtrans/directCommand/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "zod";

interface DirectCommandState {
     direct_command_list: Array<DirectCommand>;
     direct_commands: Record<string, DirectCommand>;
}

const initialState: DirectCommandState = {
     direct_command_list: [],
     direct_commands: {},
};

export const directCommandSlice = createSlice({
     name: "directCommandSlice",
     initialState,
     reducers: {
          setListDirectCommands: (state, action: PayloadAction<Array<DirectCommand>>) => {
               state.direct_command_list = action.payload;
          },
          setDirectCommands: (state, action: PayloadAction<Record<string, DirectCommand>>) => {
               state.direct_commands = action.payload;
          },
     },
});

export const { setListDirectCommands, setDirectCommands } = directCommandSlice.actions;

export default directCommandSlice.reducer;
