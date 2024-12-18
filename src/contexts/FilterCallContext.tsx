import React, { createContext, useState, useContext, ReactNode } from "react";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

interface CallFilterConfig {
  params: { [key: string]: string };
  isOpen: boolean;
  fromUser: Option | Option[] | null;
  states: Option | Option[] | null;
  purposes: Option | Option[] | null;
  dispositions: Option | Option[] | null;
  orderBy: string;
  isAscending: boolean | undefined;
  search: string;
}

interface CallFilterContextType {
  callFilterConfig: CallFilterConfig;
  setCallFilterConfig: React.Dispatch<React.SetStateAction<CallFilterConfig>>;
}

export const CallFilterContext = createContext<
  CallFilterContextType | undefined
>(undefined);

export const CallFilterProvider = ({ children }: { children: ReactNode }) => {
  const [callFilterConfig, setCallFilterConfig] = useState<CallFilterConfig>({
    params: {},
    isOpen: true,
    fromUser: [],
    states: [],
    purposes: [],
    dispositions: [],
    orderBy: "",
    isAscending: undefined,
    search: "",
  });

  const updateCallFilterConfig = (config: CallFilterConfig) => {
    setCallFilterConfig(config);
  };

  return (
    <CallFilterContext.Provider
      value={{ callFilterConfig, setCallFilterConfig }}
    >
      {children}
    </CallFilterContext.Provider>
  );
};

export const useCallFilter = (): CallFilterContextType => {
  const context = useContext(CallFilterContext);
  if (context === undefined) {
    throw new Error("useCallFilter must be used within an CallFilterProvider");
  }
  return context;
};
