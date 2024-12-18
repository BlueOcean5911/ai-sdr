"use client";
import { createContext, useContext, useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { isTokenExpired } from "@/utils/jwt";
import {
  getRememberMe,
  getToken,
  saveToken,
  signOut,
} from "@/services/authService";
import { privatePaths } from "@/data/paths";
import { handleError, runService } from "@/utils/service_utils";
import { getMe } from "@/services/userService";

export const Context = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(
    getRememberMe() || getToken()
  );
  const [me, setMe] = useState<JwtPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    if (token)
      if (!isTokenExpired(token)) {
        setIsAuthenticated(true);
        // const decoded = jwt.decode(token) as JwtPayload;
        runService(
          undefined,
          getMe,
          (data) => {
            setMe(data);
          },
          (status, error) => {
            handleError(status, error);
          }
        );
        saveToken(token);
        // setMe(decoded);
        // console.log("me: ", decoded);
      } else {
        handleSignOut();
        console.log("token expired");
      }
    else setIsAuthenticated(false);
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated && path === "/login") {
      router.push("/dashboard");
      toast.success("Successfully logged in");
    }
    if (!isAuthenticated && privatePaths.some((p) => path.startsWith(p))) {
      router.push("/login");
      toast.info("Please login to continue");
    }
  }, [isLoading, isAuthenticated, path]);

  const handleSignOut = () => {
    signOut();
    setToken(null);
    setMe(null);
    setIsAdmin(false);
    setIsSuperAdmin(false);
  };

  return (
    <Context.Provider
      value={{
        isLoading,
        isAuthenticated,
        token,
        me,
        setToken,
        setMe,
        handleSignOut,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = (): any => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
