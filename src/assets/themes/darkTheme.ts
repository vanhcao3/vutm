import { createTheme, PaletteMode } from "@mui/material";
export const darkTheme = createTheme({
     palette: {
          mode: "dark" as PaletteMode,
     },
     typography: {
          allVariants: {
               color: "white",
          },
          fontFamily: "Inter",
     },
     components: {
          MuiCssBaseline: {
               styleOverrides: `
       @font-face {
         font-family: 'Inter';
         font-style: normal;
         font-display: swap;
         font-weight: 400;
         unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
       }
     `,
          },
          MuiSwitch: {
               styleOverrides: {
                    switchBase: {
                         // Controls default (unchecked) color for the thumb
                         color: "#ccc",
                    },
                    colorSecondary: {
                         "&$checked": {
                              // Controls checked color for the thumb
                              color: "#ccc",
                         },
                    },
                    track: {
                         // Controls default (unchecked) color for the track
                         opacity: 1,
                         backgroundColor: "red",
                         "$checked$checked + &": {
                              // Controls checked color for the track
                              opacity: 1,
                              backgroundColor: "green",
                         },
                    },
               },
          },
     },
});
