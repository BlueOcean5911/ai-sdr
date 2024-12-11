"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useAuth } from "./AuthContext";
import { getMyPlan } from "@/services/creditService";
import { handleError, runService } from "@/utils/service_utils";
import  { CreditContextType, PlanModel } from "@/types";

export const Context = createContext<any>(undefined);

export const CreditProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [myPlan, setMyPlan] = useState<PlanModel | null>(null);
  // const [emailCredit, setEmailCredit] = useState<number | null>(null);
  // const [mobileCredit, setMobileCredit] = useState<number | null>(null);

  const { isAuthenticated } = useAuth();
  const path = usePathname();
  const router = useRouter();

  const fetchMyPlan = async () => {
    setIsLoading(true);
    runService(
      undefined,
      getMyPlan,
      (data) => {
        console.log(data);
        setMyPlan(data);
        // setEmailCredit(data.emailCredit);
        // setMobileCredit(data.mobileCredit);
        setIsLoading(false);
      },
      (status, error) => {
        handleError(status, error);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchMyPlan();
  }, [isAuthenticated]);

  return (
    <Context.Provider value={{ isLoading, myPlan }}>{children}</Context.Provider>
  );
};

export const useCredit = (): any => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useCredit must be used within an CreditProvider");
  }
  return context;
};
