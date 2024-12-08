"use client";
import { createContext, useContext, useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { isTokenExpired } from "@/utils/jwt";
import { getRememberMe, getToken } from "@/services/authService";
import { privatePaths } from "@/data/paths";

export const Context = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [me, setMe] = useState<JwtPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const token = getRememberMe() || getToken();
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
      const decoded = jwt.decode(token) as JwtPayload;
      setMe(decoded);
      console.log("me: ", decoded);
    } else {
      setIsAuthenticated(false);
      console.log("token expired");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated && path === "/login") {
      router.push("/dashboard");
      toast.info("You are already logged in");
    }
    if (!isAuthenticated && privatePaths.some((p) => path.startsWith(p))) {
      router.push("/login");
      toast.info("Please login to continue");
    }
  }, [isLoading, isAuthenticated, path]);

  return (
    <Context.Provider value={{ isLoading, isAuthenticated, me }}>
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
