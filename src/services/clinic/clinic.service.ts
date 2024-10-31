import {AxiosResponse} from 'axios';
import {baseClient} from '../api.cilents';
import {Endpoints} from '../constants';
import {serializeError} from '../../util/funtions.util';
import {IUpdateAppointment} from '../../redux/constants/appointment.constant';

export const getClinicList = async (params: any) => {
  try {
    const res = await baseClient.get(Endpoints.clinicList, {params});
    return res;
  } catch (err) {
    serializeError(err);
    throw err;
  }
};

export const availableSlots = async (params: string) => {
  //'inside api call');
  const res: AxiosResponse = await baseClient.get(Endpoints.availableSlots, {
    params: {clinicId: params},
  });

  return res;
};
