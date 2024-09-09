import { api } from "@/utils/api";

export const getMe = async (data: undefined) => {
  const response = await api.get("/api/users/me");
  return {
    data: {
      firstName: response.data?.firstName,
      lastName: response.data?.firstName,
      id: response.data?.surrogateId,
    },
  };
};
