export interface IDoctor {
  doctorId?: string | null;
  fullname?: string;
  phoneNumber?: string | null;
  certifications?: string;
  education?: string;
  email?: string;
  experience?: number;
  languagesSpoken?: string;
  specialization?: string;
}

export const IDoctorInitialState: IDoctor = {
  doctorId: "",
  fullname: "",
  phoneNumber: "",
  email: "",
  certifications: "",
  education: "",
  experience: 0,
  languagesSpoken: "",
  specialization: "",
};
