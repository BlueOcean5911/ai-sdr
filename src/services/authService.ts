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

export const resetPassword = ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => {
  return api.post("/auth/reset-password", { password, token });
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
  if (typeof window !== "undefined") {
    localStorage.setItem("ai-vio-token", token);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("ai-vio-token");
  }
  return null;
};

export const saveRememberMe = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("ai-vio-remember-me", token);
  }
};

export const getRememberMe = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("ai-vio-remember-me");
  }
  return null;
};

export const removeRememberMe = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("ai-vio-remember-me");
  }
};

export const signOut = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("ai-vio-token");
    localStorage.removeItem("ai-vio-remember-me");
  }
};

export const sendResetLink = async (props: { email: string }) => {
  const { email } = props;
  const data = { email };
  return await api.post("/auth/reset", data);
};
