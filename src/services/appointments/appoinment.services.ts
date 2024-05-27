import { baseClient } from "../api.cilents";
import { Endpoints } from "../constants";

export const addAppointment = (payload: any) => {
  return baseClient.post(Endpoints.addAppointment, payload);
};

export const getAppointmentList = () => {
  return baseClient.get(Endpoints.getAppointmentList);
};


//appointment update api call funtion 
