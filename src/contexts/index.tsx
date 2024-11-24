import { ThemeProvider } from "next-themes";

import { AlertProvider } from "@/contexts/AlertContext";
import { TwilioProvider } from "@/contexts/TwilioContext";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class">
        <TwilioProvider>
          <AlertProvider>{children}</AlertProvider>
        </TwilioProvider>
      </ThemeProvider>
    </>
  );
};

export default MainProvider;
