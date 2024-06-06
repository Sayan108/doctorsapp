import AppointmentDetails from "../screens/appointment/appoinmentDetails";

export const BaseURLs = {
  // baseurl: "http://localhost:3000",
  baseurl: "https://clientapp-backend.onrender.com",
};

export const Endpoints = {
  addAppointment: "/appointment/",
  registerPatient: "/patient",
  requestOTP: "/otp/",
  login: "/user/login",
  getAppointmentList: "/appointment/list",
  clinicList: "/clinic/list",
  clinicDetails: "/clinic/details",
  availableSlots: "/clinic/getAvailableClinic",
  doctorDetails: "/doctor/details",
  addPatient: "/patient",
  patientList: "/patient/patientlist",
  updateUser: "/user",
  appointmentDetails:"/appointment/details"
  //updateAppointment : "http://localhost:3000/appoinemntupdate",
};
