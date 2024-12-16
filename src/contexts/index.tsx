import { ThemeProvider } from "next-themes";

import { AuthProvider } from "@/contexts/AuthContext";
import { CreditProvider } from "@/contexts/CreditContext";
import { AlertProvider } from "@/contexts/AlertContext";
import { TwilioProvider } from "@/contexts/TwilioContext";
import { TwilioProvider as TwilioProviderV2 } from "@/contexts/TwilioContextV2";
import PhoneDial from "@/sections/twilio/PhoneDial";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class">
        <AuthProvider>
          <CreditProvider>
            <TwilioProviderV2>
              <AlertProvider>
                <PhoneDial />
                {children}
              </AlertProvider>
            </TwilioProviderV2>
          </CreditProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default MainProvider;
