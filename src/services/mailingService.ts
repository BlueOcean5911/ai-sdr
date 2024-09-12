import { api } from "@/utils/api";
import { ApiCountResponse, CountModel, FetchProps } from "@/types";
import { MAILING_STATE } from "@/types/enums";

interface FetchMailingsProps extends FetchProps {
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
  const { offset, limit, params } = data;
  //  get search params from current params
  const keys = Object.keys(params);
  let searchParams = "";

  if (keys.length > 0) {
    searchParams = "&" + keys.map((key) => `${key}=${params[key]}`).join("&");
  }

  const response = await api.get(
    `/api/mailings?offset=${offset}&limit=${limit}${searchParams}`
  );
  return {
    data: response.data,
  };
};

export const getMailingTotalCount = async (): Promise<ApiCountResponse> => {
  const response = await api.get(`/api/mailings/total-count`);
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
  const response = await api.post("api/mailings", mailing);

  if (response.status !== 200) {
    throw new Error("Failed to create mailing");
  }
};
