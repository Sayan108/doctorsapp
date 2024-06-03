import { IClinic, IClinicDetails, IClinicDetailsInitialState, IClinicInitialState } from "./clinic.constant";
import { IDoctor, IDoctorInitialState } from "./doctor.constant";
import { IPatient, IPatientInitialState } from "./patient.constant";

export interface IAppointment {
  createdBy: string;
  checkupHour: string;
  checkupDay: string;
  bookingDate: string;
  bookingDayId: string;
  bookingHourId: string;
  isDeleted: boolean;
  appointmentId: string | null;
  createDate: string;
  isCompleted: boolean;
  doctorId: string;
  clinicData: IClinicDetails | null;
  patientData: IPatient;
  clinicId: string;
  status:number
}

export const IAppointmentInitialState: IAppointment = {
  createdBy: "",
  checkupHour: "",
  bookingDate: "",
  bookingDayId: "",
  bookingHourId: "",
  isDeleted: false,
  appointmentId: "",
  createDate: "",
  isCompleted: false,
  clinicData: IClinicDetailsInitialState,
  patientData: IPatientInitialState,
  doctorId: "",
  clinicId: "",
  checkupDay: "",
  status: 0
};

export interface IAppointmentList{
  isLoading: boolean;
  appointments: IAppointment[];
  errormessege: string;
}

export const IAppointmentListInitialState: IAppointmentList={
  isLoading: false,
  appointments: [],
  errormessege: "",
}
