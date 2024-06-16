import {put, takeEvery} from 'redux-saga/effects';
import {action, ActionType} from 'typesafe-actions';
import * as Effects from 'redux-saga/effects';
import {
  createPatientFailed,
  createPatientRequested,
  createPatientSuccess,
  patientListFailed,
  patientListRequested,
  patientListSuccess,
} from '../silces/patient.slice';
import {
  addPatient,
  getPatientList,
} from '../../services/patient/patient.services';

const call: any = Effects.call;

function* createPatient(
  action: ActionType<typeof createPatientRequested>,
): Generator<any, void, any> {
  try {
    const res = yield call(addPatient, action.payload);
    yield put(createPatientSuccess(res.data.data));
  } catch (err) {
    yield put(createPatientFailed(err));
  }
}

function* patientList(
  action: ActionType<typeof createPatientRequested>,
): Generator<any, void, any> {
  try {
    const res = yield call(getPatientList);
    // console.log('patientlist response from saga',res);

    yield put(patientListSuccess(res.data.data));
    // action.payload.navigator('/selectdate')
  } catch (err) {
    yield put(patientListFailed(err));
  }
}

export function* watchCreatePatientRequested() {
  yield takeEvery(createPatientRequested.type, createPatient);
}

export function* watchPatientListRequested() {
  yield takeEvery(patientListRequested.type, patientList);
}
