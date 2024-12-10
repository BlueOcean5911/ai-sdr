export const PLANS = {
  FREE: {
    id: "Free",
    name: "Free",
    monthly: {
      priceId: "price_1QUOPRFDDG0Fe3Xz6TygzvNh",
      value: 0,
    },
    annually: {
      priceId: "price_1QUOPRFDDG0Fe3Xz6TygzvNh",
      value: 0,
    },
    exportCredits: "10 Export Credits/Month",
    mobileCredits: "5 Mobile Number Credits/Year",
  },
  BASIC: {
    id: "Basic",
    name: "Basic",
    monthly: {
      priceId: "price_1QUOIsFDDG0Fe3XzRBuJUim3",
      value: 59,
    },
    annually: {
      priceId: "price_1QUOItFDDG0Fe3XzHg0dI1jN",
      value: 49,
    },
    exportCredits: "1,000 Export Credits/Month",
    mobileCredits: "75 Mobile Number Credits/Month",
  },
  PROFESSIONAL: {
    id: "Professional",
    name: "Professional",
    monthly: {
      priceId: "price_1QUOKWFDDG0Fe3XzgkSulUjd",
      value: 99,
    },
    annually: {
      priceId: "price_1QUOKWFDDG0Fe3Xz2gKYAvSH",
      value: 79,
    },
    exportCredits: "2000 Export Credits/Year",
    mobileCredits: "100 Mobile Number Credits/Year",
  },
  ORGANIZATION: {
    id: "Organization",
    name: "Organization",
    monthly: {
      priceId: "price_1QUOMfFDDG0Fe3Xz9q7sCpmh",
      value: 149,
    },
    annually: {
      priceId: "price_1QUOMfFDDG0Fe3XzjgLpeCi4",
      value: 119,
    },
    exportCredits: "4000 Export Credits/Year",
    mobileCredits: "200 Mobile Number Credits/Year",
  },
} as const;

export type PlanType = keyof typeof PLANS;
