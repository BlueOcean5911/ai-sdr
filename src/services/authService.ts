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

export const requestDemo = (data: { user: RegisterModel; invite?: string }) => {
  const { user, invite } = data;
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

export const saveRememberMe = (token: string) => {
  localStorage.setItem("ai-vio-remember-me", token);
};

export const getRememberMe = (): string | null => {
  return localStorage.getItem("ai-vio-remember-me");
};

export const removeRememberMe = () => {
  localStorage.removeItem("ai-vio-remember-me");
};

export const signOut = () => {
  localStorage.removeItem("ai-vio-token");
  localStorage.removeItem("ai-vio-remember-me");
  window.location.replace(ROUTE_LOGIN);
};
