const baseURL = "http://localhost:3000";

const commonHeader = {
  Accept: "application/json",
};

export const URLS = {
  baseURL,
};

export const Headers = {
  commonHeader,
};


export interface IRegistrationPaylaod {
  firstname: string;
  lastname: string;
  phoneNo: string;
  email: string;
  address: string;
  password: string;
}
