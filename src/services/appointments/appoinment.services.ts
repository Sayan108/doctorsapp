import {AxiosResponse} from 'axios';
import {IUpdateAppointment} from '../../redux/constants/appointment.constant';
import {serializeError, toQueryString} from '../../util/funtions.util';
import {baseClient} from '../api.cilents';
import {Endpoints} from '../constants';
import {doctorId} from '../../redux/redux.constants';

export const addAppointment = (payload: any) => {
  return baseClient.post(Endpoints.addAppointment, payload);
};

export const getAppointmentList = async (payload: any) => {
  try {
    const config = await baseClient.getUri({url: Endpoints.getAppointmentList});
    // console.log('Request configuration:', config);

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

export const updateAppointment = async (params: IUpdateAppointment) => {
  try {
    const res: AxiosResponse = await baseClient.patch(
      Endpoints.updateAppointment,
      params,
    );
    return res;
  } catch (err) {
    err = serializeError(err);
    throw err;
  }
};

export const getDashBoardData = async () => {
  try {
    const res: AxiosResponse = await baseClient.get(Endpoints.dashboardData, {
      params: {doctorid: doctorId},
    });
    return res;
  } catch (err) {
    err = serializeError(err);
    throw err;
  }
};

export const getDateTimeSlot = async (params: string) => {
  try {
    const res: AxiosResponse = await baseClient.get(
      Endpoints.updateAppointment,
    );
    return res;
  } catch (err) {
    err = serializeError(err);
    throw err;
  }
};

//appointment update api call funtion
