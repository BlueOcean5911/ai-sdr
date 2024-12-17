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

export interface CallProps extends CallCreateProps {
  id: string;
}

interface ApiCallResponse {
  data: CallProps | null;
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
