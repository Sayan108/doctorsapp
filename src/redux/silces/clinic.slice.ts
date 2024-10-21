import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IAvailableDayAndHour,
  IClinic,
  IClinicInitialState,
} from '../constants/clinic.constant';

export const clinicSlice = createSlice({
  name: 'clinic',
  initialState: IClinicInitialState,

  reducers: {
    clinicDetailsRequested: (state: IClinic) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    clinicDetailsSuccess: (state: IClinic, action: PayloadAction<any>) => {
      return {
        ...state,
        clinicDetails: {
          ...state.clinicDetails,
          ...action.payload,
        },
      };
    },

    clinicDetailsFailed: (state: IClinic, action: PayloadAction<any>) => {
      return {
        ...state,
        clinicDetails: {
          ...state.clinicDetails,
          ...action.payload,
        },
      };
    },

    clinicListRequested: (state: IClinic, action: PayloadAction<any>) => {
      return {
        ...state,
        ClinicList: {
          ...state.ClinicList,
          isLoading: true,
        },
      };
    },

    clinicListSuccess: (state: IClinic, action: PayloadAction<any>) => {
      return {
        ...state,
        ClinicList: {
          data: [...action.payload],
          isLoading: false,
          error:null,
        },
      };
    },

    clinicListFailed: (state: IClinic, action: PayloadAction<any>) => {
      return {
        ...state,
        ClinicList: {
          error: action.payload[0],
          isLoading: false,
          data:null,
        },
      };
    },

    availableSlotsRequested: (state: IClinic, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    availableSlotsSuccess: (
      state: IClinic,
      action: PayloadAction<IAvailableDayAndHour[]>,
    ) => {
      return {
        ...state,
        availableDayAndHour: action.payload,
        isLoading: false,
      };
    },

    availableSlotsFailed: (state: IClinic, action: PayloadAction<any>) => {
      return {
        ...state,
        availableDayAndHour: action.payload.data,
        isLoading: false,
      };
    },

    setAvailableTimeSlotsBasedDate: (
      state: IClinic,
      action: PayloadAction<any[]>,
    ) => {
      return {
        ...state,
        selectedTimeSlots: action.payload,
      };
    },
  },
});

export const {
  clinicDetailsRequested,
  clinicDetailsSuccess,
  clinicDetailsFailed,
  availableSlotsRequested,
  availableSlotsSuccess,
  availableSlotsFailed,
  clinicListRequested,
  clinicListSuccess,
  clinicListFailed,
  setAvailableTimeSlotsBasedDate: setAvailableTimeSlotsBasedDate,
} = clinicSlice.actions;

export const clinicReducer = clinicSlice.reducer;
