import { api } from "@/utils/api";

export interface UserModel extends BaseUserModel {
  id?: string;
}

export interface BaseUserModel {
  firstName?: string;
  lastName?: string;
  email?: string;
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
      email: response.data?.email,
      id: response.data?.surrogateId,
    },
  };
};
