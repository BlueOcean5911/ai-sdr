import React, { createContext, useState, useContext, ReactNode } from "react";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

export interface LeadFilterConfig {
  createdLeadId: string;
  isOpen: boolean;
  persona: Option | Option[] | null;
  title: string;
  company: string;
  country: string;
  state: string;
  city: string;
  employee: Option | Option[] | null;
  industry: string;
}

export const getDefaultLeadFilterConfig = () => {
  return {
    createdLeadId: "",
    isOpen: true,
    persona: [],
    title: "",
    company: "",
    country: "",
    state: "",
    city: "",
    employee: [],
    industry: "",
  };
};

interface LeadFilterContextType {
  leadFilterConfig: LeadFilterConfig;
  setLeadFilterConfig: React.Dispatch<React.SetStateAction<LeadFilterConfig>>;
}

export const LeadFilterContext = createContext<
  LeadFilterContextType | undefined
>(undefined);

export const LeadFilterProvider = ({ children }: { children: ReactNode }) => {
  const [leadFilterConfig, setLeadFilterConfig] = useState<LeadFilterConfig>({
    createdLeadId: "",
    isOpen: true,
    persona: [],
    title: "",
    company: "",
    country: "",
    state: "",
    city: "",
    employee: [],
    industry: "",
  });

  return (
    <LeadFilterContext.Provider
      value={{ leadFilterConfig, setLeadFilterConfig }}
    >
      {children}
    </LeadFilterContext.Provider>
  );
};

export const useLeadFilter = (): LeadFilterContextType => {
  const context = useContext(LeadFilterContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
