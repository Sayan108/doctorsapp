import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  IDateSlots,
  IDateSlotsInitialStates,
  ITimeslots,
  UserData,
  UserDataInitialState,
} from '../constants/userdata.constants';
import {
  IAppointment,
  IAppointmentInitialState,
  IUpdateAppointment,
} from '../constants/appointment.constant';
import {IPatientInitialState} from '../constants/patient.constant';
// Redux Toolkit slice
export const userDataSlice = createSlice({
  name: 'userdata',
  initialState: UserDataInitialState,

  reducers: {
    // upcomingAppointmentRequested: (state: UserData) => {
    //   return {
    //     ...state,
    //     upcomingAppointment: {
    //       ...state.upcomingAppointment,
    //       loading: true,
    //     },
    //   };
    // },
    // upcomingAppointmentSuccess: (
    //   state: UserData,
    //   action: PayloadAction<IAppointment>
    // ) => {
    //   return {
    //     ...state,
    //     upcomingAppointment: {
    //       data: { ...action.payload },
    //       loading: false,
    //       error: {},
    //     },
    //   };
    // },

    // upcomingAppointmentFailure: (
    //   state: UserData,
    //   action: PayloadAction<any>
    // ) => {
    //   return {
    //     ...state,
    //     upcomingAppointment: {
    //       data: IAppointmentInitialState,
    //       error: action.payload,
    //       loading: false,
    //     },
    //   };
    // },

    updateUpcomingAppointment: (
      state: UserData,
      action: PayloadAction<IAppointment | null>,
    ) => {
      return {
        ...state,
        upcomingAppointment: action.payload,
      };
    },

    appointmentListRequested: (state: UserData, action: PayloadAction<any>) => {
      return {
        ...state,
        upcomingAppointment: null,
        appointmentList: {
          ...state.appointmentList,
          loading: true,
        },
      };
    },
    appointmentListSuccess: (
      state: UserData,
      action: PayloadAction<IAppointment[]>,
    ) => {
      return {
        ...state,
        upcomingAppointment: action.payload[0],
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

    getAppointmentDetailsRequested: (
      state: UserData,
      action: PayloadAction<string>,
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

    /**
     * @pupose :- it will update the appointmentForm details of upcomingappointment object of userdata in redux;
     * @param state : this tpye of data is present in redux which need to updated
     * @param action : payloadaction has the new datas for updating userdata
     */
    updateAppointmentForm: (state: UserData, action: PayloadAction<any>) => {
      // console.log('action.payload123',action.payload)
      return {
        ...state,

        appointmentForm: {...state.appointmentForm, ...action.payload},
      };
    },
    // addAppointmentInListRequested: (state: UserData, action: PayloadAction<any>) => {
    //   return {
    //     ...state,
    //     appointmentForm: { ...state.appointmentForm, loading: true },
    //   };
    // },
    updateAppointmentList: (
      state: UserData,
      action: PayloadAction<IAppointment>,
    ) => {
      // console.log('updateappointmentList', action.payload);
      return {
        ...state,
        appointmentList: {
          ...state.appointmentList,
          data: [action.payload, ...state.appointmentList.data],
        },
      };
    },

    //update appointment slices
    removeFromAppoinmentListRequested: (
      state: UserData,
      action: PayloadAction<string>,
    ) => {
      return {
        ...state,
        appointmentList: {
          ...state.appointmentList,
          loading: true,
        },
      };
    },
    removeFromAppoinmentListSuccess: (
      state: UserData,
      action: PayloadAction<string>,
    ) => {
      const filteredAppoinmentList = state.appointmentList.data.filter(
        (appointment: IAppointment) => {
          appointment.appointmentId !== action.payload;
        },
      );
      return {
        ...state,
        appointmentList: {
          ...state.appointmentList,
          data: filteredAppoinmentList,
          loading: false,
        },
      };
    },
    removeFromAppoinmentListFailed: (state: UserData) => {
      return {
        ...state,
        appointmentList: {
          ...state.appointmentList,
          loading: false,
        },
      };
    },

    dateTimeSlotRequested: (state: UserData, action: PayloadAction<string>) => {
      return {
        ...state,
        dateTimeSlotLoading: true,
      };
    },
    dateTimeSlotSuccess: (state: UserData, action: PayloadAction<any>) => {
      return {
        ...state,
        dateTimeSlotLoading: false,
        dateSlots: action.payload,
      };
    },
    dateTimeSlotFailure: (state: UserData) => {
      return {
        ...state,
        dateTimeSlotLoading: false,
      };
    },
    updateAppointmentRequested: (
      state: UserData,
      action: PayloadAction<IUpdateAppointment>,
    ) => {
      return {
        ...state,
        currentAppointmentDetails: {
          ...state.currentAppointmentDetails,
          loading: true,
        },
      };
    },

    updateAppointmentSuccess: (
      state: UserData,
      action: PayloadAction<IUpdateAppointment>,
    ) => {
      let appointmentDetails: IAppointment = {
        createdBy: '',
        checkupHour: '',
        checkupDay: '',
        bookingDate: '',
        bookingDayId: '',
        bookingHourId: '',
        isDeleted: false,
        appointmentId: null,
        createDate: '',
        isCompleted: false,
        doctorId: '',
        clinicData: null,
        patientData: IPatientInitialState,
        clinicId: '',
        status: 0,
        problem: null,
        ...state.currentAppointmentDetails.data,
      };
      return {
        ...state,
        currentAppointmentDetails: {
          error: '',
          loading: false,
          data: {...appointmentDetails, ...action.payload},
        },
      };
    },

    updateAppointmentFailed: (state: UserData, action: PayloadAction<any>) => {
      return {
        ...state,
        currentAppointmentDetails: {
          ...state.currentAppointmentDetails,
          loading: false,
          error: action.payload,
        },
      };
    },
  },
});

export const {
  // upcomingAppointmentFailure,
  // upcomingAppointmentRequested,
  // upcomingAppointmentSuccess,
  appointmentListFailure,
  appointmentListRequested,
  appointmentListSuccess,
  clearUserData,
  getAppointmentDetailsSuccess,
  getAppointmentDetailsRequested,
  getAppointmentDetailsFailure,
  updateAppointmentList,
  updateAppointmentForm,
  updateUpcomingAppointment,
  updateAppointmentRequested,
  updateAppointmentSuccess,
  updateAppointmentFailed,
  removeFromAppoinmentListFailed,
  removeFromAppoinmentListRequested,
  removeFromAppoinmentListSuccess,
  dateTimeSlotRequested,
  dateTimeSlotSuccess,
  dateTimeSlotFailure,
} = userDataSlice.actions;

export const userDataReducer = userDataSlice.reducer;
