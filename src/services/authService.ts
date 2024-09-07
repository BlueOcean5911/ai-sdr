import { ROUTE_LOGIN } from "@/data/routes";
import { api } from "@/utils/api";

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return api.post("/auth/login", { email, password });
};

export const register = ({
  firstName,
  lastName,
  companyName,
  companySize,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  companyName: string;
  companySize: string;
  email: string;
  password: string;
}) => {
  return api.post("/auth/register", {
    first_name: firstName,
    last_name: lastName,
    company_name: companyName,
    company_size: companySize,
    email: email,
    password: password,
  });
};

export const saveToken = (token: string) => {
  localStorage.setItem("ai-vio-token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("ai-vio-token");
};

export const signOut = () => {
  localStorage.removeItem("ai-vio-token");
  window.location.replace(ROUTE_LOGIN);
};
