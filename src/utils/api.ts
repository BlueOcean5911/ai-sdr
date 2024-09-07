import axios from "axios";

export const saveToken = (token: string) => {
  localStorage.setItem("ai-vio-token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("ai-vio-token");
};

// Create an Axios instance with default headers
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
