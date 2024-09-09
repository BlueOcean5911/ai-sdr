import { api } from "@/utils/api";

interface FetchLeadsProps {
  offset?: number;
  limit?: number;
}

interface Lead {
  id?: string; // Assuming surrogate_id is a string
  name: string;
  title?: string;
  email?: string;
  emailStatus?: string;
  phone?: string;
  phoneStatus?: string;
  linkedinURL?: string;
  companyID?: string;
  companyName?: string;
  companyLinkedin?: string;
  location?: string;
  clickCount?: number;
  replyCount?: number;
}

interface ApiResponse {
  data: Lead; // The structure of the data returned from the API
}

export const getLeads = async (
  data: FetchLeadsProps = { offset: 0, limit: 100 }
): Promise<ApiResponse> => {
  const response = await api.get(
    `/api/leads?offset=${data.offset}&limit=${data.limit}`
  );
  return {
    data: {
      id: response.data?.surrogate_id,
      name: response.data.first_name + " " + response.data.last_name,
      title: response.data?.title,
      email: response.data?.email,
      emailStatus: response.data?.email_status,
      phone: response.data?.phone,
      phoneStatus: response.data?.phone_status,
      linkedinURL: response.data?.linkedin_url,
      // TODO: Check company name
      companyID: response.data?.company_id,
      companyName: response.data?.company?.name,
      companyLinkedin: response.data?.company?.linkedin,
      location: response.data?.location,
      clickCount: response.data?.click_count,
      replyCount: response.data?.reply_count,
    },
  };
};
