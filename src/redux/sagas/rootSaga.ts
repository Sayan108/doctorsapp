import {all} from 'redux-saga/effects';
import {
  watchAddAppoinmentinList,
  watchFetchAppoinmentDetails,
  watchFetchAppoinmentList,
  watchFetchDateSlots,
  watchFetchTimeSlotsBasedOnDate,
  watchFetchUpcomingAppoinment,
} from './userData.saga';
export default function* rootSaga() {
  yield all([
    watchFetchAppoinmentList(),
    watchFetchDateSlots(),
    watchFetchTimeSlotsBasedOnDate(),
    watchFetchUpcomingAppoinment(),
    watchFetchAppoinmentDetails(),
    watchAddAppoinmentinList(),
  ]);
}
