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
  direction: boolean;
  user: string;
  userPhone: string;
  contact: string;
  contactPhone: string;
  time: string;
  date: string;
  state: string;
  duration: string;
  purpose: string;
  disposition: string;
  note: string;
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
