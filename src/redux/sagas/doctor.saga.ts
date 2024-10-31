import {put, takeEvery} from 'redux-saga/effects';
import {action, ActionType} from 'typesafe-actions';
import * as Effects from 'redux-saga/effects';
import {doctorDetails} from '../../services/doctor/doctor.service';
import {
  doctorDetailsFailed,
  doctorDetailsRequested,
  doctorDetailsSuccess,
} from '../silces/doctor.slice';

const call: any = Effects.call;

function* fetchDoctorDetails(
  action: ActionType<typeof doctorDetailsRequested>,
): Generator<any, void, any> {
  try {
    const res = yield call(doctorDetails, action.payload);
    // //'doctordetails1234',res.data);
    yield put(doctorDetailsSuccess(res.data));
  } catch (err) {
    yield put(doctorDetailsFailed(err));
  }
}

export function* watchDoctorDetailsRequested() {
  yield takeEvery(doctorDetailsRequested.type, fetchDoctorDetails);
}
