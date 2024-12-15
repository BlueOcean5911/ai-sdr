import { ApiSuccessResponse, SuccessModel } from "@/types";
import { api } from "@/utils/api";

export interface UserModel extends BaseUserModel {
  id?: string;
  fullName?: string;
}

export interface BaseUserModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  title?: string;
  enabled?: boolean;
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
      enabled: response.data?.enabled,
      id: response.data?.id,
    },
  };
};

export const getUsers = async (data: undefined): Promise<ApiUserResponse> => {
  const response = await api.get("/api/users");
  return {
    data: response.data?.map((user: any) => ({
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      title: user?.title,
      phone: user?.phone,
      enabled: user?.enabled,
    })),
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
      enabled: response.data?.enabled,
      id: response.data?.id,
    },
  };
};

export const updateOther = async (
  data: UserModel
): Promise<ApiUserResponse> => {
  const response = await api.put(`/api/users/${data.id}`, data);
  return {
    data: {
      firstName: response.data?.firstName,
      lastName: response.data?.lastName,
      email: response.data?.email,
      title: response.data?.title,
      phone: response.data?.phone,
      enabled: response.data?.enabled,
      id: response.data?.id,
    },
  };
};

export const updatePassword = async ({
  newPassword,
  oldPassword,
}: {
  newPassword: string;
  oldPassword: string;
}): Promise<ApiSuccessResponse> => {
  return await api.put("/api/users/me/password", {
    oldPassword,
    newPassword,
  });
};

export const sendInviteLink = async (props: { email: string }) => {
  const { email } = props;
  const data = { email };
  return await api.post("/api/users/invite", data);
};

export const deleteUser = async (
  userId: string
): Promise<ApiSuccessResponse> => {
  const response = await api.delete(`/api/users/${userId}`);
  return {
    data: { success: response.data.success },
  };
};
