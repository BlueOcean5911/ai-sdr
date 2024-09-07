import { api } from "@/utils/api";
import { runService } from "@/utils/service_utils";

export const getMe = async (data: undefined) => {
  return api.get("/api/users/me");
};
