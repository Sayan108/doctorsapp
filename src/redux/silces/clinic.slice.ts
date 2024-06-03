import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAvailableDayAndHour,
  IClinic,
  IClinicDetails,
  IClinicInitialState,
  IClinicList,
  IHourAndSlot,
} from "../constants/clinic.constant";
import { IAuthState } from "../constants/userdata.constants";

export const clinicSlice = createSlice({
  name: "clinic",
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
          clinicId: action.payload.clinicId,
          clinicName: action.payload.clinicName,
          address: action.payload.address,
        },
        isLoading: false,
      };
    },

    clinicDetailsFailed: (state: IClinic, action: PayloadAction<any>) => {
      return {
        ...state,
        clinicDetails: null,
        isLoading: true,
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
      action: PayloadAction<IAvailableDayAndHour[]>
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
      action: PayloadAction<any[]>
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
  setAvailableTimeSlotsBasedDate: setAvailableTimeSlotsBasedDate,
} = clinicSlice.actions;

export const clinicReducer = clinicSlice.reducer;
