// apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { BaseURLs } from "./constants";
import { store } from "../redux";

const axiosConfig: AxiosRequestConfig = {
  baseURL: BaseURLs.baseurl,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosAuthConfig: AxiosRequestConfig = {
  baseURL: BaseURLs.baseurl,
  headers: {
    "Content-Type": "application/json",
  },
};

export const baseClient: AxiosInstance = axios.create(axiosConfig);
export const authClient: AxiosInstance = axios.create(axiosAuthConfig);

baseClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.userDetails?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('Request configuration headers:', config.headers);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
