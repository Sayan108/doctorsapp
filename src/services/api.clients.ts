import axios from "axios";
import { Headers, URLS } from "./api.constants";

export const baseClient = axios.create({
  baseURL: URLS.baseURL,
  headers: Headers.commonHeader,
});
