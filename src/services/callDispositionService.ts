import { CALL_STATE } from "@/types/enums";
import { api } from "@/utils/api";

export interface CallDispositionBase {
  id: string;
  name: string;
  order: number;
  callState: CALL_STATE;
}
export interface CallDispositionModel extends CallDispositionBase {}
export interface CallDispositionCreate extends CallDispositionBase {}
export interface CallDispositionUpdate extends CallDispositionBase {}

interface ApiCallDispositionResponse {
  data: CallDispositionBase;
}

export const getCallDispositions =
  async (): Promise<ApiCallDispositionResponse> => {
    const response = await api.get("api/v1/call-dispositions");
    console.log("call disposition data", response);
    return response;
  };
