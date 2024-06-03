import { put, takeEvery } from "redux-saga/effects";
import { action, ActionType } from "typesafe-actions";
import {
  availableSlotsFailed,
  availableSlotsRequested,
  availableSlotsSuccess,
  clinicDetailsFailed,
  clinicDetailsRequested,
} from "../silces/clinic.slice";
import { availableSlots } from "../../services/clinic/clinic.service";
import * as Effects from "redux-saga/effects";
import {
  createAppointmentFailed,
  createAppointmentRequested,
  createAppointmentSuccess,
} from "../silces/appointment.slice";
import { addAppointment } from "../../services/appointments/appoinment.services";
import { createPatientRequested } from "../silces/patient.slice";
import { store } from "..";
import { updateAppointmentList } from "../silces/userdata.slice";

const call: any = Effects.call;

function* createAppointment(
  action: ActionType<typeof createAppointmentRequested>
): Generator<any, void, any> {
  try {
    const { newAppointmentData } = store.getState();

    const payload = {
      doctorId: "0f7b8341-6bd6-4af8-b427-6f6e66ffd354",
      patientId: newAppointmentData.patientData.patientId,
      clinicId: newAppointmentData.clinicId,
      bookingDayId: newAppointmentData.bookingDayId,
      bookingHourId: newAppointmentData.bookingHourId,
      isDeleted: false,
    };

    const res: any = yield call(addAppointment, payload);
    yield put(createAppointmentSuccess(res.data));

    //now updating the appointment list
    yield put(updateAppointmentList(res.data.data));
  } catch (error) {
    yield put(createAppointmentFailed(error));
  }
}

function* createPatient(
  action: ActionType<typeof createPatientRequested>
): Generator<any, void, any> {}

function* fetchClinicAvailableSlots(
  action: ActionType<typeof availableSlotsRequested>
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
  action: ActionType<typeof availableSlotsRequested>
) {}

export function* watchCreateAppointmentRequested() {
  yield takeEvery(createAppointmentRequested.type, createAppointment);
}

export function* watchFetchAvailableSlots() {
  yield takeEvery(availableSlotsRequested.type, fetchClinicAvailableSlots);
}
