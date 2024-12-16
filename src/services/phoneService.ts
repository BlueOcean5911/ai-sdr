import { api } from "@/utils/api";

export interface PhoneProps {
  id: string;
  phoneNumber: string;
}

interface ApiPhoneResponse {
  data: PhoneProps[];
}

export const getPhones = async (): Promise<ApiPhoneResponse> => {
  const response = await api.get(`/api/v1/phones`);
  return response;
};

export const setupPhone = async (
  phoneId: string
): Promise<ApiPhoneResponse> => {
  const response = await api.post(`/api/v1/phones/setup/${phoneId}`);
  return response;
};
