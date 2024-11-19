import { api } from "@/utils/api";

export const createCheckOutSession = async (plan: any) => {
  const response = await api.post("/api/payments/create-stripe-session", {
    name: `${plan.name} Plan`,
    description: `Upgrade to ${plan.name} plan with ${plan.exportCredits}`,
    price: plan.price,
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    quantity: 1,
    metadata: {
      userId: "current-user-id",
      planType: plan.name,
    },
  });

  return response.data;
};

export const verifyStripeSession = async (sessionId: string) => {
  const response = await api.post("/api/payments/verify-stripe-session", {
    sessionId,
  });
  console.log("result: ", response.data);
  return response.data;
};
