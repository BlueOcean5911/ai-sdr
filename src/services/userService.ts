import { api } from "@/utils/api";

export interface UserModel extends BaseUserModel {
  id?: string;
}

export interface BaseUserModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  title?: string;
}

interface ApiUserResponse {
  data?: UserModel;
}

export const getMe = async (data: undefined): Promise<ApiUserResponse> => {
  const response = await api.get("/api/users/me");
  return {
    data: {
      firstName: response.data?.firstName,
      lastName: response.data?.lastName,
      email: response.data?.email,
      title: response.data?.title,
      phone: response.data?.phone,
      id: response.data?.surrogateId,
    },
  };
};

export const updateUser = async (data: UserModel): Promise<ApiUserResponse> => {
  const response = await api.put("/api/users/me", data);
  return {
    data: {
      firstName: response.data?.firstName,
      lastName: response.data?.lastName,
      email: response.data?.email,
      title: response.data?.title,
      phone: response.data?.phone,
      id: response.data?.surrogateId,
    },
  };
};

export const updatePassword = async ({
  newPassword,
  oldPassword,
}: {
  newPassword: string;
  oldPassword: string;
}) => {
  const response = await api.put("/api/users/me/password", {
    oldPassword,
    newPassword,
  });
};
