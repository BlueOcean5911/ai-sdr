import { api } from "@/utils/api";
import { CountModel, FetchProps } from "@/types";
import { EMAIL_STATUS } from "@/types/enums";
interface FetchLeadsProps extends FetchProps {}

interface ResponseLeadModel {
  id?: string; // Assuming surrogate_id is a string
  firstName: string;
  lastName: string;
  title?: string;
  email?: string;
  emailStatus?: string;
  phone?: string;
  phoneStatus?: string;
  linkedin?: string;
  companyId?: string;
  companyName?: string;
  companyLinkedin?: string;
  location?: string;
  clickCount?: number;
  replyCount?: number;
}

interface PostLeadModel {
  firstName?: string;
  lastName?: string;
  title?: string;
  email?: string;
  emailStatus?: EMAIL_STATUS;
  phone?: string;
  phoneStatus?: EMAIL_STATUS;
  linkedin?: string;
  companyId?: string; // Assuming company_id is a string
  location?: string;
  personalNote1?: string;
  personalNote2?: string;

  personaId?: string;
  ownerId?: string;
}

interface ApiLeadResponse {
  data: ResponseLeadModel; // The structure of the data returned from the API
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

export const addLead = async (lead: PostLeadModel) => {
  const response = await api.post("/api/leads", lead);
  if (response.status !== 200) {
    throw new Error("Failed to add lead");
  }
};
