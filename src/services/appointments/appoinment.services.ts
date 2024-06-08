import {serializeError, toQueryString} from '../../util/funtions.util';
import {baseClient} from '../api.cilents';
import {Endpoints} from '../constants';

export const addAppointment = (payload: any) => {
  return baseClient.post(Endpoints.addAppointment, payload);
};

export const getAppointmentList = async (payload: any) => {
  try {
    const config = await baseClient.getUri({url: Endpoints.getAppointmentList});
    console.log('Request configuration:', config);

    const queryString = toQueryString(payload);
    const urlWithQuery = `${Endpoints.getAppointmentList}?${queryString}`;
    const res = await baseClient.get(urlWithQuery);
    return res;
  } catch (err) {
    err = serializeError(err);
    throw err;
  }
};

export const getAppointmentDetails = async (payload: any) => {
  try {
    const url = `${Endpoints.appointmentDetails}?appointmentId=${payload.appointmentId}`;
    const res = await baseClient.get(url);
    return res;
  } catch (err) {
    const serializedError = serializeError(err);
    throw serializedError;
  }
};

//appointment update api call funtion
