import { UUID } from "crypto";

export interface IPatient {
  patientId: string | null;
  fullname: string;
  phoneNumber: string;
  gender: string;
  age: number;
  createdBy: string;
  email?: string|null;
  isDeleted?: boolean;
}

export const IPatientInitialState: IPatient = {
  patientId: "",
  fullname: "",
  phoneNumber: "",
  createdBy: "",
  email: "",
  isDeleted: false,
  gender: "",
  age: 0
};

export interface IPatientList {
  isLoading: boolean;
  patientList: IPatient[];
  errormessage: any;
}

export const IPatientListInitialState: IPatientList = {
  isLoading: false,
  errormessage: "",
  patientList: [],
};
