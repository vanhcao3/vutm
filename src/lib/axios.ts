import Axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

import { API_URL } from "@/config";
import cookie from "@/utils/cookies";
import NotificationService from "@/utils/notification";
// import storage from '@/utils/storage';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
     // const token = storage.getToken();
     const token = cookie.getToken();
     if (token) {
          config.headers.Authorization = `Bearer ${token}`;
     }
     config.headers.Accept = "application/json";
     return config;
}

export const AxiosFactory = (baseURL = "") => {
     const axios = Axios.create({
          baseURL,
     });

     axios.interceptors.request.use(authRequestInterceptor);
     axios.interceptors.response.use(
          (response) => {
               return response.data;
          },
          (error) => {
               const message = error.response?.data?.message || error.message;
               NotificationService.error(message);
               return Promise.reject(error);
          }
     );
     return axios;
};

export const axios = Axios.create({
     baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
     (response) => {
          return response.data;
     },
     (error) => {
          const message = error.response?.data?.message || error.message;
          NotificationService.error(message);
          return Promise.reject(error);
     }
);
