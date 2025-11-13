/* eslint-disable no-restricted-imports */
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserInfo } from "@/types";
import { CheckAuth } from "@/features/auth/api/check-auth";
import { GetUserInfo } from "@/features/auth/api/user-info";
import { AUTH_URL } from "@/config";

type AuthContextType = {
     user: UserInfo | null;
     authStatus: number;
     login: (redirectPath: string) => void;
     logout: (redirectPath: string) => void;
     checkAuth: () => void;
     userInfo: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
     const [user, setUser] = useState<UserInfo | null>(null);
     const [authStatus, setAuthStatus] = useState<number>(401);

     useEffect(() => {
          checkAuth();
          userInfo();
     }, []);

     const checkAuth = async () => {
          try {
               const status = await CheckAuth();
               setAuthStatus(status);
          } catch {
               setUser(null);
          }
     };

     const userInfo = async () => {
          try {
               const info = await GetUserInfo();
               setUser(info);
          } catch {
               setUser(null);
          }
     };

     const login = (redirectPath: string) => {
          localStorage.setItem("authRedirect", redirectPath);
          localStorage.setItem("loginPending", "true");
          window.location.href = `${AUTH_URL}/oauth2/start?rd=${encodeURIComponent(redirectPath)}`;
          localStorage.setItem("loggedIn", "true");
     };

     const logout = (redirectPath: string) => {
          window.location.href = `${AUTH_URL}/oauth2/sign_out?rd=${encodeURIComponent(
               redirectPath
          )}`;
          localStorage.setItem("loggedIn", "false");
     };

     return (
          <AuthContext.Provider value={{ user, authStatus, login, logout, checkAuth, userInfo }}>
               {children}
          </AuthContext.Provider>
     );
}

export const useAuth = () => {
     const ctx = useContext(AuthContext);
     if (!ctx) throw new Error("useAuth must be used within AuthProvider");
     return ctx;
};
