import { CALL_STATE } from "@/types/enums";
import { api } from "@/utils/api";

export interface CallPurposeBase {
  id: string;
  name: string;
  order: number;
  callState: CALL_STATE;
}
export interface CallPurposeModel extends CallPurposeBase {}
export interface CallPurposeCreate extends CallPurposeBase {}
export interface CallPurposeUpdate extends CallPurposeBase {}

interface ApiCallPurposeResponse {
  data: CallPurposeBase;
}

export const getCallPurposes = async (): Promise<ApiCallPurposeResponse> => {
  const response = await api.get("api/v1/call-purposes");
  console.log("call purpose data", response);
  return response;
};
