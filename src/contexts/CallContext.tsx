import { createContext, useContext, useState } from "react";

export const CallContext = createContext<any>(undefined);

export const CallProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [totalCalls, setTotalCalls] = useState<any[]>([]);
  const [savedCalls, setSavedCalls] = useState<any[]>([]);
  const [selectedCalls, setSelectedCalls] = useState<any[]>([]);

  const handleSaveCalls = (calls: any[]) => {
    for (const call of calls) {
      const callExists = savedCalls.find(
        (savedCall) => savedCall.id === call.id
      );
      if (!callExists) {
        setSavedCalls([...savedCalls, ...calls]);
      }
    }
  };

  return (
    <CallContext.Provider
      value={{
        totalCalls,
        setTotalCalls,
        selectedCalls,
        setSelectedCalls,
        savedCalls,
        handleSaveCalls,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCall = (): any => {
  const context = useContext(CallContext);
  if (context === undefined) {
    throw new Error(
      "useCall must be used within an CallProvider"
    );
  }
  return context;
};
