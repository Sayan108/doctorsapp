import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IPatientInitialState,
  IPatient,
  IPatientListInitialState,
  IPatientList,
} from "../constants/patient.constant";
import { IAuthState } from "../constants/userdata.constants";

export const patientSlice = createSlice({
  name: "patientList",
  initialState: IPatientListInitialState,

  reducers: {
    createPatientRequested: (
      state: IPatientList,
      action: PayloadAction<any>
    ) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    createPatientSuccess: (state: IPatientList, action: PayloadAction<any>) => {
      const newPatient: IPatient = {
        patientId: action.payload.patientId,
        fullname: action.payload.fullname,
        age: action.payload.age,
        gender: action.payload.gender,
        phoneNumber: action.payload.phoneNumber,
        createdBy: action.payload.createdBy,
        email: action.payload.email,
        isDeleted: false,
      };

      return {
        ...state,
        patientList: [newPatient, ...state.patientList],
        isLoading: false,
      };
    },

    createPatientFailed: (state: IPatientList, action: PayloadAction<any>) => {
      return {
        isLoading: false,
        patientList: [],
        errormessage: action.payload,
      };
    },

    patientListRequested: (
      state: IPatientList,
     
    ) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    patientListSuccess: (state: IPatientList, action: PayloadAction<any[]>) => {
      return {
        ...state,
        patientList: action.payload,
        isLoading: false,
      };
    },

    patientListFailed: (state: IPatientList, action: PayloadAction<any>) => {
      return {
        isLoading: false,
        patientList: [],
        errormessage: action.payload,
      };
    },
  },
});

export const {
  createPatientRequested,
  createPatientSuccess,
  createPatientFailed,
  patientListRequested,
  patientListSuccess,
  patientListFailed
} = patientSlice.actions;

export const patientListReducer = patientSlice.reducer;
