import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

export function PrivateRoute({ children }: { children: JSX.Element }) {
     const { authStatus } = useAuth();

     // if (authStatus !== 200) {
     //      return <Navigate to="/auth/login" />;
     // }

     return children;
}
