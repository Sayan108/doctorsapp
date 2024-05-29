import {useDispatch, useSelector} from 'react-redux';
import {
  authFailed,
  authRequested,
  authSuccess,
  logOut,
  otpFailed,
  otpRequested,
  otpSuccess,
} from '../redux/silces/auth.silce';
import {changehomeScreenTab} from '../redux/silces/application.slice';
import {
  appointmentListRequested,
  appointmentListSucess,
  dateSlotRequested,
  dateSlotSucess,
  timeSlotRequested,
  timeSlotSucess,
  upcomingAppointmentRequested,
  upcomingAppointmentSucess,
} from '../redux/silces/userdata.slice';
import {RootState} from '../redux';
import {appointments, dateSlots, IUserDetails, timeSlots} from '../redux/redux.constants';
import { login, requestOTP } from '../services/auth/auth.service';
import { AxiosResponse } from 'axios';

export interface sendOTPPayload {
  phoneNo: string;
  otherDetails?: any;
}
const useAuthService = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.userdata);


  // const handleSendOTP = async (payload: sendOTPPayload, navigation: any) => {
  //   dispatch(otpRequested(payload));
  //   try {
  //     const response = await requestOTP(payload);
  //     console.log(response);
  //     const data = { phonenumber: payload.phoneNo };
  //     dispatch(otpSuccess({ data }));
  //     navigation.navigate('otpverification');
  //   } catch (error: any) {
  //     dispatch(otpFailed(error));
  //   }
  // };

  const handleSendOTP = async (payload: sendOTPPayload, navigation: any) => {
    dispatch(otpRequested());
    try {
      console.log(payload, 'in hook');
      const response = await requestOTP(payload);
      console.log(response);
      if (response.data?.statuscode === 200) {
        const data = {phoneNumber: payload.phoneNo};
        dispatch(otpSuccess({data}));
      }
      navigation.navigate('otpverification');
    } catch (error: any) {
      console.log(error);
      dispatch(otpFailed(error.message));
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
        fullname: data.fullName ?? '',
        accessToken: data.accessToken,
        userName: '',
        phoneNumber: data?.phoneNumber,
      };
      console.log(userObject, 'getting data');
      dispatch(authSuccess(userObject));
      // dispatch(upcomingAppointmentRequested());
      //dispatch(appointmentListRequested());
      // dispatch(dateSlotRequested());
      // dispatch(timeSlotRequested());

      navigation.navigate('home');
    } catch (error) {
      dispatch(authFailed(error));
    }
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return {
    handleSendOTP,
    handleLogIn,
    handleLogOut,
  };
};

export default useAuthService;
