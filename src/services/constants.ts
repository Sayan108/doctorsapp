export const BaseURLs = {
  // baseURL: 'http://82.112.226.89:3001/api/doctorapp',
  // authBaseURL: 'http://82.112.226.89:3002/api/auth',
  baseURL: 'https://fusionframe-stg.chickenkiller.com/api/doctorapp',
  authBaseURL: 'https://auth2-0-kke9.onrender.com/api/auth',
};

export const Endpoints = {
  addAppointment: '/appointment/',
  registerPatient: '/patient',
  requestOTP: '/otp/',
  login: '/login',
  getAppointmentList: '/appointment/list',
  clinicList: '/clinic/list',
  clinicDetails: '/clinic/details',
  availableSlots: '/clinic/getAvailableClinic',
  doctorDetails: '/doctor/details',
  addPatient: '/patient',
  patientList: '/patient/patientlist',
  updateUser: '/user',
  appointmentDetails: '/appointment/details',
  updateAppointment: '/appointment',
  updatePatient: '/patient/update',
  dashboardData: '/dashboard',
};

export const defaultDoctorId = '349e3b14-54a5-463b-81e4-276d6508fe37';
