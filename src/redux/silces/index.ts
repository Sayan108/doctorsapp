import {authReducer} from './auth.silce';
import {IApplicationStates, IAuthState, UserData} from '../redux.constants';
import {combineReducers} from '@reduxjs/toolkit';
import {applicationReducer} from './application.slice';
import {userDataReducer} from './userdata.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  application: applicationReducer,
  userdata: userDataReducer,
});
