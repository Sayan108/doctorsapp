import {put, takeEvery} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {
  availableSlotsFailed,
  availableSlotsRequested,
  availableSlotsSuccess,
  clinicDetailsFailed,
  clinicDetailsRequested,
  clinicListFailed,
  clinicListRequested,
  clinicListSuccess,
} from '../silces/clinic.slice';
import {
  availableSlots,
  getClinicList,
} from '../../services/clinic/clinic.service';
import * as Effects from 'redux-saga/effects';

const call: any = Effects.call;

function* fetchClinicDetails(
  action: ActionType<typeof clinicDetailsRequested>,
) {
  try {
    yield put(clinicDetailsRequested(action.payload));
  } catch (error) {
    yield put(clinicDetailsFailed(error));
  }
}

function* fetchClinicList(
  action: ActionType<typeof clinicListRequested>,
): Generator<any, void, any> {
  try {
    const params = action.payload;
    const res: any = yield call(getClinicList, params);
    // console.log('thi is res.data.data', res.data.data);
    yield put(clinicListSuccess(res.data.data));
  } catch (error) {
    yield put(clinicListFailed(error));
  }
}

function* fetchClinicAvailableSlots(
  action: ActionType<typeof availableSlotsRequested>,
): Generator<any, void, any> {
  try {
    const params = {
      clinicId: action.payload,
    };

    const res: any = yield call(availableSlots, params);

    yield put(availableSlotsSuccess(res.data));
  } catch (error) {
    yield put(availableSlotsFailed(error));
  }
}

function* addAvailableSlotsInSaga(
  action: ActionType<typeof availableSlotsRequested>,
) {}

export function* watchFetchClinicDetails() {
  yield takeEvery(clinicDetailsRequested.type, fetchClinicDetails);
}

export function* watchFetchClinicList() {
  yield takeEvery(clinicListRequested.type, fetchClinicList);
}

export function* watchFetchAvailableSlots() {
  yield takeEvery(availableSlotsRequested.type, fetchClinicAvailableSlots);
}
