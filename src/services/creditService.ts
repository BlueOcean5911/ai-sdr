import { api } from "@/utils/api";

export interface UpdateCreditModel {
  emailReg: number;
  emailExt: number;
  mobileReg: number;
  mobileExt: number;
}

export const getMyPlan = () => {
  return api.get("/api/credits/my-plan");
};

export const updateCredit = async (data: {
  creditId: string;
  updateData: UpdateCreditModel;
}) => {
  const { creditId, updateData } = data;
  // console.log("send credit", updateData);
  const response = await api.put(`api/credits/${creditId}`, updateData);
  // console.log("send credit", response.data);
  if (response.status !== 200) {
    throw new Error("Failed to update credit");
  }

  return {
    data: response.data,
  };
};
