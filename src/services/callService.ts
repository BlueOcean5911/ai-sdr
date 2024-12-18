import { CALL_STATE, USER_CALL_TYPE } from "@/types/enums";
import { api } from "@/utils/api";

export interface CallCreateProps {
  callDispositionId?: string;
  callPurposeId?: string;
  fromPhoneNumber: string;
  note?: string;
  opportunityId?: string;
  outbound: boolean;
  shouldRecordCall?: boolean;
  toPhoneNumber: string;
  userCallType?: USER_CALL_TYPE;
  state: CALL_STATE;

  leadId?: string;
  cadenceId?: string;
  cadenceStepId?: string;
  cadenceStateId?: string;
  taskId?: string;

  callSid?: string;
  recordingUrl?: string;
}

export interface CallProps {
  id: string;
  callDispositionId: string;
  callPurposeId: string;
  fromPhoneNumber: string;
  note: string;
  outbound: string;
  toPhoneNumber: string;
  userCallType?: USER_CALL_TYPE;
  state: CALL_STATE;

  leadId?: string;
  leadFirstName?: string;
  leadLastName?: string;
  userId?: string;
  userFirstName?: string;
  userLastName?: string;

  cadenceId?: string;
  cadenceName?: string;
  cadenceStepId?: string;
  currentCadenceStep?: string;
  taskId?: string;
  taskTitle?: string;

  callDispositionName: string;
  callPurposeName: string;

  createdAt: string;
}

export interface CallStatistics {
  total?: number;
  no_answer?: number;
  busy?: number;
  left_voicemail?: number;
  gatekeeper?: number;
  bad_number?: number;
  connected_positive?: number;
  connected_neutral?: number;
  connected_negative?: number;
}

interface ApiCallResponse {
  data: CallProps | null;
}

interface ApiCallsResponse {
  data: CallProps[] | [];
}

export const addCall = async (
  data: CallCreateProps
): Promise<ApiCallResponse> => {
  try {
    const response = await api.post("api/v1/calls", data);
    console.log("call data after adding", response);
    return response;
  } catch (error) {
    console.log(error);
    return { data: null };
  }
};

export const getCalls = async (): // data: CallFetchProps
Promise<ApiCallsResponse> => {
  try {
    const response = await api.get("api/v1/calls");
    console.log("calls data", response.data);
    return response;
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
};
