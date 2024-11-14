import React, { createContext, useState, useContext, ReactNode } from "react";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

interface ContactFilterConfig {
  isOpen: boolean;
  cadenceSteps: Option | Option[] | null;
  owners: Option | Option[] | null;
  search: string;
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
      cadenceSteps: [],
      owners: [],
      search: "",
    });

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
    throw new Error(
      "useContactFilter must be used within an ContactFilterProvider"
    );
  }
  return context;
};
