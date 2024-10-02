import { api } from "@/utils/api";
import {
  ApiCountResponse,
  CountModel,
  FetchProps,
  PersonalizedSettingModel,
} from "@/types";
import { MAILING_STATE } from "@/types/enums";

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
  scheduledAt: string;
  leadId: string;
  leadName: string;
  ownerId: string;
  ownerName: string;
  cadenceId: string;
  cadenceName: string;
  currentCadenceStep: number;
}

export interface SendMailingModel {
  leadId: string;
  ownerId: string;
  fromEmail: string;
  toEmail: string;
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
  notSentCount?: number;
  bouncedCount?: number;
  notOpenedCount?: number;
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

export const getMailingsStatistics =
  async (): Promise<ApiStatisticsResponse> => {
    const response = await api.get(`api/mailings/statistics`);
    console.log(response);
    return {
      data: response.data,
    };
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

export const sendMailing = async (id: string) => {
  const response = await api.post(`api/mailings/send/${id}`);

  if (response.status !== 200) {
    throw new Error("Failed to send email");
  }
};

export const generateEmail = async (setting: PersonalizedSettingModel) => {
  return await api.post("api/mailing/generate", setting);
};
