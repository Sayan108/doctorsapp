import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {
  appointmentListFailure,
  appointmentListRequested,
  appointmentListSuccess,
  getAppointmentDetailsFailure,
  getAppointmentDetailsRequested,
  getAppointmentDetailsSuccess,
  updateAppointmentFailed,
  updateAppointmentRequested,
  updateAppointmentSuccess,
  // upcomingAppointmentFailure,
  // upcomingAppointmentRequested,
} from '../silces/userdata.slice';

import {
  addAppointment,
  getAppointmentDetails,
  getAppointmentList,
  updateAppointment,
} from '../../services/appointments/appoinment.services';
// import { addAppoinemt } from "../../services/appointments/api.services";
import {IAppointment} from '../constants/appointment.constant';
import { AxiosResponse } from 'axios';
import { serializeError } from '../../util/funtions.util';

// function* fetchUpcomingAppointment(
//   action: ActionType<typeof upcomingAppointmentRequested>,
// ) {
//   try {
//     // yield put(upcomingAppointmentSuccess(appointments[5]));
//   } catch (error) {
//     yield put(upcomingAppointmentFailure(error));
//   }
// }

function* fetchAppointmentList(
  action: ActionType<typeof appointmentListRequested>,
): Generator<any, void, any> {
  try {
    const payload = action.payload;
    const res = yield call(getAppointmentList,payload);
    yield put(appointmentListSuccess(res.data.data));
  } catch (error:any) {
    yield put(appointmentListFailure(error.message));
  }
}

function* fetchAppointmentDetails(
  action: ActionType<typeof getAppointmentDetailsRequested>,
): Generator<any, void, any>  {
  try {

    const payload ={
      appointmentId:action.payload
    }
    // const res: any = yield call(addAppointment, payload);
    const res:any = yield call(getAppointmentDetails,payload);
    yield put(getAppointmentDetailsSuccess(res.data.data));
  } catch (error) {
    yield put(getAppointmentDetailsFailure(error));
  }
}


function* updateSelectedAppointment(
  action: ActionType<typeof updateAppointmentRequested>,
) {
  try {
    const params = action.payload;
    const res: AxiosResponse = yield call(updateAppointment, params);
    yield put(updateAppointmentSuccess(params));

    return 
  } catch (err) {
    err = serializeError(err);
    updateAppointmentFailed(err);
  }
}

// export function* watchFetchUpcomingAppointment() {
//   yield takeEvery(upcomingAppointmentRequested.type, fetchUpcomingAppointment);
// }

export function* watchFetchAppointmentList() {
  yield takeEvery(appointmentListRequested.type, fetchAppointmentList);
}

export function* watchFetchAppointmentDetails() {
  yield takeEvery(getAppointmentDetailsRequested.type, fetchAppointmentDetails);
}

export function* watchUpdateAppointment() {
  yield takeEvery(updateAppointmentRequested.type, updateSelectedAppointment);
}
