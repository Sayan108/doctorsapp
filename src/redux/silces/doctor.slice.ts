import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IDoctorInitialState, IDoctor } from "../constants/doctor.constant";
import { IAuthState } from "../constants/userdata.constants";
import { IDoctorInitialState, IDoctor } from "../constants/doctor.constant";

export const doctorSlice = createSlice({
  name: "doctor",
  initialState: IDoctorInitialState,

  reducers: {
    doctorDetailsRequested: (state: IDoctor, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    doctorDetailsSuccess: (state: IDoctor, action: PayloadAction<any>) => {
        
      const obj = {
        ...state,
        doctorId: action.payload.doctorId,
        fullname: action.payload.fullname,
        phoneNumber: action.payload.phoneNumber,
        email: action.payload.email,
        certifications: action.payload.certifications,
        education: action.payload.education,
        experience: action.payload.experience,
        languagesSpoken: action.payload.languagesSpoken,
        specialization: action.payload.specialization,
      };
      console.log('obj', obj)
      return obj;
    },

    doctorDetailsFailed: (state: IDoctor, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoading: false,
        doctorId: null,
        errormessage: action.payload,
      };
    },
  },
});

export const {
  doctorDetailsRequested,
  doctorDetailsSuccess,
  doctorDetailsFailed,
} = doctorSlice.actions;

export const doctorReducer = doctorSlice.reducer;
