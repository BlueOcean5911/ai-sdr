import { ThemeProvider } from "next-themes";

import { AuthProvider } from "@/contexts/AuthContext";
import { CreditProvider } from "@/contexts/CreditContext";
import { AlertProvider } from "@/contexts/AlertContext";
import { TwilioProvider } from "@/contexts/TwilioContext";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class">
        <AuthProvider>
          <CreditProvider>
            <TwilioProvider>
              <AlertProvider>{children}</AlertProvider>
            </TwilioProvider>
          </CreditProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default MainProvider;
