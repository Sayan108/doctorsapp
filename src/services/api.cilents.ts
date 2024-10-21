// apiClient.ts
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {BaseURLs} from './constants';
import {RootState, store} from '../redux';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';

const axiosConfig: AxiosRequestConfig = {
  baseURL: BaseURLs.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosAuthConfig: AxiosRequestConfig = {
  baseURL: BaseURLs.authBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const baseClient: AxiosInstance = axios.create(axiosConfig);
export const authClient: AxiosInstance = axios.create(axiosAuthConfig);

export const protectedAuthClient: AxiosInstance = axios.create(axiosAuthConfig);

export function AxiosInterceptor({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const accessToken = useSelector(
    (state: RootState) => state.auth.userDetails?.accessToken,
  );
  useEffect(() => {
    const reqBaseClientInterceptor = (request: any) => {
      console.log(accessToken?.length , "getting token length")
      request.headers.Authorization = `Bearer ${accessToken}`;
      return request;
    };

    const reqProtectedAuthClientInterceptor = (request: any) => {
      request.headers.Authorization = `Bearer ${accessToken}`;
      return request;
    };

    const errorHandler = async (error: any): Promise<any> => {
      return await Promise.reject(error.response.data);
    };

    const interceptorBaseClient = baseClient.interceptors.request.use(
      reqBaseClientInterceptor,
      errorHandler,
    );
    const interceptorProtectedAuthClient =
      protectedAuthClient.interceptors.request.use(
        reqProtectedAuthClientInterceptor,
        errorHandler,
      );
    return () => {
      baseClient.interceptors.request.eject(interceptorBaseClient);
      protectedAuthClient.interceptors.request.eject(
        interceptorProtectedAuthClient,
      );
    };
  }, [accessToken]);

  return children;
}
