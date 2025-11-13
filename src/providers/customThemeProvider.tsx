import * as React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box, CssBaseline, IconButton, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "@/assets/themes";
import { RootState } from "@/slices";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../slices/themeSlice";
type ThemeProps = {
     children: React.ReactNode;
     isLight: boolean;
     changeTheme: () => void;
};

export const CustomThemeProvider = ({ children }: ThemeProps) => {
     const themeType = useSelector((state: RootState) => state.theme.type);
     const dispatch = useDispatch();
     const appliedTheme = themeType == "light" ? lightTheme : darkTheme;
     return (
          <ThemeProvider theme={appliedTheme}>
               <CssBaseline />
               <Box
                    sx={{
                         backgroundColor: `background.default`,
                         width: "100%",
                         minHeight: "100vh",
                         display: "block",
                         color: "text.primary",
                    }}
               >
                    <IconButton
                         sx={{
                              ml: 1,
                              position: "fixed",
                              bottom: "0.5%",
                              right: "1%",
                              zIndex: 10,
                         }}
                         color="inherit"
                         onClick={() => dispatch(changeTheme())}
                    >
                         {appliedTheme.palette.mode === "dark" ? (
                              <Brightness7Icon />
                         ) : (
                              <Brightness4Icon />
                         )}
                    </IconButton>
                    {children}
               </Box>
          </ThemeProvider>
     );
};