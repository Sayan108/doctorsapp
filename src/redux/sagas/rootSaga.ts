import { all } from "redux-saga/effects";
import {
  watchFetchAppointmentDetails,
  watchFetchAppointmentList,
  // watchFetchDateSlots,
  // watchFetchTimeSlotsBasedOnDate,
  watchFetchUpcomingAppointment,
} from "./userData.saga";
import { watchFetchAvailableSlots, watchFetchClinicDetails, watchFetchClinicList } from "./clinic.saga";
import { watchCreateAppointmentRequested } from "./appointment.saga";
import { watchDoctorDetailsRequested } from "./doctor.saga";
import { watchCreatePatientRequested, watchPatientListRequested } from "./patient.saga";
export default function* rootSaga() {
  yield all([
    watchFetchAppointmentList(),
    // watchFetchDateSlots(),
    // watchFetchTimeSlotsBasedOnDate(),
    watchFetchUpcomingAppointment(),
    watchFetchAppointmentDetails(),
    // watchAddAppointmentinList(),
    watchFetchClinicDetails(),
    watchFetchAvailableSlots(),
    watchCreateAppointmentRequested(),
    watchDoctorDetailsRequested(),
    watchCreatePatientRequested(),
    watchPatientListRequested(),
    watchFetchClinicList()
  ]);
}
