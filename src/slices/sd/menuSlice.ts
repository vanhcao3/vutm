import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum MenuState {
     DEFAULT = 0,
     FILTER = 1,
     STATISTIC = 2,
     SETTING = 3,
     MAP = 4,
}

interface MenuSliceState {
     currentMenuState: MenuState;
}

const initialState: MenuSliceState = {
     currentMenuState: MenuState.DEFAULT,
};

export const menuSlice = createSlice({
     name: "menuSlice",
     initialState,
     reducers: {
          setCurrentMenu: (state, action: PayloadAction<MenuState>) => {
               if (action.payload !== state.currentMenuState)
                    state.currentMenuState = action.payload;
               else state.currentMenuState = MenuState.DEFAULT;
          },
          resetMenu: (state) => {
               state.currentMenuState = MenuState.DEFAULT;
          },
     },
});

export const { setCurrentMenu } = menuSlice.actions;

export default menuSlice.reducer;
