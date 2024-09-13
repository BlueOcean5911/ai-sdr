import React, { createContext, useState, useContext, ReactNode } from "react";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

interface ContactFilterConfig {
  isOpen: boolean;
  cadenceStatus?: Option | Option[] | null;
  cadenceStep?: Option | Option[] | null;
  sendEmailsFrom?: string;
  cadenceId?: string;
  campaignId?: string;
}

interface ContactFilterContextType {
  contactFilterConfig: ContactFilterConfig;
  setContactFilterConfig: React.Dispatch<
    React.SetStateAction<ContactFilterConfig>
  >;
}

export const ContactFilterContext = createContext<
  ContactFilterContextType | undefined
>(undefined);

export const ContactFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [contactFilterConfig, setContactFilterConfig] =
    useState<ContactFilterConfig>({
      isOpen: true,
      cadenceStatus: [],
      cadenceStep: [],
      sendEmailsFrom: "",
      cadenceId: "",
      campaignId: "",
    });

  const updateContactFilterConfig = (config: ContactFilterConfig) => {
    setContactFilterConfig(config);
  };

  return (
    <ContactFilterContext.Provider
      value={{ contactFilterConfig, setContactFilterConfig }}
    >
      {children}
    </ContactFilterContext.Provider>
  );
};

export const useContactFilter = (): ContactFilterContextType => {
  const context = useContext(ContactFilterContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an ");
  }
  return context;
};
