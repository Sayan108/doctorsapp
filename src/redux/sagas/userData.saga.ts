import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {
  addAppointmentInListRequested,
  addAppointmentInListSuccess,
  appointmentListFailure,
  appointmentListRequested,
  appointmentListSucess,
  dateSlotFailure,
  dateSlotRequested,
  dateSlotSucess,
  getAppointmentDetailsFailure,
  getAppointmentDetailsRequested,
  getAppointmentDetailsSuccess,
  timeSlotFailure,
  timeSlotRequested,
  timeSlotSucess,
  upcomingAppointmentFailure,
  upcomingAppointmentRequested,
  upcomingAppointmentSucess,
} from '../silces/userdata.slice';
import {
  IAppointment,
  appointments,
  dateSlots,
  timeSlots,
} from '../redux.constants';
import {store} from '..';

function* fetchUpcomingAppointment(
  action: ActionType<typeof upcomingAppointmentRequested>,
) {
  try {
    yield put(upcomingAppointmentSucess(appointments[5]));
  } catch (error) {
    yield put(upcomingAppointmentFailure(error));
  }
}

function* fetchAppointmentList(
  action: ActionType<typeof appointmentListRequested>,
) {
  try {
    const data: IAppointment[] = appointments;
    yield put(appointmentListSucess(data));
  } catch (error) {
    yield put(appointmentListFailure(error));
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

function* fetchAppointmentDetails(
  action: ActionType<typeof getAppointmentDetailsRequested>,
) {
  try {
    console.log(appointments[action.payload]);
    yield put(getAppointmentDetailsSuccess(appointments[action.payload]));
  } catch (error) {
    yield put(getAppointmentDetailsFailure(error));
  }
}

function* addAppointmentInListSaga(
  action: ActionType<typeof addAppointmentInListRequested>,
) {
  const {
    userdata: {appointmentForm},
  } = store.getState();
  const {
    userdata: {
      appointmentList: {data},
    },
  } = store.getState();
  try {
    // do necessary api calls here
    const appData: IAppointment = {
      patientName: appointmentForm?.patientName ?? '',
      doctorName: 'Dr. Debabrata Bera',
      clinicAddress: 'Somewhere on earth',
      clinicPhone: appointmentForm?.patientPhone ?? '',
      appointmentDate: appointmentForm?.appointmentDate ?? '',
      appointmentTime: appointmentForm?.appointmentTime ?? '',
      problem: appointmentForm?.problem,
      appointmentId: (data.length + 1).toString(),
    };
    yield put(addAppointmentInListSuccess(appData));
  } catch (error) {
    yield put(getAppointmentDetailsFailure(error));
  }
}
export function* watchFetchUpcomingAppointment() {
  yield takeEvery(upcomingAppointmentRequested.type, fetchUpcomingAppointment);
}

export function* watchFetchAppointmentList() {
  yield takeEvery(appointmentListRequested.type, fetchAppointmentList);
}

export function* watchFetchDateSlots() {
  yield takeEvery(dateSlotRequested.type, fetchDateSlots);
}

export function* watchFetchTimeSlotsBasedOnDate() {
  yield takeEvery(timeSlotRequested.type, fetchTimeSlotsBasedOnDate);
}

export function* watchFetchAppointmentDetails() {
  yield takeEvery(getAppointmentDetailsRequested.type, fetchAppointmentDetails);
}

export function* watchAddAppointmentinList() {
  yield takeLatest(addAppointmentInListRequested.type, addAppointmentInListSaga);
}
