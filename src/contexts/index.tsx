import { ThemeProvider } from "next-themes";

import { AlertProvider } from "@/contexts/AlertContext";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class">
        <AlertProvider>{children}</AlertProvider>
      </ThemeProvider>
    </>
  );
};

export default MainProvider;
