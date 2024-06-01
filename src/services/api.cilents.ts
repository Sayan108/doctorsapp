import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { BaseURLs } from "./constants";

import { RootState, store } from "../redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const axiosConfig: AxiosRequestConfig = {

  baseURL: BaseURLs.baseurl, // Set the base URL for your requests
  headers: {
    "Content-Type": "application/json", // Set the default content type
    // Authorization: `Bearer ${accessToken}`, //

    // }`, // Add any default headers you need
  },
};

const axiosAuthConfig: AxiosRequestConfig = {
  baseURL: BaseURLs.baseurl, // Set the base URL for your requests
  headers: {
    "Content-Type": "application/json", // Set the default content type
  },
};

// Create an Axios instance with your custom configuration
export const baseClient: AxiosInstance = axios.create(axiosConfig);

export const authClient: AxiosInstance = axios.create(axiosAuthConfig);

export function AxiosInterceptor({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  
  const accessToken = useSelector(
    (state: RootState) => state.auth.userDetails?.accessToken
  );

  console.log('accesstoken is here', accessToken);

  useEffect(() => {
    const reqBaseClientInterceptor = (request: any) => {
      request.headers.Authorization = `Bearer ${accessToken}`;
      return request;
    };

    const errorHandler = async (error: any): Promise<any> => {
      return await Promise.reject(error.response.data);
    };

    const interceptorBaseClient = baseClient.interceptors.request.use(
      reqBaseClientInterceptor,
      errorHandler
    );
    return () => {
      baseClient.interceptors.request.eject(interceptorBaseClient);
    };
  }, [accessToken]);

  return children;
}
