import {IAppointment} from './appointment.constant';

export interface IAuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  userDetails: IUserDetails | null;
}

export interface IUserDetails {
  userID: string;
  userName: string;
  fullname: string;
  email?: string;
  phoneNo?: string;
  accessToken: string | null;
}

export const IUserDetailsInitialState: IUserDetails = {
  userID: '',
  userName: '',
  fullname: '',
  email: '',
  phoneNo: '',
  accessToken: null,
};

export const IAuthStateInitialState: IAuthState = {
  isLoading: false,
  isAuthenticated: false,
  userDetails: IUserDetailsInitialState,
};

export interface IApplicationStates {
  homeScreenTab: number;
}

export const IApplicationStatesInitialStates: IApplicationStates = {
  homeScreenTab: 0,
};

const IPaymentDetailsInitialState: IPaymentDetails = {
  paymentId: '',
  ammount: '',
  paymentType: 'cash',
};
export interface IPaymentDetails {
  paymentId: string;
  ammount: string;
  paymentType: 'creditcard' | 'debitcard' | 'cash' | 'upi';
}

export interface IDateSlots {
  id: string;
  value: string;
}

export const IDateSlotsInitialStates: IDateSlots = {
  id: '',
  value: '',
};

export interface ITimeslots {
  id: string;
  value: string;
}

export interface IAppointmentForm {
  patientPhone?: string;
  loading: boolean;
  patientName?: string;
  clinicAddress?: string;
  appointmentTime?: string;
  appointmentDate?: string;

  gender?: string;
  age?: string | number;
  problem?: string;
}

export interface Clinic {}

export interface UserData {
  dashboardData: {
    upcomingAppoinment: IAppointment | null;
    dashboardData: any;
    loading: boolean;
    error: any;
  };

  appointmentList: {data: IAppointment[]; loading: boolean; error: any};

  currentAppointmentDetails: {
    data: IAppointment | null;
    loading: boolean;
    error: any;
  };

  appointmentForm?: IAppointmentForm;
  dateSlots: any[];
  timeSlots: any[];
  dateTimeSlotLoading: boolean;
}

export const UserDataInitialState: UserData = {
  dashboardData: {
    upcomingAppoinment: null,
    dashboardData: null,
    loading: false,
    error: null,
  },
  appointmentList: {data: [], loading: false, error: null},

  currentAppointmentDetails: {data: null, loading: false, error: null},
  appointmentForm: {loading: false},
  dateSlots: [],
  timeSlots: [],
  dateTimeSlotLoading: false,
};
