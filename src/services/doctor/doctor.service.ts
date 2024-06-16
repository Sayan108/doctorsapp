import {AxiosResponse} from 'axios';
import {baseClient} from '../api.cilents';
import {Endpoints} from '../constants';

export const doctorDetails = async (params: any) => {
  const res: AxiosResponse = await baseClient.get(Endpoints.doctorDetails, {
    params,
  });
  // console.log(res.data);
  return res.data;
};
