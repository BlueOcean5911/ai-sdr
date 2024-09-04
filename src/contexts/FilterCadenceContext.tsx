import React, { createContext, useState, useContext, ReactNode } from "react";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

interface CadenceFilterConfig {
  isOpen: boolean;
  persona: Option | Option[] | null;
  title: string;
  company: string;
  location: string;
  employee: Option | Option[] | null;
  keyword: string;
}

interface CadenceFilterContextType {
  cadenceFilterConfig: CadenceFilterConfig;
  setCadenceFilterConfig: React.Dispatch<
    React.SetStateAction<CadenceFilterConfig>
  >;
}

export const CadenceFilterContext = createContext<
  CadenceFilterContextType | undefined
>(undefined);

export const CadenceFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cadenceFilterConfig, setCadenceFilterConfig] =
    useState<CadenceFilterConfig>({
      isOpen: true,
      persona: [],
      title: "",
      company: "",
      location: "",
      employee: [],
      keyword: "",
    });

  const updateCadenceFilterConfig = (config: CadenceFilterConfig) => {
    setCadenceFilterConfig(config);
  };

  return (
    <CadenceFilterContext.Provider
      value={{ cadenceFilterConfig, setCadenceFilterConfig }}
    >
      {children}
    </CadenceFilterContext.Provider>
  );
};

export const useCadenceFilter = (): CadenceFilterContextType => {
  const context = useContext(CadenceFilterContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an ");
  }
  return context;
};
