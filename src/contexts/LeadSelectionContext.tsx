import { LeadModelWithCompanyModel } from "@/services/leadService";
import { createContext, useContext, useState } from "react";

const defaultLeads = [
  {
    id: 1,
    name: "Alice Johnson",
    title: "Product Manager",
    companyName: "Tech Innovations LLC",
    phone: "555-1234",
    currentLocation: "New York, NY",
    employees: 150,
    industry: "Technology",
    keywords: ["product management", "technology", "innovation"],
  },
  {
    id: 2,
    name: "Bob Smith",
    title: "Software Engineer",
    companyName: "Dev Solutions Inc.",
    phone: "555-5678",
    currentLocation: "San Francisco, CA",
    employees: 75,
    industry: "Software Development",
    keywords: ["software engineering", "development", "coding"],
  },
  {
    id: 3,
    name: "Carol White",
    title: "Marketing Director",
    companyName: "Creative Marketing Co.",
    phone: "555-8765",
    currentLocation: "Chicago, IL",
    employees: 50,
    industry: "Marketing",
    keywords: ["marketing", "branding", "advertising"],
  },
  {
    id: 4,
    name: "David Brown",
    title: "Sales Executive",
    companyName: "Global Trade Corp.",
    phone: "555-4321",
    currentLocation: "Miami, FL",
    employees: 200,
    industry: "Wholesale",
    keywords: ["sales", "trade", "negotiation"],
  },
  {
    id: 5,
    name: "Eva Green",
    title: "HR Manager",
    companyName: "People First Ltd.",
    phone: "555-6789",
    currentLocation: "Austin, TX",
    employees: 30,
    industry: "Human Resources",
    keywords: ["human resources", "recruitment", "employee relations"],
  },
  {
    id: 6,
    name: "Frank Miller",
    title: "Chief Executive Officer",
    companyName: "Innovative Solutions Inc.",
    phone: "555-1111",
    currentLocation: "Seattle, WA",
    employees: 300,
    industry: "Consulting",
    keywords: ["leadership", "strategy", "consulting"],
  },
  {
    id: 7,
    name: "Grace Lee",
    title: "Data Analyst",
    companyName: "Data Insights LLC",
    phone: "555-2222",
    currentLocation: "Boston, MA",
    employees: 40,
    industry: "Data Science",
    keywords: ["data analysis", "statistics", "business intelligence"],
  },
  {
    id: 8,
    name: "Henry Wilson",
    title: "UX Designer",
    companyName: "Design Hub",
    phone: "555-3333",
    currentLocation: "Los Angeles, CA",
    employees: 60,
    industry: "Design",
    keywords: ["user experience", "design", "prototyping"],
  },
  {
    id: 9,
    name: "Isabella Martinez",
    title: "Financial Analyst",
    companyName: "Finance Pros",
    phone: "555-4444",
    currentLocation: "Denver, CO",
    employees: 80,
    industry: "Finance",
    keywords: ["finance", "analysis", "investment"],
  },
  {
    id: 10,
    name: "Jack Davis",
    title: "Operations Manager",
    companyName: "Logistics Solutions",
    phone: "555-5555",
    currentLocation: "Phoenix, AZ",
    employees: 150,
    industry: "Logistics",
    keywords: ["operations", "logistics", "supply chain"],
  },
  {
    id: 11,
    name: "Katherine Johnson",
    title: "Web Developer",
    companyName: "Web Creations",
    phone: "555-6666",
    currentLocation: "Atlanta, GA",
    employees: 45,
    industry: "Web Development",
    keywords: ["web development", "HTML", "CSS"],
  },
  {
    id: 12,
    name: "Liam Smith",
    title: "Content Writer",
    companyName: "Content Creators",
    phone: "555-7777",
    currentLocation: "Orlando, FL",
    employees: 25,
    industry: "Media",
    keywords: ["content writing", "blogging", "SEO"],
  },
  {
    id: 13,
    name: "Mia Brown",
    title: "Product Designer",
    companyName: "Creative Labs",
    phone: "555-8888",
    currentLocation: "San Diego, CA",
    employees: 70,
    industry: "Product Design",
    keywords: ["product design", "innovation", "prototyping"],
  },
  {
    id: 14,
    name: "Noah Jones",
    title: "Research Scientist",
    companyName: "Science Innovations",
    phone: "555-9999",
    currentLocation: "Philadelphia, PA",
    employees: 100,
    industry: "Research",
    keywords: ["research", "science", "experimentation"],
  },
  {
    id: 15,
    name: "Olivia Garcia",
    title: "Social Media Manager",
    companyName: "Social Buzz",
    phone: "555-1010",
    currentLocation: "Dallas, TX",
    employees: 30,
    industry: "Marketing",
    keywords: ["social media", "marketing", "engagement"],
  },
  {
    id: 16,
    name: "Paul Rodriguez",
    title: "Network Administrator",
    companyName: "IT Services Co.",
    phone: "555-2020",
    currentLocation: "Houston, TX",
    employees: 90,
    industry: "IT Services",
    keywords: ["networking", "IT support", "administration"],
  },
  {
    id: 17,
    name: "Quinn Lee",
    title: "Quality Assurance Tester",
    companyName: "QA Experts",
    phone: "555-3030",
    currentLocation: "Charlotte, NC",
    employees: 50,
    industry: "Software Testing",
    keywords: ["quality assurance", "testing", "software"],
  },
  {
    id: 18,
    name: "Ryan Wilson",
    title: "Customer Support Specialist",
    companyName: "Support Solutions",
    phone: "555-4040",
    currentLocation: "Las Vegas, NV",
    employees: 40,
    industry: "Customer Service",
    keywords: ["customer support", "service", "helpdesk"],
  },
  {
    id: 19,
    name: "Sophia Taylor",
    title: "Digital Marketing Specialist",
    companyName: "Digital Reach",
    phone: "555-5050",
    currentLocation: "Nashville, TN",
    employees: 35,
    industry: "Digital Marketing",
    keywords: ["digital marketing", "SEO", "analytics"],
  },
  {
    id: 20,
    name: "Thomas Anderson",
    title: "Cybersecurity Analyst",
    companyName: "SecureTech",
    phone: "555-6060",
    currentLocation: "Baltimore, MD",
    employees: 60,
    industry: "Cybersecurity",
    keywords: ["cybersecurity", "network security", "threat analysis"],
  },
  {
    id: 21,
    name: "Uma Patel",
    title: "Blockchain Developer",
    companyName: "Crypto Innovations",
    phone: "555-7070",
    currentLocation: "Columbus, OH",
    employees: 20,
    industry: "Blockchain",
    keywords: ["blockchain", "development", "cryptocurrency"],
  },
  {
    id: 22,
    name: "Victor Kim",
    title: "Supply Chain Manager",
    companyName: "Supply Chain Experts",
    phone: "555-8080",
    currentLocation: "San Antonio, TX",
    employees: 85,
    industry: "Supply Chain",
    keywords: ["supply chain", "logistics", "management"],
  },
  {
    id: 23,
    name: "Wendy Lewis",
    title: "E-commerce Specialist",
    companyName: "E-Shop Solutions",
    phone: "555-9090",
    currentLocation: "Portland, OR",
    employees: 55,
    industry: "E-commerce",
    keywords: ["e-commerce", "online sales", "digital marketing"],
  },
  {
    id: 24,
    name: "Xander Hall",
    title: "Game Developer",
    companyName: "Gaming World",
    phone: "555-0101",
    currentLocation: "Seattle, WA",
    employees: 90,
    industry: "Gaming",
    keywords: ["game development", "programming", "design"],
  },
  {
    id: 25,
    name: "Yara Green",
    title: "Event Coordinator",
    companyName: "Event Planners Co.",
    phone: "555-1112",
    currentLocation: "Miami, FL",
    employees: 25,
    industry: "Events",
    keywords: ["event planning", "coordination", "management"],
  },
];

export const LeadSelectionContext = createContext<any>(undefined);

export const LeadSelectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [totalLeads, setTotalLeads] = useState<LeadModelWithCompanyModel[]>([]);
  const [savedLeads, setSavedLeads] = useState<LeadModelWithCompanyModel[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<
    LeadModelWithCompanyModel[]
  >([]);

  const handleSaveLeads = (leads: LeadModelWithCompanyModel[]) => {
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
    throw new Error(
      "useLeadSelection must be used within an LeadSelectionProvider"
    );
  }
  return context;
};
