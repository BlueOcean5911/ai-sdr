import { api } from "@/utils/api";
import { ApiCountResponse, FetchProps } from "@/types";
import { MAILING_STATE } from "@/types/enums";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

interface FetchTasksProps extends FetchProps {
  campaignId?: string;
  cadenceId?: string;
  fromEmail?: Option | Option[] | null;
  fromUser?: Option | Option[] | null;
  search?: string;
  params: { [key: string]: string };
}

export interface TaskModel extends BaseTaskModel {
  id: string;
}

export interface BaseTaskModel {
  contacts: string;
  assignee: string;
  type: string;
  priority: string;
  dueDate: string;
  note: string;
}

export interface SendTaskModel {
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

export interface TasksStatistics {
  total?: number;
  action?: number;
  email?: number;
  call?: number;
  meet?: number;
  linkedin?: number;
}

interface ApiTaskResponse {
  data: TaskModel;
}

interface ApiTasksResponse {
  data: TaskModel[];
}

interface ApiStatisticsResponse {
  data: TasksStatistics;
}

export const getTasks = async (
  data: FetchTasksProps = { offset: 0, limit: 100, params: {} }
): Promise<ApiTasksResponse> => {
  let url = `/api/calls?offset=${data.offset}&limit=${data.limit}`;
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
    data: response.data,
  };
};

export const getTaskTotalCount = async (
  data: FetchTasksProps = { params: {} }
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

export const getTasksStatistics = async (): Promise<ApiStatisticsResponse> => {
  const response = await api.get(`api/calls/statistics`);
  console.log(response);
  return {
    data: response.data,
  };
};

export const addTask = async (call: SendTaskModel) => {
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

export const sendTask = async (id: string) => {
  const response = await api.post(`api/calls/send/${id}`);

  if (response.status !== 200) {
    throw new Error("Failed to send email");
  }
};
