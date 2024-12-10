import { api } from "@/utils/api";

export const createCheckOutSession = async (plan: any) => {
  const response = await api.post("/api/payments/create-stripe-session", {
    price: plan.price,
    quantity: plan.quantity,
  });

  return response.data;
};
