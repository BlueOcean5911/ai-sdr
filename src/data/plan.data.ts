export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    exportCredits: "10 Export Credits/Month",
    mobileCredits: "5 Mobile Number Credits/Year",
  },
  BASIC: {
    name: "Basic",
    price: 49,
    exportCredits: "1,000 Export Credits/Month",
    mobileCredits: "75 Mobile Number Credits/Month",
  },
  PROFESSIONAL: {
    name: "Professional",
    price: 79,
    exportCredits: "2000 Export Credits/Year",
    mobileCredits: "100 Mobile Number Credits/Year",
  },
  ORGANIZATION: {
    name: "Organization",
    price: 119,
    exportCredits: "4000 Export Credits/Year",
    mobileCredits: "200 Mobile Number Credits/Year",
  },
} as const;

export type PlanType = keyof typeof PLANS;
