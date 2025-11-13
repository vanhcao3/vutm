import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { lightTheme, darkTheme } from "@/assets/themes";
export interface ThemeState {
     type: string;
}
const initialState: ThemeState = {
     type: "dark",
};
export const themeSlice = createSlice({
     name: "theme",
     initialState,
     reducers: {
          changeTheme: (state) => {
               // Redux Toolkit allows us to write "mutating" logic in reducers. It
               // doesn't actually mutate the state because it uses the Immer library,
               // which detects changes to a "draft state" and produces a brand new
               // immutable state based off those changes
               const currentType = state.type;
               if (currentType == "light") {
                    state.type = "dark";
               } else {
                    state.type = "light";
               }
          },
     },
});

// Action creators are generated for each case reducer function
export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
