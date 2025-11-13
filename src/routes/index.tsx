import { useRoutes } from "react-router-dom";

import { useAuth } from "@/lib/auth";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
     const auth = useAuth();

     // edit temporary for develop
     // auth["user"] = {
     //      username: "qcnamvh21",
     //      id: "d0049782-2f15-4162-9e54-5ec51f983862",
     //      unitCode: "qc",
     // } as AuthUser;
     const routes = auth.user ? protectedRoutes : publicRoutes;
     const element = useRoutes([...routes]);

     return <>{element}</>;
};
