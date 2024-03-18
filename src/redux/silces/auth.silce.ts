import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IAuthState, IAuthStateInitialState} from '../redux.constants';

export const authSlice = createSlice({
  name: 'auth',
  initialState: IAuthStateInitialState,

  reducers: {
    otpRequested: (state: IAuthState) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    otpSuccess: (state: IAuthState, action: PayloadAction<any>) => {
      return {
        ...state,
        userDetails: {
          userName: '',
          fullname: '',
          email: '',
          phoneNumber: action.payload.data.phonenumber,
        },
        isLoading: false,
      };
    },
    otpFailed: (state: IAuthState, action: PayloadAction<any>) => {
      return {
        isAuthenticated: false,
        isLoading: false,
        userDetails: null,
        errormessege: action.payload,
      };
    },
    authRequested: (state: IAuthState) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    authSuccess: (state: IAuthState, action: PayloadAction<any>) => {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    },
    authFailed: (state: IAuthState, action: PayloadAction<any>) => {
      return {
        isAuthenticated: false,
        isLoading: false,
        userDetails: null,
        errormessege: action.payload,
      };
    },

    logOut: (state: IAuthState) => {
      return {
        ...state,
        isAuthenticated: false,
        userDetails: null,
      };
    },
  },
});
export const {
  authRequested,
  authSuccess,
  authFailed,
  otpRequested,
  otpSuccess,
  otpFailed,
  logOut,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
