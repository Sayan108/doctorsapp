import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  IAppointment,
  IAppointmentInitialState,
  IDateSlots,
  IDateSlotsInitialStates,
  ITimeslots,
  UserData,
  UserDataInitialState,
} from '../redux.constants';
// Redux Toolkit slice
export const userDataSlice = createSlice({
  name: 'userdata',
  initialState: UserDataInitialState,

  reducers: {
    upcomingAppointmentRequested: (state: UserData) => {
      return {
        ...state,
        upcomingAppointment: {
          ...state.upcomingAppointment,
          loading: true,
        },
      };
    },
    upcomingAppointmentSucess: (
      state: UserData,
      action: PayloadAction<IAppointment>,
    ) => {
      return {
        ...state,
        upcomingAppointment: {
          data: {...action.payload},
          loading: false,
          error: {},
        },
      };
    },

    upcomingAppointmentFailure: (
      state: UserData,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        upcomingAppointment: {
          data: IAppointmentInitialState,
          error: action.payload,
          loading: false,
        },
      };
    },

    appointmentListRequested: (state: UserData) => {
      return {
        ...state,
        appointmentList: {
          ...state.appointmentList,
          loading: true,
        },
      };
    },
    appointmentListSucess: (
      state: UserData,
      action: PayloadAction<IAppointment[]>,
    ) => {
      return {
        ...state,
        appointmentList: {
          ...state.appointmentList,
          data: action.payload,
          loading: false,
        },
      };
    },

    appointmentListFailure: (state: UserData, action: PayloadAction<any>) => {
      return {
        ...state,
        appointmentList: {
          data: [],
          error: action.payload,
          loading: false,
        },
      };
    },

    dateSlotRequested: (state: UserData) => {
      return {
        ...state,
        dateSlots: {
          ...state.dateSlots,
          loading: true,
        },
      };
    },
    dateSlotSucess: (state: UserData, action: PayloadAction<IDateSlots[]>) => {
      return {
        ...state,
        dateSlots: {
          data: action.payload,
          loading: false,
          error: {},
        },
      };
    },

    dateSlotFailure: (state: UserData, action: PayloadAction<any>) => {
      return {
        ...state,
        dateSlots: {
          data: [],
          error: action.payload,
          loading: false,
        },
      };
    },

    timeSlotRequested: (state: UserData) => {
      return {
        ...state,
        timeSlots: {
          ...state.timeSlots,
          loading: true,
        },
      };
    },
    timeSlotSucess: (state: UserData, action: PayloadAction<ITimeslots[]>) => {
      return {
        ...state,
        timeSlots: {
          data: action.payload,
          loading: false,
          error: {},
        },
      };
    },

    timeSlotFailure: (state: UserData, action: PayloadAction<any>) => {
      return {
        ...state,
        timeSlots: {
          data: [],
          error: action.payload,
          loading: false,
        },
      };
    },

    getAppointmentDetailsRequested: (
      state: UserData,
      action: PayloadAction<number>,
    ) => {
      return {
        ...state,
        currentAppointmentDetails: {
          ...state.currentAppointmentDetails,
          loading: true,
        },
      };
    },

    getAppointmentDetailsSuccess: (
      state: UserData,
      action: PayloadAction<IAppointment>,
    ) => {
      return {
        ...state,
        currentAppointmentDetails: {
          ...state.currentAppointmentDetails,
          loading: false,
          data: action.payload,
        },
      };
    },

    getAppointmentDetailsFailure: (
      state: UserData,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        currentAppointmentDetails: {
          ...state.currentAppointmentDetails,
          loading: false,
          error: action.payload,
        },
      };
    },

    //   createAppointment:()

    clearUserData: (state: UserData) => {
      return {
        ...UserDataInitialState,
      };
    },

    updateAppointmentForm: (state: UserData, action: PayloadAction<any>) => {
      return {
        ...state,
        appointmentForm: {...action.payload, ...state.appointmentForm},
      };
    },
    addAppointmentInListRequested: (state: UserData) => {
      return {
        ...state,
        appointmentForm: {...state.appointmentForm, loading: true},
      };
    },
    addAppointmentInListSuccess: (
      state: UserData,
      action: PayloadAction<IAppointment>,
    ) => {
      return {
        ...state,
        appointmentList: {
          ...state.appointmentList,
          data: [action.payload, ...state.appointmentList.data],
        },
      };
    },
  },
});
export const {
  upcomingAppointmentFailure,
  upcomingAppointmentRequested,
  upcomingAppointmentSucess,
  appointmentListFailure,
  appointmentListRequested,
  appointmentListSucess,
  timeSlotFailure,
  timeSlotRequested,
  timeSlotSucess,
  dateSlotFailure,
  dateSlotRequested,
  dateSlotSucess,
  clearUserData,
  getAppointmentDetailsSuccess,
  getAppointmentDetailsRequested,
  getAppointmentDetailsFailure,
  addAppointmentInListSuccess,
  addAppointmentInListRequested,
  updateAppointmentForm,
} = userDataSlice.actions;

export const userDataReducer = userDataSlice.reducer;
