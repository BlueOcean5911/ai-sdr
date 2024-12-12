import { getMe } from "@/services/userService";
import { handleError, runService } from "@/utils/service_utils";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

interface EmailFilterConfig {
  params: { [key: string]: string };
  isOpen: boolean;
  fromUser: Option | Option[] | null;
  fromEmail: Option | Option[] | null;
  orderBy: string;
  isAscending: boolean | undefined;
  search: string;
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
      params: {},
      isOpen: true,
      fromUser: [],
      fromEmail: [],
      orderBy: "",
      isAscending: undefined,
      search: "",
    }
  );

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
    throw new Error(
      "useEmailFilter must be used within an EmailFilterProvider"
    );
  }
  return context;
};
