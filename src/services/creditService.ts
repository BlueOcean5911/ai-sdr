import { api } from "@/utils/api";

export const getMyPlan = () => {
  return api.get("/api/credits/my-plan");
};