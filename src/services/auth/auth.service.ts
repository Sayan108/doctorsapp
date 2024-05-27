import { authClient } from "../api.cilents";
import { Endpoints } from "../constants";

export const requestOTP = (payload: any) => {
  return authClient.post(Endpoints.requestOTP, payload);
};

export const login = (payload: any) => {
  return authClient.post(Endpoints.login, payload);
};
