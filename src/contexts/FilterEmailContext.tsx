import { getMe } from "@/services/userService";
import { handleError, runService } from "@/utils/service_utils";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
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
      search: "",
    }
  );
  const isInitialRendering = useRef(true);

  useEffect(() => {
    if (isInitialRendering.current) {
      isInitialRendering.current = false;
      return;
    }
    runService(
      undefined,
      getMe,
      (user) => {
        console.log("here filter email context");
        setEmailFilterConfig((prevConfig) => ({
          ...prevConfig,
          fromUser: [
            {
              value: user.id,
              label: `${user.firstName} ${user.lastName}`,
            },
          ],
        }));
      },
      (statusCode, error) => {
        handleError(statusCode, error);
      }
    );
  }, []);

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
