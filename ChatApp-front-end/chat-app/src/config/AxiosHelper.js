import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;
export const httpCilent = axios.create({
  baseURL: BASE_URL,
});
