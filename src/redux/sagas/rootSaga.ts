import {all} from 'redux-saga/effects';
import {
  watchAddAppointmentinList,
  watchFetchAppointmentDetails,
  watchFetchAppointmentList,
  watchFetchDateSlots,
  watchFetchTimeSlotsBasedOnDate,
  watchFetchUpcomingAppointment,
} from './userData.saga';
export default function* rootSaga() {
  yield all([
    watchFetchAppointmentList(),
    watchFetchDateSlots(),
    watchFetchTimeSlotsBasedOnDate(),
    watchFetchUpcomingAppointment(),
    watchFetchAppointmentDetails(),
    watchAddAppointmentinList(),
  ]);
}
