import { ApiCountResponse, ApiSuccessResponse, FetchProps } from "@/types";
import { CALL_STATE, USER_CALL_TYPE } from "@/types/enums";
import { api } from "@/utils/api";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

interface FetchCallsProps extends FetchProps {
  fromUser?: Option | Option[] | null;
  states?: Option | Option[] | null;
  purposes?: Option | Option[] | null;
  dispositions?: Option | Option[] | null;
  fromDate?: string;
  toDate?: string;
  orderBy?: string;
  isAscending?: boolean | undefined;
  search?: string;
  params: { [key: string]: string };
}

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
  duration: number;
}

export interface CallUpdate {
  callDispositionId: string;
  callPurposeId: string;
  fromPhoneNumber: string;
  note: string;
}

export interface CallStatistics {
  [key: string]: number | string;
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

export const getCalls = async (
  data: FetchCallsProps = { offset: 0, limit: 100, params: {} }
): // data: CallFetchProps
Promise<ApiCallsResponse> => {
  let url = `/api/v1/calls?offset=${data.offset}&limit=${data.limit}`;

  // const keys = Object.keys(data.params);
  // let searchParams = "";

  // if (keys.length > 0) {
  //   searchParams =
  //     "&" + keys.map((key) => `${key}=${data.params[key]}`).join("&");
  // }
  let userIds: string[] = [];
  if (Array.isArray(data.fromUser)) {
    userIds = data.fromUser.map((option) => option.value);
  } else if (data.fromUser) {
    userIds = [data.fromUser.value];
  } else {
    userIds = [];
  }
  for (const userId of userIds) {
    url += `&userIds=${userId}`;
  }

  // // ------------ State
  let states: string[] = [];
  if (Array.isArray(data.states)) {
    states = data.states.map((option) => option.value);
  } else if (data.states) {
    states = [data.states.value];
  } else {
    states = [];
  }
  for (const state of states) {
    url += `&states=${state}`;
  }
  // ------------ State
  // ------------ Purposes
  let purposes: string[] = [];
  if (Array.isArray(data.purposes)) {
    purposes = data.purposes.map((option) => option.value);
  } else if (data.purposes) {
    purposes = [data.purposes.value];
  } else {
    purposes = [];
  }
  for (const state of purposes) {
    url += `&purposes=${state}`;
  }
  // ------------ Purposes
  // // ------------ Dispositions
  let dispositions: string[] = [];
  if (Array.isArray(data.dispositions)) {
    dispositions = data.dispositions.map((option) => option.value);
  } else if (data.dispositions) {
    dispositions = [data.dispositions.value];
  } else {
    dispositions = [];
  }
  for (const state of dispositions) {
    url += `&dispositions=${state}`;
  }
  // // ------------ Dispositions

  // // ---------- From Date
  // if (data.fromDate) {
  //   url += `&fromDate=${data.fromDate}`;
  // }
  // if (data.toDate) {
  //   url += `&toDate=${data.toDate}`;
  // }
  // // ---------- From Date
  // if (data.orderBy) {
  //   url += `&orderBy=${data.orderBy}`;
  // }
  // if (data.isAscending !== undefined) {
  //   url += `&isAscending=${data.isAscending}`;
  // }
  // if (data.search) {
  //   url += `&search=${data.search}`;
  // }
  // if (searchParams) {
  //   url += searchParams;
  // }
  console.log("url", url);
  const response = await api.get(url);

  return {
    data: response.data,
  };
};

export const getCallTotalCount = async (
  data: FetchCallsProps = { offset: 0, limit: 100, params: {} }
): Promise<ApiCountResponse> => {
  let url = `/api/v1/calls/total-count?`;
  let userIds: string[] = [];
  if (Array.isArray(data.fromUser)) {
    userIds = data.fromUser.map((option) => option.value);
  } else if (data.fromUser) {
    userIds = [data.fromUser.value];
  } else {
    userIds = [];
  }
  for (const userId of userIds) {
    url += `&userIds=${userId}`;
  }

  // // ------------ State
  let states: string[] = [];
  if (Array.isArray(data.states)) {
    states = data.states.map((option) => option.value);
  } else if (data.states) {
    states = [data.states.value];
  } else {
    states = [];
  }
  for (const state of states) {
    url += `&states=${state}`;
  }
  // ------------ State
  // ------------ Purposes
  let purposes: string[] = [];
  if (Array.isArray(data.purposes)) {
    purposes = data.purposes.map((option) => option.value);
  } else if (data.purposes) {
    purposes = [data.purposes.value];
  } else {
    purposes = [];
  }
  for (const state of purposes) {
    url += `&purposes=${state}`;
  }
  // ------------ Purposes
  // // ------------ Dispositions
  let dispositions: string[] = [];
  if (Array.isArray(data.dispositions)) {
    dispositions = data.dispositions.map((option) => option.value);
  } else if (data.dispositions) {
    dispositions = [data.dispositions.value];
  } else {
    dispositions = [];
  }
  for (const state of dispositions) {
    url += `&dispositions=${state}`;
  }
  console.log("url", url);
  const response = await api.get(url);

  return {
    data: {
      count: response.data?.count,
    },
  };
};

export const getCallStatistics = async (): Promise<any> => {
  try {
    const response = await api.get("api/v1/calls/statistics");
    return response;
  } catch (error) {
    console.log(error);
    return { data: {} };
  }
};

export const updateCall = async ({
  id,
  data,
}: {
  id: string;
  data: CallUpdate;
}): Promise<ApiCallResponse> => {
  const response = await api.put(`api/v1/calls/${id}`, data);
  return {
    data: response.data,
  };
};

export const deleteCall = async ({
  id,
}: {
  id: string;
}): Promise<ApiSuccessResponse> => {
  return await api.delete(`api/v1/calls/${id}`);
};
