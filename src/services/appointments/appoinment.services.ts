import { serializeError } from "../../util/funtions.util";
import { baseClient } from "../api.cilents";
import { Endpoints } from "../constants";

export const addAppointment = (payload: any) => {
  return baseClient.post(Endpoints.addAppointment, payload);
};

export const getAppointmentList = async () => {
 try{ 
  const config = await baseClient.getUri({ url: Endpoints.getAppointmentList });
  console.log('Request configuration:', config);
  const res = await baseClient.get(Endpoints.getAppointmentList);
  return res;}
  catch(err){
    err = serializeError(err);
    throw err;
  }
};


//appointment update api call funtion 
