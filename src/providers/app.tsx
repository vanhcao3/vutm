import * as React from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router } from "react-router-dom";

import { Spinner } from "@/components/Elements";
import { AuthProvider } from "@/lib/auth";
import { queryClient } from "@/lib/react-query";

import { CustomThemeProvider } from "./customThemeProvider";
import { Notification } from "@/components/Notification";
import { useState } from "react";

import { RootState } from "@/slices";
import { useSelector } from "react-redux";
import { socket, SocketContext } from "@/lib/socket";

type AppProviderProps = {
     children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
     const themeType = useSelector((state: RootState) => state.theme.type);
     const [theme, setTheme] = useState(true);
     const handleChangeTheme = () => {
          setTheme(!theme);
     };
     return (
          <React.Suspense
               fallback={
                    <div className="flex items-center justify-center w-screen h-screen">
                         <Spinner size="xl" />
                    </div>
               }
          >
               <HelmetProvider>
                    <QueryClientProvider client={queryClient}>
                         <AuthProvider>
                              <CustomThemeProvider isLight={theme} changeTheme={handleChangeTheme}>
                                   <SocketContext.Provider value={socket}>
                                        <Router>{children}</Router>
                                   </SocketContext.Provider>
                              </CustomThemeProvider>
                         </AuthProvider>
                         <Notification themeType={themeType == "light" ? "light" : "dark"} />
                    </QueryClientProvider>
               </HelmetProvider>
          </React.Suspense>
     );
};
