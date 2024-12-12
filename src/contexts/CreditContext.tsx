"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useAuth } from "./AuthContext";
import { getMyPlan, updateCredit } from "@/services/creditService";
import { handleError, runService } from "@/utils/service_utils";
import { CreditContextType, CreditModel, PlanModel } from "@/types";

interface UpdateData {
  emailReg?: number;
  emailExt?: number;
  mobileReg?: number;
  mobileExt?: number;
}

export const Context = createContext<any>(undefined);

export const CreditProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [myPlan, setMyPlan] = useState<PlanModel | null>(null);
  const [credits, setCredits] = useState<CreditModel | null>(null);

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
        setMyPlan(data.plan);
        setCredits(data.credits);
        setIsLoading(false);
      },
      (status, error) => {
        handleError(status, error);
        setIsLoading(false);
      }
    );
  };

  const handleUpdateCredits = async (data: UpdateData) => {
    const updateData: UpdateData = {};

    if (data.emailReg !== undefined) updateData.emailReg = data.emailReg;
    if (data.emailExt !== undefined) updateData.emailExt = data.emailExt;
    if (data.mobileReg !== undefined) updateData.mobileReg = data.mobileReg;
    if (data.mobileExt !== undefined) updateData.mobileExt = data.mobileExt;

    setIsLoading(true);
    runService(
      {
        creditId: "0f3382fae2324e4681f833d456c9f410",
        updateData: updateData,
      },
      updateCredit,
      (data) => {
        // console.log(data);
        setCredits(data);
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
    <Context.Provider
      value={{ isLoading, myPlan, credits, handleUpdateCredits }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCredit = (): any => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useCredit must be used within an CreditProvider");
  }
  return context;
};
