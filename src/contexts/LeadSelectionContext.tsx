import { createContext, useState } from "react";

interface LeadSelectionContextType {
  selectedLeads: any[];
  setSelectedLeads: React.Dispatch<React.SetStateAction<any[]>>;
  selectedLeadsIds: string[];
  setSelectedLeadsIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const LeadSelectionContext = createContext<
  LeadSelectionContextType | undefined
>(undefined);

export const LeadSelectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedLeads, setSelectedLeads] = useState<any[]>([]);
  const [selectedLeadsIds, setSelectedLeadsIds] = useState<string[]>([]);

  return (
    <LeadSelectionContext.Provider
      value={{
        selectedLeads,
        setSelectedLeads,
        selectedLeadsIds,
        setSelectedLeadsIds,
      }}
    >
      {children}
    </LeadSelectionContext.Provider>
  );
};
