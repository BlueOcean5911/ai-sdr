import { createContext, useContext, useState } from "react";

const defaultLeads = [
  {
    ID: 1,
    Name: "Alice Johnson",
    Title: "Product Manager",
    "Company name": "Tech Innovations LLC",
    Phone: "555-1234",
    "Contact Location": "New York, NY",
    Employees: 150,
    Industry: "Technology",
    Keywords: ["product management", "technology", "innovation"],
  },
  {
    ID: 2,
    Name: "Bob Smith",
    Title: "Software Engineer",
    "Company name": "Dev Solutions Inc.",
    Phone: "555-5678",
    "Contact Location": "San Francisco, CA",
    Employees: 75,
    Industry: "Software Development",
    Keywords: ["software engineering", "development", "coding"],
  },
  {
    ID: 3,
    Name: "Carol White",
    Title: "Marketing Director",
    "Company name": "Creative Marketing Co.",
    Phone: "555-8765",
    "Contact Location": "Chicago, IL",
    Employees: 50,
    Industry: "Marketing",
    Keywords: ["marketing", "branding", "advertising"],
  },
  {
    ID: 4,
    Name: "David Brown",
    Title: "Sales Executive",
    "Company name": "Global Trade Corp.",
    Phone: "555-4321",
    "Contact Location": "Miami, FL",
    Employees: 200,
    Industry: "Wholesale",
    Keywords: ["sales", "trade", "negotiation"],
  },
  {
    ID: 5,
    Name: "Eva Green",
    Title: "HR Manager",
    "Company name": "People First Ltd.",
    Phone: "555-6789",
    "Contact Location": "Austin, TX",
    Employees: 30,
    Industry: "Human Resources",
    Keywords: ["human resources", "recruitment", "employee relations"],
  },
  {
    ID: 6,
    Name: "Frank Miller",
    Title: "Chief Executive Officer",
    "Company name": "Innovative Solutions Inc.",
    Phone: "555-1111",
    "Contact Location": "Seattle, WA",
    Employees: 300,
    Industry: "Consulting",
    Keywords: ["leadership", "strategy", "consulting"],
  },
  {
    ID: 7,
    Name: "Grace Lee",
    Title: "Data Analyst",
    "Company name": "Data Insights LLC",
    Phone: "555-2222",
    "Contact Location": "Boston, MA",
    Employees: 40,
    Industry: "Data Science",
    Keywords: ["data analysis", "statistics", "business intelligence"],
  },
  {
    ID: 8,
    Name: "Henry Wilson",
    Title: "UX Designer",
    "Company name": "Design Hub",
    Phone: "555-3333",
    "Contact Location": "Los Angeles, CA",
    Employees: 60,
    Industry: "Design",
    Keywords: ["user experience", "design", "prototyping"],
  },
  {
    ID: 9,
    Name: "Isabella Martinez",
    Title: "Financial Analyst",
    "Company name": "Finance Pros",
    Phone: "555-4444",
    "Contact Location": "Denver, CO",
    Employees: 80,
    Industry: "Finance",
    Keywords: ["finance", "analysis", "investment"],
  },
  {
    ID: 10,
    Name: "Jack Davis",
    Title: "Operations Manager",
    "Company name": "Logistics Solutions",
    Phone: "555-5555",
    "Contact Location": "Phoenix, AZ",
    Employees: 150,
    Industry: "Logistics",
    Keywords: ["operations", "logistics", "supply chain"],
  },
  {
    ID: 11,
    Name: "Katherine Johnson",
    Title: "Web Developer",
    "Company name": "Web Creations",
    Phone: "555-6666",
    "Contact Location": "Atlanta, GA",
    Employees: 45,
    Industry: "Web Development",
    Keywords: ["web development", "HTML", "CSS"],
  },
  {
    ID: 12,
    Name: "Liam Smith",
    Title: "Content Writer",
    "Company name": "Content Creators",
    Phone: "555-7777",
    "Contact Location": "Orlando, FL",
    Employees: 25,
    Industry: "Media",
    Keywords: ["content writing", "blogging", "SEO"],
  },
  {
    ID: 13,
    Name: "Mia Brown",
    Title: "Product Designer",
    "Company name": "Creative Labs",
    Phone: "555-8888",
    "Contact Location": "San Diego, CA",
    Employees: 70,
    Industry: "Product Design",
    Keywords: ["product design", "innovation", "prototyping"],
  },
  {
    ID: 14,
    Name: "Noah Jones",
    Title: "Research Scientist",
    "Company name": "Science Innovations",
    Phone: "555-9999",
    "Contact Location": "Philadelphia, PA",
    Employees: 100,
    Industry: "Research",
    Keywords: ["research", "science", "experimentation"],
  },
  {
    ID: 15,
    Name: "Olivia Garcia",
    Title: "Social Media Manager",
    "Company name": "Social Buzz",
    Phone: "555-1010",
    "Contact Location": "Dallas, TX",
    Employees: 30,
    Industry: "Marketing",
    Keywords: ["social media", "marketing", "engagement"],
  },
  {
    ID: 16,
    Name: "Paul Rodriguez",
    Title: "Network Administrator",
    "Company name": "IT Services Co.",
    Phone: "555-2020",
    "Contact Location": "Houston, TX",
    Employees: 90,
    Industry: "IT Services",
    Keywords: ["networking", "IT support", "administration"],
  },
  {
    ID: 17,
    Name: "Quinn Lee",
    Title: "Quality Assurance Tester",
    "Company name": "QA Experts",
    Phone: "555-3030",
    "Contact Location": "Charlotte, NC",
    Employees: 50,
    Industry: "Software Testing",
    Keywords: ["quality assurance", "testing", "software"],
  },
  {
    ID: 18,
    Name: "Ryan Wilson",
    Title: "Customer Support Specialist",
    "Company name": "Support Solutions",
    Phone: "555-4040",
    "Contact Location": "Las Vegas, NV",
    Employees: 40,
    Industry: "Customer Service",
    Keywords: ["customer support", "service", "helpdesk"],
  },
  {
    ID: 19,
    Name: "Sophia Taylor",
    Title: "Digital Marketing Specialist",
    "Company name": "Digital Reach",
    Phone: "555-5050",
    "Contact Location": "Nashville, TN",
    Employees: 35,
    Industry: "Digital Marketing",
    Keywords: ["digital marketing", "SEO", "analytics"],
  },
  {
    ID: 20,
    Name: "Thomas Anderson",
    Title: "Cybersecurity Analyst",
    "Company name": "SecureTech",
    Phone: "555-6060",
    "Contact Location": "Baltimore, MD",
    Employees: 60,
    Industry: "Cybersecurity",
    Keywords: ["cybersecurity", "network security", "threat analysis"],
  },
  {
    ID: 21,
    Name: "Uma Patel",
    Title: "Blockchain Developer",
    "Company name": "Crypto Innovations",
    Phone: "555-7070",
    "Contact Location": "Columbus, OH",
    Employees: 20,
    Industry: "Blockchain",
    Keywords: ["blockchain", "development", "cryptocurrency"],
  },
  {
    ID: 22,
    Name: "Victor Kim",
    Title: "Supply Chain Manager",
    "Company name": "Supply Chain Experts",
    Phone: "555-8080",
    "Contact Location": "San Antonio, TX",
    Employees: 85,
    Industry: "Supply Chain",
    Keywords: ["supply chain", "logistics", "management"],
  },
  {
    ID: 23,
    Name: "Wendy Lewis",
    Title: "E-commerce Specialist",
    "Company name": "E-Shop Solutions",
    Phone: "555-9090",
    "Contact Location": "Portland, OR",
    Employees: 55,
    Industry: "E-commerce",
    Keywords: ["e-commerce", "online sales", "digital marketing"],
  },
  {
    ID: 24,
    Name: "Xander Hall",
    Title: "Game Developer",
    "Company name": "Gaming World",
    Phone: "555-0101",
    "Contact Location": "Seattle, WA",
    Employees: 90,
    Industry: "Gaming",
    Keywords: ["game development", "programming", "design"],
  },
  {
    ID: 25,
    Name: "Yara Green",
    Title: "Event Coordinator",
    "Company name": "Event Planners Co.",
    Phone: "555-1112",
    "Contact Location": "Miami, FL",
    Employees: 25,
    Industry: "Events",
    Keywords: ["event planning", "coordination", "management"],
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
