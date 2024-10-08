import { ApiSuccessResponse } from "@/types";
import { api } from "@/utils/api";

export const deleteCadenceState = async ({
  id,
}: {
  id: string;
}): Promise<ApiSuccessResponse> => {
  return await api.delete(`/api/cadenceStates/${id}`);
};
