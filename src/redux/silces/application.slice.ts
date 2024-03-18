import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  IApplicationStates,
  IApplicationStatesInitialStates,
} from '../redux.constants';

// Redux Toolkit slice
export const applicationSlice = createSlice({
  name: 'application',
  initialState: IApplicationStatesInitialStates,

  reducers: {
    changehomeScreenTab: (
      state: IApplicationStates,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        homeScreenTab: action.payload,
      };
    },
  },
});
export const {changehomeScreenTab} = applicationSlice.actions;

export const applicationReducer = applicationSlice.reducer;
