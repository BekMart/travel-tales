import axios from "axios";

// Default instance used across the app
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// Instance used for sending requests (e.g., POST/PUT)
export const axiosReq = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Instance used for handling responses (e.g., token refresh)
export const axiosRes = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export default api;