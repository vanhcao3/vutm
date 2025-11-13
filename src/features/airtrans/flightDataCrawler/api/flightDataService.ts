import { AxiosFactory } from "@/lib/axios";
import { FlightData } from "../type/FlightData";
import { InternalAxiosRequestConfig } from "axios";

const flightRequestInceptor = (config: InternalAxiosRequestConfig) => {
     // const token = storage.getToken();
     const token =
          "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJub3NpX3N5bmMiLCJpYXQiOjE3MzQwNTMxNjgsImV4cCI6MjA0OTQxMzE2OCwiZ3JvdXBfaWRzIjpbIjY3MDUxMTBhLTgwZTgtNDFlYy1iYmQwLTc3NDVkMmJlNDQyYyJdLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXX0._JtR87DKC7hvPWywDFhTShgS-ECeYQWygESJKCqKbg4j-McVgErZODB_OZODajaum4LZqyklQTJRgV1R-3CKAA";
     if (token) {
          config.headers.Authorization = `Bearer ${token}`;
     }
     config.headers.Accept = "application/json";
     return config;
};

const flightDataService = AxiosFactory(
     "http://172.21.5.219:30011/aviation-management/trails/active-trails?size=10000&page=0"
);

flightDataService.interceptors.request.use(flightRequestInceptor);

export const getAllFlights = (): Promise<FlightData[]> => {
     return flightDataService.get("/");
};
