import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IAppointmentInitialState,
  IAppointment,
  IUpdateAppointment,
} from '../constants/appointment.constant';
import {
  IAuthState,
  UserData,
  UserDataInitialState,
} from '../constants/userdata.constants';
import {IPatient} from '../constants/patient.constant';
import {IClinic} from '../constants/clinic.constant';

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: IAppointmentInitialState,

  reducers: {
    createAppointmentRequested: (state: IAppointment) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    createAppointmentSuccess: (
      state: IAppointment,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        createdBy: action.payload.createdBy,
        bookingDate: action.payload.bookingDate,
        bookingDayId: action.payload.bookingDay,
        bookingHourId: action.payload.bookingHour,
        isDeleted: false,
        appointmentId: action.payload.appointmentId,
        createDate: action.payload.createDate,
        modifyDate: action.payload.modifyDate,
        isCompleted: false,
        isLoading: false,
      };
    },

    createAppointmentFailed: (
      state: IAppointment,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        isLoading: false,
        appointmentId: null,
        errormessage: action.payload,
      };
    },

    updateDoctorId: (state: IAppointment, action: PayloadAction<any>) => {
      return {
        ...state,
        doctorId: action.payload.doctorId,
      };
    },

    updateSelectedPatient: (
      state: IAppointment,
      action: PayloadAction<IPatient>,
    ) => {
      return {
        ...state,
        patientData: action.payload,
      };
    },

    upDateClinic: (state: IAppointment, action: PayloadAction<string>) => {
      // //"fdsjkhfkj", action.payload);
      return {
        ...state,
        clinicId: action.payload,
      };
    },

    updateSelectedDateTimeSlot: (
      state: IAppointment,
      action: PayloadAction<any>,
    ) => {
      // //"fdsjkhfkj", action.payload);
      return {
        ...state,
        bookingDate: action.payload.bookingDate,
        bookingDayId: action.payload.bookingDayId,
        bookingHourId: action.payload.bookingHourId,
        bookingTime: action.payload.bookingTime,
      };
    },

    updateSelectedPatientData: (
      state: IAppointment,
      action: PayloadAction<any>,
    ) => {
      // //"fdsjkhfkj", action.payload);
      return {
        ...state,
        patientData: {...state.patientData, ...action.payload},
      };
    },
  },
});

export const {
  createAppointmentRequested,
  createAppointmentSuccess,
  createAppointmentFailed,
  updateDoctorId,
  updateSelectedPatient,
  upDateClinic,
  updateSelectedDateTimeSlot,
  updateSelectedPatientData,
} = appointmentSlice.actions;

export const appointmentReducer = appointmentSlice.reducer;
