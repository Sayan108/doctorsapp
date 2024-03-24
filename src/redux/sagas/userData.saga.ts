import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {
  addAppoinmentInListRequested,
  addAppoinmentInListSuccess,
  appoinmentListFailure,
  appoinmentListRequested,
  appoinmentListSucess,
  dateSlotFailure,
  dateSlotRequested,
  dateSlotSucess,
  getAppoinmentDetailsFailure,
  getAppoinmentDetailsRequested,
  getAppoinmentDetailsSuccess,
  timeSlotFailure,
  timeSlotRequested,
  timeSlotSucess,
  upcomingAppoinmentFailure,
  upcomingAppoinmentRequested,
  upcomingAppoinmentSucess,
} from '../silces/userdata.slice';
import {
  IAppoinment,
  appointments,
  dateSlots,
  timeSlots,
} from '../redux.constants';
import {store} from '..';

function* fetchUpcomingAppoinment(
  action: ActionType<typeof upcomingAppoinmentRequested>,
) {
  try {
    yield put(upcomingAppoinmentSucess(appointments[5]));
  } catch (error) {
    yield put(upcomingAppoinmentFailure(error));
  }
}

function* fetchAppoinmentList(
  action: ActionType<typeof appoinmentListRequested>,
) {
  try {
    const data: IAppoinment[] = appointments;
    yield put(appoinmentListSucess(data));
  } catch (error) {
    yield put(appoinmentListFailure(error));
  }
}

function* fetchDateSlots(action: ActionType<typeof dateSlotRequested>) {
  try {
    yield put(dateSlotSucess(dateSlots));
  } catch (error) {
    yield put(dateSlotFailure(error));
  }
}

function* fetchTimeSlotsBasedOnDate(
  action: ActionType<typeof timeSlotRequested>,
) {
  try {
    yield put(timeSlotSucess(timeSlots));
  } catch (error) {
    yield put(timeSlotFailure(error));
  }
}

function* fetchAppoinmentDetails(
  action: ActionType<typeof getAppoinmentDetailsRequested>,
) {
  try {
    console.log(appointments[action.payload]);
    yield put(getAppoinmentDetailsSuccess(appointments[action.payload]));
  } catch (error) {
    yield put(getAppoinmentDetailsFailure(error));
  }
}

function* addAppoinmentInListSaga(
  action: ActionType<typeof addAppoinmentInListRequested>,
) {
  const {
    userdata: {appoinmentForm},
  } = store.getState();
  const {
    userdata: {
      appoinmentList: {data},
    },
  } = store.getState();
  try {
    // do necessary api calls here
    const appData: IAppoinment = {
      patientName: appoinmentForm?.patientName ?? '',
      doctorName: 'Dr. Debabrata Bera',
      clinicAddress: 'Somewhere on earth',
      clinicPhone: appoinmentForm?.patientPhone ?? '',
      appoinmentDate: appoinmentForm?.appoinmentDate ?? '',
      appoinmentTime: appoinmentForm?.appoinmentTime ?? '',
      problem: appoinmentForm?.problem,
      appoinmentId: (data.length + 1).toString(),
    };
    yield put(addAppoinmentInListSuccess(appData));
  } catch (error) {
    yield put(getAppoinmentDetailsFailure(error));
  }
}
export function* watchFetchUpcomingAppoinment() {
  yield takeEvery(upcomingAppoinmentRequested.type, fetchUpcomingAppoinment);
}

export function* watchFetchAppoinmentList() {
  yield takeEvery(appoinmentListRequested.type, fetchAppoinmentList);
}

export function* watchFetchDateSlots() {
  yield takeEvery(dateSlotRequested.type, fetchDateSlots);
}

export function* watchFetchTimeSlotsBasedOnDate() {
  yield takeEvery(timeSlotRequested.type, fetchTimeSlotsBasedOnDate);
}

export function* watchFetchAppoinmentDetails() {
  yield takeEvery(getAppoinmentDetailsRequested.type, fetchAppoinmentDetails);
}

export function* watchAddAppoinmentinList() {
  yield takeLatest(addAppoinmentInListRequested.type, addAppoinmentInListSaga);
}
