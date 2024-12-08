import { ThemeProvider } from "next-themes";

import { AuthProvider } from "@/contexts/AuthContext";
import { AlertProvider } from "@/contexts/AlertContext";
import { TwilioProvider } from "@/contexts/TwilioContext";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class">
        <AuthProvider>
          <TwilioProvider>
            <AlertProvider>{children}</AlertProvider>
          </TwilioProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default MainProvider;
