import {  put, takeEvery } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import {
  availableSlotsFailed,
  availableSlotsRequested,
  availableSlotsSuccess,
  clinicDetailsFailed,
  clinicDetailsRequested,
} from "../silces/clinic.slice";
import { baseClient } from "../../services/api.cilents";
import { Endpoints } from "../../services/constants";
import { availableSlots } from "../../services/clinic/clinic.service";
import * as Effects from "redux-saga/effects";
import { AxiosResponse } from "axios";

const call: any = Effects.call;

function* fetchClinicDetails(
  action: ActionType<typeof clinicDetailsRequested>
) {
  try {
    yield put(clinicDetailsRequested(action.payload));

  } catch (error) {
    yield put(clinicDetailsFailed(error));
  }
}

function* fetchClinicAvailableSlots(
  action: ActionType<typeof availableSlotsRequested>
):Generator<any, void, any> {
  try {

    const params = {
      clinicId: action.payload
    }
    const res:any=  yield call(availableSlots,params);
    yield put(availableSlotsSuccess(res.data));

  } catch (error) {
    yield put(availableSlotsFailed(error));
  }
}

function* addAvailableSlotsInSaga(action: ActionType<typeof availableSlotsRequested>){
    
}

export function* watchFetchClinicDetails() {
  yield takeEvery(clinicDetailsRequested.type, fetchClinicDetails);
}

export function* watchFetchAvailableSlots() {
    yield takeEvery(availableSlotsRequested.type, fetchClinicAvailableSlots);
  }