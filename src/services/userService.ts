import { api } from "@/utils/api";

interface UserModel extends BaseUserModel {
  id?: string;
}

interface BaseUserModel {
  firstName?: string;
  lastName?: string;
}

interface ApiUserResponse {
  data?: UserModel;
}

export const getMe = async (data: undefined): Promise<ApiUserResponse> => {
  const response = await api.get("/api/users/me");
  return {
    data: {
      firstName: response.data?.firstName,
      lastName: response.data?.firstName,
      id: response.data?.surrogateId,
    },
  };
};
