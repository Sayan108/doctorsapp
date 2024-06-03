export interface IClinic {
  clinicDetails: IClinicDetails | null;
  availableDayAndHour: IAvailableDayAndHour[];
  selectedTimeSlots: any[];
}

export interface IAvailableDayAndHour {
  date: string;
  dayId: string;
  hourAndSlot: IHourAndSlot[];
}

export interface IHourAndSlot {
  hourId: string;
  hour: string;
  availableSlots: number;
}

export const IHourAndSlotIntitalState: IHourAndSlot = {
  hour: "",
  availableSlots: 0,
  hourId: ""
};

 interface IClinicAddress {
  city: string;
  state: string;
  address: string;
  country: string;
  pincode: string;
  landmark: string;
}

export interface IClinicDetails {
  clinicId: string | null;
  clinicName: string;
  address: IClinicAddress;
}

export interface IClinicList {
  list: IClinicDetails[];
}

export const IClinicAddressInitialState: IClinicAddress = {
  city: "",
  state: "",
  address: "",
  country: "",
  pincode: "",
  landmark: "",
};

export const IClinicDetailsInitialState: IClinicDetails = {
  clinicId: "",
  clinicName: "",
  address: IClinicAddressInitialState,
};

export const IClinicInitialState: IClinic = {
  clinicDetails: IClinicDetailsInitialState,
  availableDayAndHour: [],
  selectedTimeSlots: [],
};
