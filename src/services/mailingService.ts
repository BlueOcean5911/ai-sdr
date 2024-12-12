import { api } from "@/utils/api";
import {
  ApiCountResponse,
  CountModel,
  FetchProps,
  PersonalizedSettingModel,
} from "@/types";
import { LEAD_STAGE, MAILING_STATE } from "@/types/enums";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

interface FetchMailingsProps extends FetchProps {
  campaignId?: string;
  cadenceId?: string;
  fromEmail?: Option | Option[] | null;
  fromUser?: Option | Option[] | null;
  orderBy?: string;
  isAscending?: boolean | undefined;
  search?: string;
  params: { [key: string]: string };
}

// interface MailingModel extends BaseMailingModel {
//   id?: string;
// }

export interface MailingModel {
  id: string;
  subject: string;
  message: string;
  mailingStatus: MAILING_STATE; // Assuming MAILING_STATE is an enum or type
  leadId: string;
  leadName: string;
  leadStage: LEAD_STAGE;
  ownerId: string;
  ownerName: string;
  cadenceId: string;
  cadenceStateId?: string;
  cadenceName: string;
  currentCadenceStep: number;

  fromEmail: string;
  toEmail: string;
  threadId: string;
  messageId: string;

  scheduledAt: string;
  deliveredAt: string;
  openedAt: string;
  repliedAt: string;
  bouncedAt: string;
  stateChangedAt: string;
}

export interface SendMailingModel {
  leadId: string;
  ownerId: string;
  fromEmail: string;
  toEmail: string;
  threadId: string;
  parentMessageId: string;
  subject: string;
  bodyText?: string;
  bodyHtml?: string;
  scheduleAt?: string;
  templateId?: string;
  mailingStatus?: MAILING_STATE;
}

export interface MailingsStatistics {
  totalCount?: number;
  draftedCount?: number;
  scheduledCount?: number;
  deliveredCount?: number;
  bouncedCount?: number;
  openedCount?: number;
  repliedCount?: number;
  interestedCount?: number;
}

interface ApiMailingResponse {
  data: MailingModel;
}

interface ApiMailingsResponse {
  data: MailingModel[];
}

interface ApiStatisticsResponse {
  data: MailingsStatistics;
}

export const getMailings = async (
  data: FetchMailingsProps = { offset: 0, limit: 100, params: {} }
): Promise<ApiMailingsResponse> => {
  let url = `/api/mailings?offset=${data.offset}&limit=${data.limit}`;
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
  if (data.orderBy) {
    url += `&orderBy=${data.orderBy}`;
  }
  if (data.isAscending !== undefined) {
    url += `&isAscending=${data.isAscending}`;
  }
  if (data.search) {
    url += `&search=${data.search}`;
  }
  if (searchParams) {
    url += searchParams;
  }
  const response = await api.get(url);
  console.log(response);
  return {
    data: response.data,
  };
};

export const getMailingTotalCount = async (
  data: FetchMailingsProps = { params: {} }
): Promise<ApiCountResponse> => {
  let url = `/api/mailings/statistics/total-count?`;
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

export const getMailingsStatistics = async (
  data: FetchMailingsProps = { params: {} }
): Promise<ApiStatisticsResponse> => {
  let url = `/api/mailings/statistics?`;
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

  return response;
};

export const addMailing = async (mailing: SendMailingModel) => {
  console.log("mailing data", mailing);
  const response = await api.post("api/mailings", mailing);
  console.log("send mailing", response.data);
  if (response.status !== 200) {
    throw new Error("Failed to create mailing");
  }

  return {
    data: {
      id: response.data.id,
    },
  };
};

export const sendMailing = async ({
  id,
  cadenceStateId,
}: {
  id: string;
  cadenceStateId?: string;
}) => {
  let url = `api/mailings/send/${id}`;
  if (cadenceStateId) {
    url += `?cadenceStateId=${cadenceStateId}`;
  }
  const response = await api.post(url);

  if (response.status !== 200) {
    throw new Error("Failed to send email");
  }

  return response;
};

export const generateEmail = async (setting: PersonalizedSettingModel) => {
  console.log("generate email data", setting);
  return await api.post("api/mailings/generate", setting);
};

export const deleteManualMailing = async (mailingId: string) => {
  const response = await api.delete(
    `api/v2/mailings/delete-manual-email/${mailingId}`
  );
  if (response.status !== 200) {
    throw new Error("Failed to delete mailing");
  }
  return response;
};

export const deleteMailingInCadence = async (mailingId: string) => {
  const response = await api.delete(
    `api/v2/mailings/delete-mailing-and-finish-cadence/${mailingId}`
  );
  if (response.status !== 200) {
    throw new Error("Failed to delete mailing");
  }
  return response;
};

export const skipMailingInCadence = async (mailingId: string) => {
  const response = await api.post(
    `api/v2/mailings/skip-sending-email-in-cadence/${mailingId}`
  );
  if (response.status !== 200) {
    throw new Error("Failed to skip mailing");
  }
  return response;
};
