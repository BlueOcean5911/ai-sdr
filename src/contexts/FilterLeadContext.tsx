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
  orderBy: string;
  isAscending: boolean | undefined;
  search: string;
}

export const defaultLeadFilterConfig: LeadFilterConfig = {
  createdLeadId: "",
  isOpen: true,
  persona: null,
  title: "",
  company: "",
  country: "",
  state: "",
  city: "",
  employee: null,
  industry: "",
  orderBy: "",
  isAscending: undefined,
  search: "",
};

interface LeadFilterContextType {
  leadFilterConfig: LeadFilterConfig;
  setLeadFilterConfig: React.Dispatch<React.SetStateAction<LeadFilterConfig>>;
}

export const LeadFilterContext = createContext<
  LeadFilterContextType | undefined
>(undefined);

export const LeadFilterProvider = ({ children }: { children: ReactNode }) => {
  const [leadFilterConfig, setLeadFilterConfig] = useState<LeadFilterConfig>(
    defaultLeadFilterConfig
  );

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
    throw new Error("useLeadFilter must be used within an LeadFilterProvider");
  }
  return context;
};
