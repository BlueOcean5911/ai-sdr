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

interface RegisterModel {
  firstName: string;
  lastName: string;
  companyName?: string;
  companySize?: string;
  email: string;
  password: string;
}

export const register = (data: { user: RegisterModel; invite?: string }) => {
  const { user, invite } = data;
  console.log("register user", user);
  let url = `/auth/register`;
  if (invite) {
    url += `?invite=${invite}`;
  }
  return api.post(url, user);
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
