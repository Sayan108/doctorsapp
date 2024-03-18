import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  IAppoinment,
  IAppoinmentInitialState,
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
    upcomingAppoinmentRequested: (state: UserData) => {
      return {
        ...state,
        upcomingAppoinment: {
          ...state.upcomingAppoinment,
          loading: true,
        },
      };
    },
    upcomingAppoinmentSucess: (
      state: UserData,
      action: PayloadAction<IAppoinment>,
    ) => {
      return {
        ...state,
        upcomingAppoinment: {
          data: {...action.payload},
          loading: false,
          error: {},
        },
      };
    },

    upcomingAppoinmentFailure: (
      state: UserData,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        upcomingAppoinment: {
          data: IAppoinmentInitialState,
          error: action.payload,
          loading: false,
        },
      };
    },

    appoinmentListRequested: (state: UserData) => {
      return {
        ...state,
        appoinmentList: {
          ...state.appoinmentList,
          loading: true,
        },
      };
    },
    appoinmentListSucess: (
      state: UserData,
      action: PayloadAction<IAppoinment[]>,
    ) => {
      return {
        ...state,
        appoinmentList: {
          ...state.appoinmentList,
          data: action.payload,
          loading: false,
        },
      };
    },

    appoinmentListFailure: (state: UserData, action: PayloadAction<any>) => {
      return {
        ...state,
        appoinmentList: {
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

    getAppoinmentDetailsRequested: (
      state: UserData,
      action: PayloadAction<number>,
    ) => {
      return {
        ...state,
        currentAppoinmentDetails: {
          ...state.currentAppoinmentDetails,
          loading: true,
        },
      };
    },

    getAppoinmentDetailsSuccess: (
      state: UserData,
      action: PayloadAction<IAppoinment>,
    ) => {
      return {
        ...state,
        currentAppoinmentDetails: {
          ...state.currentAppoinmentDetails,
          loading: false,
          data: action.payload,
        },
      };
    },

    getAppoinmentDetailsFailure: (
      state: UserData,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        currentAppoinmentDetails: {
          ...state.currentAppoinmentDetails,
          loading: false,
          error: action.payload,
        },
      };
    },

    //   createAppoinment:()

    clearUserData: (state: UserData) => {
      return {
        ...UserDataInitialState,
      };
    },

    updateAppoinmentForm: (state: UserData, action: PayloadAction<any>) => {
      return {
        ...state,
        appoinmentForm: {...action.payload, ...state.appoinmentForm},
      };
    },
    addAppoinmentInListRequested: (state: UserData) => {
      return {
        ...state,
        appoinmentForm: {...state.appoinmentForm, loading: true},
      };
    },
    addAppoinmentInListSuccess: (
      state: UserData,
      action: PayloadAction<IAppoinment>,
    ) => {
      return {
        ...state,
        appoinmentList: {
          ...state.appoinmentList,
          data: [action.payload, ...state.appoinmentList.data],
        },
      };
    },
  },
});
export const {
  upcomingAppoinmentFailure,
  upcomingAppoinmentRequested,
  upcomingAppoinmentSucess,
  appoinmentListFailure,
  appoinmentListRequested,
  appoinmentListSucess,
  timeSlotFailure,
  timeSlotRequested,
  timeSlotSucess,
  dateSlotFailure,
  dateSlotRequested,
  dateSlotSucess,
  clearUserData,
  getAppoinmentDetailsSuccess,
  getAppoinmentDetailsRequested,
  getAppoinmentDetailsFailure,
  addAppoinmentInListSuccess,
  addAppoinmentInListRequested,
  updateAppoinmentForm,
} = userDataSlice.actions;

export const userDataReducer = userDataSlice.reducer;
