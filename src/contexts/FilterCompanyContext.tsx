import React, { createContext, useState, useContext, ReactNode } from "react";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

export interface CompanyFilterConfig {
  createdCompanyId: string;
  isOpen: boolean;
  company: string;
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  employee: Option | Option[] | null;
  industry: string;
}

export const getDefaultCompanyFilterConfig = (): CompanyFilterConfig => {
  return {
    createdCompanyId: "",
    isOpen: true,
    company: "",
    country: "",
    state: "",
    city: "",
    streetAddress: "",
    employee: [],
    industry: "",
  };
};

interface CompanyFilterContextType {
  companyFilterConfig: CompanyFilterConfig;
  setCompanyFilterConfig: React.Dispatch<
    React.SetStateAction<CompanyFilterConfig>
  >;
}

export const CompanyFilterContext = createContext<
  CompanyFilterContextType | undefined
>(undefined);

export const CompanyFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [companyFilterConfig, setCompanyFilterConfig] =
    useState<CompanyFilterConfig>({
      createdCompanyId: "",
      isOpen: true,
      company: "",
      country: "",
      state: "",
      city: "",
      streetAddress: "",
      employee: [],
      industry: "",
    });

  return (
    <CompanyFilterContext.Provider
      value={{ companyFilterConfig, setCompanyFilterConfig }}
    >
      {children}
    </CompanyFilterContext.Provider>
  );
};

export const useCompanyFilter = (): CompanyFilterContextType => {
  const context = useContext(CompanyFilterContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
