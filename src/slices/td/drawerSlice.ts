import { Privilege } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrawerInterface {
     privileges: Array<Privilege>;
     selectedItem: null | string;
     privilegeTree: Array<any>;
     tabs: Array<Privilege>;
}

const initialState: DrawerInterface = {
     privileges: [],
     selectedItem: null,
     privilegeTree: [],
     tabs: [],
};

export const drawerSlice = createSlice({
     name: "drawer",
     initialState,
     reducers: {
          setPrivileges: (state, action: PayloadAction<any>) => {
               state.privileges = action.payload;
          },
          setSelectedItem: (state, action: PayloadAction<string | null>) => {
               state.selectedItem = action.payload;
          },
          setPrivilegeTree: (state, action: PayloadAction<any>) => {
               state.privilegeTree = action.payload;
          },
          setPrivilegeTabs: (state, action: PayloadAction<any>) => {
               state.tabs = action.payload;
          },
     },
});

export const { setPrivileges, setSelectedItem, setPrivilegeTree, setPrivilegeTabs } =
     drawerSlice.actions;

export default drawerSlice.reducer;
