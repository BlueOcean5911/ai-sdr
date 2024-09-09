import { api } from "@/utils/api";

export const getMe = async (data: undefined) => {
  const response = await api.get("/api/users/me");
  return {
    data: {
      firstName: response.data?.first_name,
      lastName: response.data?.last_name,
      id: response.data?.surrogate_id,
    },
  };
};
