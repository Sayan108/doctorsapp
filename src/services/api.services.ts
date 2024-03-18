// This file will be containing our core logic for the api calls
// we can have multiple this type files if we need

import { baseClient } from "./api.clients";
import { IRegistrationPaylaod } from "./api.constants";
import { apiEndpoints } from "./api.endpoints";

const registrationCall = async (payload: IRegistrationPaylaod) => {
  return await baseClient.post(apiEndpoints.registration, payload);
};

const logInCall = async (payload: any) => {
  return await baseClient.post(apiEndpoints.login, payload);
};

export const apiServices = {
  registrationCall,
  logInCall,
};
