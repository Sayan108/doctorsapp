export interface IAuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  userDetails: IUserDetails | null;
}

export interface IUserDetails {
  userName: string;
  fullname: string;
  email?: string;
  phoneNumber?: string;
}

export const IUserDetailsInitialState: IUserDetails = {
  userName: '',
  fullname: '',
  email: '',
  phoneNumber: '',
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

export interface IAppointment {
  doctorName: string;
  clinicPhone: string;
  appointmentId: string;
  patientName: string;
  clinicAddress: string;
  appointmentTime: string;
  appointmentDate: string;
  paymentDetails?: IPaymentDetails | null;
  gender?: string;
  age?: string | number;
  problem?: string;
}

export const IAppointmentInitialState: IAppointment = {
  doctorName: '',
  appointmentId: '',
  patientName: '',
  clinicAddress: '',
  appointmentDate: '',
  appointmentTime: '',
  gender: '',
  age: '',
  problem: '',
  clinicPhone: '',
  paymentDetails: null,
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
  paymentDetails?: IPaymentDetails;
  gender?: string;
  age?: string | number;
  problem?: string;
}

export interface Clinic {}

export interface UserData {
  upcomingAppointment: {data: IAppointment | null; loading: boolean; error: any};
  appointmentList: {data: IAppointment[]; loading: boolean; error: any};
  dateSlots: {data: IDateSlots[]; loading: boolean; error: any};
  timeSlots: {data: ITimeslots[]; loading: boolean; error: any};
  currentAppointmentDetails: {
    data: IAppointment | null;
    loading: boolean;
    error: any;
  };

  appointmentForm?: IAppointmentForm;
}

export const UserDataInitialState: UserData = {
  upcomingAppointment: {
    data: null,
    loading: false,
    error: null,
  },
  appointmentList: {data: [], loading: false, error: null},
  dateSlots: {data: [], loading: false, error: null},
  timeSlots: {data: [], loading: false, error: null},
  currentAppointmentDetails: {data: null, loading: false, error: null},
};

export const appointments: IAppointment[] = [
  {
    appointmentId: '1',
    doctorName: 'Dr. Debabrata Bera',
    clinicPhone: '9876543210',
    patientName: 'John Doe',
    clinicAddress: '123 Clinic St, City, Country',
    appointmentTime: '10:00 AM',
    appointmentDate: '2024-02-25',
    paymentDetails: {
      paymentId: 'p1',
      ammount: '50',
      paymentType: 'creditcard',
    },
    gender: 'Male',
    age: 30,
    problem:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut quam vitae odio ullamcorper dapibus vel eget ligula. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim.',
  },
  {
    appointmentId: '2',
    patientName: 'Jane Smith',
    doctorName: 'Dr. Debabrata Bera',
    clinicPhone: '9876543210',
    clinicAddress: '456 Clinic Ave, City, Country',
    appointmentTime: '2:00 PM',
    appointmentDate: '2024-02-26',
    paymentDetails: {
      paymentId: 'p2',
      ammount: '75',
      paymentType: 'debitcard',
    },
    gender: 'Female',
    age: 25,
    problem:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut quam vitae odio ullamcorper dapibus vel eget ligula. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim.',
  },
  {
    appointmentId: '3',
    patientName: 'Michael Johnson',
    doctorName: 'Dr. Debabrata Bera',
    clinicPhone: '9876543210',
    clinicAddress: '789 Medical Center Rd, Town, Country',
    appointmentTime: '3:30 PM',
    appointmentDate: '2024-02-27',
    paymentDetails: {
      paymentId: 'p3',
      ammount: '100',
      paymentType: 'cash',
    },
    gender: 'Male',
    age: 45,
    problem:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut quam vitae odio ullamcorper dapibus vel eget ligula. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim.',
  },
  {
    appointmentId: '4',
    patientName: 'Emily Davis',
    doctorName: 'Dr. Debabrata Bera',
    clinicPhone: '9876543210',
    clinicAddress: '101 Hospital Ave, Village, Country',
    appointmentTime: '9:00 AM',
    appointmentDate: '2024-02-28',
    paymentDetails: {
      paymentId: 'p4',
      ammount: '60',
      paymentType: 'creditcard',
    },
    gender: 'Female',
    age: 35,
    problem:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut quam vitae odio ullamcorper dapibus vel eget ligula. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim.',
  },
  {
    appointmentId: '5',
    patientName: 'Christopher Martinez',
    doctorName: 'Dr. Debabrata Bera',
    clinicPhone: '9876543210',
    clinicAddress: '222 Health Center Blvd, City, Country',
    appointmentTime: '11:30 AM',
    appointmentDate: '2024-02-29',
    paymentDetails: {
      paymentId: 'p5',
      ammount: '90',
      paymentType: 'debitcard',
    },
    gender: 'Male',
    age: 28,
    problem:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut quam vitae odio ullamcorper dapibus vel eget ligula. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim.',
  },
  {
    appointmentId: '6',
    patientName: 'Emma Brown',
    doctorName: 'Dr. Debabrata Bera',
    clinicPhone: '9876543210',
    clinicAddress: '333 Wellness St, Town, Country',
    appointmentTime: '4:45 PM',
    appointmentDate: '2024-03-01',
    paymentDetails: {
      paymentId: 'p6',
      ammount: '80',
      paymentType: 'cash',
    },
    gender: 'Female',
    age: 40,
    problem:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut quam vitae odio ullamcorper dapibus vel eget ligula. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim.',
  },
  {
    appointmentId: '7',
    patientName: 'Daniel Wilson',
    doctorName: 'Dr. Debabrata Bera',
    clinicPhone: '9876543210',
    clinicAddress: '444 Medical Rd, City, Country',
    appointmentTime: '1:15 PM',
    appointmentDate: '2024-03-02',
    paymentDetails: {
      paymentId: 'p7',
      ammount: '70',
      paymentType: 'creditcard',
    },
    gender: 'Male',
    age: 32,
    problem:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut quam vitae odio ullamcorper dapibus vel eget ligula. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim.',
  },
  {
    appointmentId: '8',
    patientName: 'Olivia Taylor',
    doctorName: 'Dr. Debabrata Bera',
    clinicPhone: '9876543210',
    clinicAddress: '555 Hospital Ave, Town, Country',
    appointmentTime: '10:30 AM',
    appointmentDate: '2024-03-03',
    paymentDetails: {
      paymentId: 'p8',
      ammount: '55',
      paymentType: 'debitcard',
    },
    gender: 'Female',
    age: 27,
    problem:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut quam vitae odio ullamcorper dapibus vel eget ligula. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim.',
  },
  {
    appointmentId: '9',
    patientName: 'William Anderson',
    doctorName: 'Dr. Debabrata Bera',
    clinicPhone: '9876543210',
    clinicAddress: '666 Health Center Rd, City, Country',
    appointmentTime: '3:00 PM',
    appointmentDate: '2024-03-04',
    paymentDetails: {
      paymentId: 'p9',
      ammount: '120',
      paymentType: 'cash',
    },
    gender: 'Male',
    age: 50,
    problem:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut quam vitae odio ullamcorper dapibus vel eget ligula. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim.',
  },
  {
    appointmentId: '10',
    patientName: 'Sophia Thomas',
    doctorName: 'Dr. Debabrata Bera',
    clinicPhone: '9876543210',
    clinicAddress: '777 Wellness Blvd, Village, Country',
    appointmentTime: '11:00 AM',
    appointmentDate: '2024-03-05',
    paymentDetails: {
      paymentId: 'p10',
      ammount: '95',
      paymentType: 'creditcard',
    },
    gender: 'Female',
    age: 38,
    problem:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut quam vitae odio ullamcorper dapibus vel eget ligula. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim.',
  },
];

export const dateSlots: IDateSlots[] = [
  {id: 'f5e42d36-5602-4a7d-a632-35fc12760158', value: 'Jan 15'},
  {id: '7c8c3d5f-e6f5-4b30-ba3e-8311b617b3a2', value: 'Jan 16'},
  {id: '4a5cbf1c-8e6b-4d2c-afdb-bd74b1690804', value: 'Jan 17'},
  {id: '9debc465-8b39-434b-88d8-f1b14b4567a3', value: 'Jan 18'},
  {id: '75c3b7a1-f543-4b7b-b29e-50c1c79c0b1b', value: 'Jan 19'},
  {id: '368191b2-8633-48d4-8178-220f96f893bf', value: 'Jan 20'},
  {id: '0e3bdf5c-975b-4b5a-816b-7547a4d80190', value: 'Jan 21'},
  {id: '2318e9b1-0c63-4eb7-97d0-ec0a36adfd7c', value: 'Jan 22'},
  {id: 'b3b26d9b-7b8d-4c08-ace1-07b8e0a8e04e', value: 'Jan 23'},
  {id: '514c01da-98c0-40ae-b73b-d7338b30ab8d', value: 'Jan 24'},
  {id: '9fb86c23-67e7-42a8-ba95-e8d0cb3ad2f5', value: 'Jan 25'},
  {id: '7e883f65-d3b9-42c1-973b-0aeb5bf78fa2', value: 'Jan 26'},
  {id: '02967072-8657-4fb5-bb6f-358ee97a5c9e', value: 'Jan 27'},
];

export const timeSlots: ITimeslots[] = [
  {id: '7c36303b-d69d-4a14-844e-20a00d39e9b3', value: '12:00 PM'},
  {id: 'e131d073-6d7a-46b4-bd77-694295325b58', value: '01:00 PM'},
  {id: 'fd1f3432-cfb7-4871-b3d4-90f60db8e49c', value: '02:00 PM'},
  {id: 'f50a7a19-14f7-448d-947b-45bbdb21b168', value: '03:00 PM'},
  {id: 'b739d760-9302-4b5a-90a6-d1a3353b6be3', value: '04:00 PM'},
  {id: 'ff9b0a37-c660-4d8b-b5a3-7a95fc2a9fb8', value: '05:00 PM'},
  {id: '99c5a0d7-52d1-4047-9753-eb85e289290f', value: '06:00 PM'},
  {id: 'd19218ab-d456-4817-8ff3-16c2a5a58c69', value: '07:00 PM'},
  {id: '7a6b72b5-7d42-4f76-a98c-63a2327b8e29', value: '08:00 PM'},
  {id: 'b5af6e56-dae1-41a9-9ba5-d9b11a975c9e', value: '09:00 AM'},
  {id: '1d2bbcb2-1a06-4fc9-8e1b-4ec95bf1a66f', value: '10:00 AM'},
  {id: '5cf4f6e3-cb78-4c4e-9613-8ab93b378336', value: '11:00 AM'},
];
