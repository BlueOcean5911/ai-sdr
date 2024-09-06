import React, { createContext, useState, useContext, ReactNode } from "react";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

interface EmailFilterConfig {
  isOpen: boolean;
  fromUser: Option | Option[] | null;
  fromEmail: string;
}

interface EmailFilterContextType {
  emailFilterConfig: EmailFilterConfig;
  setEmailFilterConfig: React.Dispatch<React.SetStateAction<EmailFilterConfig>>;
}

export const EmailFilterContext = createContext<
  EmailFilterContextType | undefined
>(undefined);

export const EmailFilterProvider = ({ children }: { children: ReactNode }) => {
  const [emailFilterConfig, setEmailFilterConfig] = useState<EmailFilterConfig>(
    {
      isOpen: true,
      fromUser: [],
      fromEmail: "",
    }
  );

  const updateEmailFilterConfig = (config: EmailFilterConfig) => {
    setEmailFilterConfig(config);
  };

  return (
    <EmailFilterContext.Provider
      value={{ emailFilterConfig, setEmailFilterConfig }}
    >
      {children}
    </EmailFilterContext.Provider>
  );
};

export const useEmailFilter = (): EmailFilterContextType => {
  const context = useContext(EmailFilterContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an ");
  }
  return context;
};
