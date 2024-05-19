import {useDispatch, useSelector} from 'react-redux';
import {
  authFailed,
  authRequested,
  authSuccess,
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
import {appointments, dateSlots, timeSlots} from '../redux/redux.constants';

export interface sendOTPPayload {
  phoneNumber: string;
  otherDetails?: any;
}
const useAuthService = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.userdata);
  const handleSendOTP = async (payload: sendOTPPayload, navigation: any) => {
    dispatch(otpRequested());
    try {
      // const response = await apiServices.logInCall(payload);
      const data = {phonenumber: payload.phoneNumber};
      dispatch(otpSuccess({data}));
      navigation.navigate('otpverification');
    } catch (error: any) {
      dispatch(otpFailed(error));
    }
  };

  const handleLogIn = async (payload: string, navigation: any) => {
    dispatch(authRequested());
    try {
      dispatch(authSuccess({}));
      //r dispatch(changehomeScreenTab(1));

      dispatch(upcomingAppointmentRequested());
      dispatch(appointmentListRequested());
      dispatch(dateSlotRequested());
      dispatch(timeSlotRequested());

      navigation.navigate('home');
    } catch (error) {
      dispatch(authFailed(error));
    }
  };

  return {
    handleSendOTP,
    handleLogIn,
  };
};

export default useAuthService;
