import { api } from "@/utils/api";
import { ApiCountResponse, CountModel, FetchProps } from "@/types";
import { MAILING_STATE } from "@/types/enums";

interface FetchMailingsProps extends FetchProps {}

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
  fromEmail: string;
  toEmail: string;
  subject: string;
  bodyText?: string;
  bodyHtml?: string;
  scheduleAt?: string;
  templateId?: string;
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

interface ApiStatisticsResponse {
  data: MailingsStatistics;
}

export const getMailings = async (
  data: FetchMailingsProps = { offset: 0, limit: 100 }
): Promise<ApiMailingResponse> => {
  const response = await api.get(
    `/api/mailings?offset=${data.offset}&limit=${data.limit}`
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
