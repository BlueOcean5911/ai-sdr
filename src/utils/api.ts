import axios from "axios";
import { getRememberMe, getToken } from "@/services/authService";

// Create an Axios instance with default headers
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getRememberMe() || getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Create an Axios instance with default headers
const twilioApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TWILIO_VOICE_CALL_BACKEND_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
// twilioApi.interceptors.request.use(
//   (config) => {
//     const token = getRememberMe() || getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export { api, twilioApi };
