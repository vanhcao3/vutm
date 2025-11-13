// eslint-disable-next-line no-restricted-imports
import { Hub } from "@/features/airtrans/hub/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HubState {
     hub_list: Array<Hub>;
     hubs: Record<string, Hub>;
}

const initialState: HubState = {
     hub_list: [],
     hubs: {},
};

export const hubSlice = createSlice({
     name: "hubSlice",
     initialState,
     reducers: {
          setHubList: (state, action: PayloadAction<Array<Hub>>) => {
               state.hub_list = action.payload;
          },
          setHubs: (state, action: PayloadAction<Record<string, Hub>>) => {
               state.hubs = action.payload;
          },
     },
});

export const { setHubList, setHubs } = hubSlice.actions;

export default hubSlice.reducer;
