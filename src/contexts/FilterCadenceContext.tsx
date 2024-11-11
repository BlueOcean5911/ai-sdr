import React, { createContext, useState, useContext, ReactNode } from "react";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

interface CadenceFilterConfig {
  isOpen: boolean;
  isActive: boolean;
  starred: boolean;
  ownedBy: Option | Option[] | null;
  campaignId: string;
  orderBy: string;
  isAscending: boolean | undefined;
  search: string;
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
      isActive: false,
      starred: false,
      ownedBy: [],
      campaignId: "",
      orderBy: "",
      isAscending: undefined,
      search: "",
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
    throw new Error(
      "useCadenceFilter must be used within an CadenceFilterProvider"
    );
  }
  return context;
};
