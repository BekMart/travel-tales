import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export default api;
export const axiosReq = axios.create();
export const axiosRes = axios.create();
