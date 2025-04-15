import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
//   headers: {
//     'Content-Type': 'miultipart/form-data',
//   }
});

export default api;
export const axiosReq = axios.create();
export const axiosRes = axios.create();
