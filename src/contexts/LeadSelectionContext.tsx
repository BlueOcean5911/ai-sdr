import { createContext, useContext, useState } from "react";

const defaultLeads = [
  {
    id: "M909-1",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Hubspot",
  },
  {
    id: "M909-2",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Hubspot",
  },
  {
    id: "M909-3",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Hubspot",
  },
  {
    id: "M909-4",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Hubspot",
  },
  {
    id: "M909-5",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909-6",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909-7",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909-8",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Salesforce",
  },
  {
    id: "M909-9",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Salesforce",
  },
  {
    id: "M909-10",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Salesforce",
  },
  {
    id: "M909-11",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Salesforce",
  },
  {
    id: "M909-12",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909-13",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909-14",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909-15",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
];

export const LeadSelectionContext = createContext<any>(undefined);

export const LeadSelectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [totalLeads, setTotalLeads] = useState<any[]>(defaultLeads);
  const [savedLeads, setSavedLeads] = useState<any[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<any[]>([]);

  const handleSaveLeads = (leads: any[]) => {
    for (const lead of leads) {
      const leadExists = savedLeads.find(
        (savedLead) => savedLead.id === lead.id
      );
      if (!leadExists) {
        setSavedLeads([...savedLeads, ...leads]);
      }
    }
  };

  return (
    <LeadSelectionContext.Provider
      value={{
        totalLeads,
        setTotalLeads,
        selectedLeads,
        setSelectedLeads,
        savedLeads,
        handleSaveLeads,
      }}
    >
      {children}
    </LeadSelectionContext.Provider>
  );
};

export const useLeadSelection = (): any => {
  const context = useContext(LeadSelectionContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
