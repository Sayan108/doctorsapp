import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  IAuthState,
  IAuthStateInitialState,
  IUserDetails,
} from '../constants/userdata.constants';

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
          userID: '',
          userName: '',
          fullname: '',
          email: '',
          phoneNo: action.payload.data.phonenumber,
          accessToken: null,
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
        accessToken: null,
      };
    },
    authRequested: (state: IAuthState) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    authSuccess: (state: IAuthState, action: PayloadAction<IUserDetails>) => {
      // console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        userDetails: {...action.payload},
      };
    },
    authFailed: (state: IAuthState, action: PayloadAction<any>) => {
      return {
        isAuthenticated: false,
        isLoading: false,
        userDetails: null,
        errormessege: action.payload,
        accessToken: null,
      };
    },

    logOut: (state: IAuthState) => {
      return {
        ...state,
        isAuthenticated: false,
        userDetails: null,
      };
    },

    updateUserRequested: (state: IAuthState) => {
      // console.log('updateUserRequested', state);
      return {
        ...state,
        isLoading: true,
      };
    },

    updateUserSuccess: (state: IAuthState, action: PayloadAction<any>) => {
      // console.log(action.payload, 'update user ');
      return {
        ...state,
        isLoading: false,
        userDetails: {...state.userDetails, ...action.payload},
      };
    },

    updateUserFailed: (state: IAuthState, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
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
  updateUserRequested,
  updateUserSuccess,
  updateUserFailed,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
