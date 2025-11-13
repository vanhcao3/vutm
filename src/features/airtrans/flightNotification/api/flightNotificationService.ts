import { AxiosFactory } from "@/lib/axios";
import { AllFlightNotificationResponse, FlightNotification } from "../types/FlightNotification";
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

const flightNotificationService = AxiosFactory(
     "https://airtransys.site:9443/flight-authorization/flight-notifications"
);

flightNotificationService.interceptors.request.use(flightRequestInceptor);

export const getAllFlightNotifications = (): Promise<AllFlightNotificationResponse> => {
     return flightNotificationService.get("");
};

export const getOneFlightNotification = (id: string): Promise<FlightNotification> => {
     return flightNotificationService.get(`/${id}`);
};
