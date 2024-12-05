import { api } from "@/utils/api";
import { ApiCountResponse, FetchProps } from "@/types";
import { MAILING_STATE } from "@/types/enums";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

interface FetchCallsProps extends FetchProps {
  campaignId?: string;
  cadenceId?: string;
  fromEmail?: Option | Option[] | null;
  fromUser?: Option | Option[] | null;
  search?: string;
  params: { [key: string]: string };
}

export interface CallModel extends BaseCallModel {
  id: string;
}

export interface BaseCallModel {
  sid: string;
  date_created: string; // ISO 8601 format
  date_updated: string; // ISO 8601 format
  parent_call_sid?: string | null; // Optional
  account_sid: string;
  to?: string; // Optional
  to_formatted?: string; // Optional
  from_: string; // 'from_' is a valid identifier in TypeScript
  from_formatted: string;
  phone_number_sid?: string | null; // Optional
  status: string;
  start_time: string; // ISO 8601 format
  end_time: string; // ISO 8601 format
  duration: string; // duration in seconds as a string
  price: number; // price in the specified unit
  price_unit: string; // e.g., "USD"
  direction: string;
  answered_by?: string | null; // Optional
  api_version?: string; // Optional
  forwarded_from?: string | null; // Optional
  group_sid?: string | null; // Optional
  caller_name?: string | null; // Optional
  queue_time?: string; // Optional
  trunk_sid?: string; // Optional
  uri?: string; // Optional
  // subresource_uris: {
  //   notifications: string;
  //   user_defined_messages: string;
  //   transcriptions: string;
  //   recordings: string;
  //   streams: string;
  //   payments: string;
  //   user_defined_message_subscriptions: string;
  //   siprec: string;
  //   events: string;
  // };
  recording_url?: string; // Optional
  transcription_text?: string | null; // Optional
  solution?: string | null; // Optional
  context?: string | null; // Optional
  orgId?: string | null; // Optional
}

export interface SendCallModel {
  leadId: string;
  ownerId: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  bodyText?: string;
  bodyHtml?: string;
  scheduleAt?: string;
  templateId?: string;
  callStatus?: MAILING_STATE;
}

export interface CallStatistics {
  total?: number;
  active?: number;
  no_answer?: number;
  left_voicemail?: number;
  busy?: number;
  gatekeeper?: number;
  connected?: number;
  no_deposition?: number;
}

interface ApiCallResponse {
  data: CallModel;
}

interface ApiCallsResponse {
  data: CallModel[];
}

interface ApiStatisticsResponse {
  data: CallStatistics;
}

export const getCalls = async (
  data: FetchCallsProps = { offset: 0, limit: 100, params: {} }
): Promise<ApiCallsResponse> => {
  let url = `/api/calls`;
  // let url = `/api/calls?offset=${data.offset}&limit=${data.limit}`;
  // //  get search params from current params
  // const keys = Object.keys(data.params);
  // let searchParams = "";

  // if (keys.length > 0) {
  //   searchParams =
  //     "&" + keys.map((key) => `${key}=${data.params[key]}`).join("&");
  // }
  // if (data.campaignId) {
  //   url += `&campaignId=${data.campaignId}`;
  // }
  // if (data.cadenceId) {
  //   url += `&cadenceId=${data.cadenceId}`;
  // }
  // let userIds: string[] = [];
  // if (Array.isArray(data.fromUser)) {
  //   userIds = data.fromUser.map((option) => option.value);
  // } else if (data.fromUser) {
  //   userIds = [data.fromUser.value];
  // } else {
  //   userIds = [];
  // }
  // for (const userId of userIds) {
  //   url += `&fromUser=${userId}`;
  // }
  // if (data.search) {
  //   url += `&search=${data.search}`;
  // }
  // if (searchParams) {
  //   url += searchParams;
  // }
  const response = await api.get(url);

  return {
    data: response.data,
  };
};

export const getCallTotalCount = async (
  data: FetchCallsProps = { params: {} }
): Promise<ApiCountResponse> => {
  let url = `/api/calls/statistics/total-count?`;
  //  get search params from current params
  const keys = Object.keys(data.params);
  let searchParams = "";

  if (keys.length > 0) {
    searchParams =
      "&" + keys.map((key) => `${key}=${data.params[key]}`).join("&");
  }
  if (data.campaignId) {
    url += `&campaignId=${data.campaignId}`;
  }
  if (data.cadenceId) {
    url += `&cadenceId=${data.cadenceId}`;
  }
  let userIds: string[] = [];
  if (Array.isArray(data.fromUser)) {
    userIds = data.fromUser.map((option) => option.value);
  } else if (data.fromUser) {
    userIds = [data.fromUser.value];
  } else {
    userIds = [];
  }
  for (const userId of userIds) {
    url += `&fromUser=${userId}`;
  }
  if (data.search) {
    url += `&search=${data.search}`;
  }
  if (searchParams) {
    url += searchParams;
  }
  const response = await api.get(url);

  return {
    data: {
      count: response.data?.count,
    },
  };
};

export const getCallStatistics = async (): Promise<ApiStatisticsResponse> => {
  const response = await api.get(`api/calls/statistics`);
  console.log(response);
  return {
    data: response.data,
  };
};

export const addCall = async (call: SendCallModel) => {
  console.log("call data", call);
  const response = await api.post("api/calls", call);
  console.log("send call", response.data);
  if (response.status !== 200) {
    throw new Error("Failed to create call");
  }

  return {
    data: {
      id: response.data.surrogateId,
    },
  };
};

export const sendCall = async (id: string) => {
  const response = await api.post(`api/calls/send/${id}`);

  if (response.status !== 200) {
    throw new Error("Failed to send email");
  }
};
