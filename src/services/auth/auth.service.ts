import {authClient, baseClient, protectedAuthClient} from '../api.cilents';
import {Endpoints} from '../constants';

export const requestOTP = (payload: any) => {
  try {
    return authClient.post(Endpoints.requestOTP, payload);
  } catch (err) {
    throw err;
  }
};

export const login = async (payload: any) => {
  try {
    const res = await authClient.post(Endpoints.login, payload);
    return res;
  } catch (err) {
    throw err;
  }
};

export const updateUser = async (payload: any) => {
  try {
    // //'baseclient is here', baseClient);
    const res = await protectedAuthClient.patch(Endpoints.updateUser, payload);
    return res;
  } catch (err) {
    throw err;
  }
};

export const userInfo = async (payload: any) => {
  try {
    // const res = await baseClient.get(Endpoints)
  } catch (err) {
    throw err;
  }
};
