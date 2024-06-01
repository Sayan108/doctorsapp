import {AxiosResponse} from 'axios';
import {baseClient} from '../api.cilents';
import {Endpoints} from '../constants';

export const getClinicList = () => {
  return baseClient.get(Endpoints.clinicList);
};

export const availableSlots = async (params: any) => {
  const res: AxiosResponse = await baseClient.get(Endpoints.availableSlots, {
    params,
  });
  console.log(res.data);
  return res.data;
};
