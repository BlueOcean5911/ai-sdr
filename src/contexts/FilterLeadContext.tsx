import React, { createContext, useState, useContext, ReactNode } from "react";

interface LeadFilterConfig {
  isOpen: boolean;
  title: string;
  company: string;
  location: string;
}

interface LeadFilterContextType {
  leadFilterConfig: LeadFilterConfig;
  setLeadFilterConfig: React.Dispatch<React.SetStateAction<LeadFilterConfig>>;
}

export const LeadFilterContext = createContext<
  LeadFilterContextType | undefined
>(undefined);

export const LeadFilterProvider = ({ children }: { children: ReactNode }) => {
  const [leadFilterConfig, setLeadFilterConfig] = useState<LeadFilterConfig>({
    isOpen: true,
    title: "",
    company: "",
    location: "",
  });

  const updateLeadFilterConfig = (config: LeadFilterConfig) => {
    setLeadFilterConfig(config);
  };

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
