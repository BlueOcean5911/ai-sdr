import { api } from "@/utils/api";
import { CountModel, FetchProps } from "@/types";
import { EMAIL_STATUS } from "@/types/enums";
interface FetchLeadsProps extends FetchProps {}

interface LeadModel extends BaseLeadModel {
  id?: string;
  companyName?: string;
  companyLinkedin?: string;
  clickCount?: number;
  replyCount?: number;
}

interface BaseLeadModel {
  firstName?: string;
  lastName?: string;
  title?: string;
  email?: string;
  emailStatus?: EMAIL_STATUS;
  phone?: string;
  phoneStatus?: EMAIL_STATUS;
  linkedin?: string;
  location?: string;
  personalNote1?: string;
  personalNote2?: string;

  companyId?: string;
  personaId?: string;
  ownerId?: string;

  targeted?: string;
}

interface ApiLeadResponse {
  data: LeadModel; // The structure of the data returned from the API
}

interface ApiCountResponse {
  data: CountModel; // The structure of the data returned from the API;
}

export const getLeads = async (
  data: FetchLeadsProps = { offset: 0, limit: 100 }
): Promise<ApiLeadResponse> => {
  const response = await api.get(
    `/api/leads?offset=${data.offset}&limit=${data.limit}`
  );
  return {
    data: {
      id: response.data?.surrogateId,
      firstName: response.data?.firstName,
      lastName: response.data?.lastName,
      title: response.data?.title,
      email: response.data?.email,
      emailStatus: response.data?.emailStatus,
      phone: response.data?.phone,
      phoneStatus: response.data?.phoneStatus,
      linkedin: response.data?.linkedin,
      companyId: response.data?.companyId,
      companyName: response.data?.company?.name,
      companyLinkedin: response.data?.company?.linkedin,
      location: response.data?.location,
      clickCount: response.data?.clickCount,
      replyCount: response.data?.replyCount,
      targeted: response.data?.targeted,
    },
  };
};

export const getLeadTotalCount = async (): Promise<ApiCountResponse> => {
  const response = await api.get(`/api/leads/total-count`);
  return {
    data: {
      count: response.data?.count,
    },
  };
};

export const addLead = async (lead: BaseLeadModel) => {
  const response = await api.post("/api/leads", lead);
  if (response.status !== 200) {
    throw new Error("Failed to add lead");
  }
};
