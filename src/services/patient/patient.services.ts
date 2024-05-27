import { AxiosResponse } from "axios";
import { baseClient } from "../api.cilents"
import { Endpoints } from "../constants"

export const addPatient = (payload:any) => {
   payload.age = parseInt(payload.age)
   return baseClient.post(Endpoints.registerPatient, payload)
}

export const getPatientList = async () => {
   const res:AxiosResponse = await baseClient.get(Endpoints.patientList);
   console.log('result patientList',res)
   return res;
 };