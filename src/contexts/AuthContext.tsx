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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = getRememberMe() || getToken();
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
      const decoded = jwt.decode(token) as JwtPayload;
      setUser(decoded);
      console.log("user: ", decoded);
    } else {
      setIsAuthenticated(false);
      console.log("token expired");
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && path === "/login") {
      router.push("/dashboard");
      toast.info("You are already logged in");
    }
    if (!isAuthenticated && privatePaths.some((p) => path.startsWith(p))) {
      router.push("/login");
      toast.info("Please login to continue");
    }
  }, [isAuthenticated, path]);

  return (
    <Context.Provider value={{ isAuthenticated, user }}>
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
