import {authReducer} from './auth.silce';
import {combineReducers} from '@reduxjs/toolkit';
import {userDataReducer} from './userdata.slice';
import {clinicReducer} from './clinic.slice';
import {appointmentReducer} from './appointment.slice';
import {doctorReducer} from './doctor.slice';
import {patientListReducer, patientSlice} from './patient.slice';
import {applicationReducer} from './application.slice';

export const rootReducer = combineReducers({
  auth: authReducer,

  userdata: userDataReducer,
  clinicData: clinicReducer,
  newAppointmentData: appointmentReducer,
  doctorsData: doctorReducer,
  patientList: patientListReducer,
  application: applicationReducer,
});
