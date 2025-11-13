export const API_URL = process.env.REACT_APP_API_URL as string;
export const JWT_SECRET = "123456" as string;
export const API_BASE_URL = "https://qc.c4i.vn/";
export const SOCKET_URL = "https://qc.c4i.vn/";
export const SECURITY_URL = "http://qc.c4i.vn/security";
export const AUTH_URL = (process.env.REACT_APP_AUTH_URL as string) || "http://172.21.55.79:30000";
export const HOME_URL = (process.env.REACT_APP_HOME_URL as string) || "http://172.21.55.79:3001";
export const SSO_DASHBOARD_URL =
     (process.env.REACT_APP_SSO_DASHBOARD_URL as string) || "http://172.21.55.79";
export const STREAM_URL =
     (process.env.REACT_APP_STREAM_URL as string) ||
     "https://airtransys.site:9443/stream-controller";
