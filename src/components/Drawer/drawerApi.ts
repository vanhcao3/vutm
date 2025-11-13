import { SECURITY_URL } from "@/config";
import Axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import NotificationService from "@/utils/notification";

export const axios = Axios.create({
     baseURL: SECURITY_URL + "/privileges",
});

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
     config.headers.Authorization = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxY2h1bmdscTIyIiwiZXhwIjoxNjc2NTM2MTkxLCJpYXQiOjE2NDUwMDAxOTF9.FeFNT_GQGrWGiZ1ty0SEKKFE9H4CV79bSisUTY4flCE1Naik6js2osS1jRxlCfEjebDo4EjUIpddzvfBKGvP2A";
     config.headers.Accept = "application/json";
     return config;
});

axios.interceptors.response.use(
     (response) => {
          return response.data;
     },
     (error) => {
          const message = error.response?.data?.message || error.message;
          NotificationService.error("Error", message);
          return Promise.reject(error);
     }
);
