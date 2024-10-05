import {useDispatch, useSelector} from 'react-redux';
import {
  authFailed,
  authRequested,
  authSuccess,
  logOut,
  otpFailed,
  otpRequested,
  otpSuccess,
  updateUserFailed,
  updateUserRequested,
  updateUserSuccess,
} from '../redux/silces/auth.silce';

import {RootState} from '../redux';
import {IUserDetails} from '../redux/constants/userdata.constants';
import {login, requestOTP, updateUser} from '../services/auth/auth.service';
import {AxiosResponse} from 'axios';
import {serializeError} from '../util/funtions.util';
import {appointmentListRequested} from '../redux/silces/userdata.slice';

export interface sendOTPPayload {
  phoneNo: string;
  otherDetails?: any;
}

const useAuthService = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.userdata);

  const handleSendOTP = async (payload: sendOTPPayload, navigation: any) => {
    dispatch(otpRequested());
    try {
      const response = await requestOTP(payload);
      const data = {phonenumber: payload.phoneNo};
      dispatch(otpSuccess({data}));
      navigation.navigate('otpverification');
    } catch (error: any) {
      error = serializeError(error);
      dispatch(otpFailed(error));
    }
  };

  const handleLogIn = async (payload: any, navigation: any) => {
    dispatch(authRequested());
    try {
      const {
        data: {data},
      }: AxiosResponse = await login(payload);

      const userObject: IUserDetails = {
        userID: data.userId ?? '',
        //userName: username??'',
        fullname: data.fullname ?? '',
        accessToken: data.access_token,
        userName: '',
        phoneNo: data?.phoneNumber,
      };
      // console.log(userObject, 'getting data');
      dispatch(authSuccess(userObject));
      navigation.navigate('home');
    } catch (error) {
      error = serializeError(error);
      dispatch(authFailed(error));
    }
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const handleUserUpdate = async (payload: any) => {
    dispatch(updateUserRequested());
    try {
      const response = await updateUser(payload);

      const data = response?.data?.data ?? response?.data ?? response;

      const userObject = {
        fullname: data?.fullname,
        phoneNo: data?.phoneNumber,
      };
      dispatch(updateUserSuccess(userObject));
    } catch (err) {
      err = serializeError(err);
      dispatch(updateUserFailed(err));
    }
  };

  return {
    handleSendOTP,
    handleLogIn,
    handleLogOut,
    handleUserUpdate,
  };
};

export default useAuthService;
