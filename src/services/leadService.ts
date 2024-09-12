import { api } from "@/utils/api";
import { CountModel, FetchProps } from "@/types";
import { EMAIL_STATUS } from "@/types/enums";
import { CompanyModel } from "./companyService";
interface FetchLeadsProps extends FetchProps {
  targeted?: boolean;
}

export interface LeadModel extends BaseLeadModel {
  id: string;
}

export interface LeadModelWithCompanyModel extends LeadModel {
  company?: CompanyModel;
}

export interface BaseLeadModel {
  firstName?: string;
  lastName?: string;
  title?: string;
  email?: string;
  emailStatus?: EMAIL_STATUS | string;
  phone?: string;
  phoneStatus?: EMAIL_STATUS | string;
  linkedin?: string;
  location?: string;
  personalNote1?: string;
  personalNote2?: string;

  companyId?: string;
  personaId?: string;
  ownerId?: string;

  clickCount?: number;
  replyCount?: number;

  targeted?: boolean;
}

interface ApiLeadResponse {
  data: Array<LeadModelWithCompanyModel>; // The structure of the data returned from the API
}

interface ApiCountResponse {
  data: CountModel; // The structure of the data returned from the API;
}

export const addLead = async (lead: BaseLeadModel) => {
  const response = await api.post("/api/leads", lead);
  if (response.status !== 200) {
    throw new Error("Failed to add lead");
  }
  console.log("response", response);
  return {
    data: {
      id: response?.data?.surrogateId,
      firstName: response?.data?.firstName,
      lastName: response?.data?.lastName,
      title: response?.data?.title,
      email: response?.data?.email,
      emailStatus: response?.data?.emailStatus,
      phone: response?.data?.phone,
      phoneStatus: response?.data?.phoneStatus,
      linkedin: response?.data?.linkedin,
      companyId: response?.data?.companyId,
      location: response?.data?.location,
      clickCount: response?.data?.clickCount,
      replyCount: response?.data?.replyCount,
      targeted: response?.data?.targeted,
      company: {
        id: response?.data?.company?.surrogateId,
        name: response?.data?.company?.name,
        companyType: response?.data?.company?.companyType,
        phone: response?.data?.company?.phone,
        phoneStatus: response?.data?.company?.phoneStatus,
        size: response?.data?.company?.size,
        industry: response?.data?.company?.industry,
        description: response?.data?.company?.description,
        linkedin: response?.data?.company?.linkedin,
        location: response?.data?.company?.location,
      },
    },
  };
};

export const getLeads = async (
  props: FetchLeadsProps = { offset: 0, limit: 100, targeted: undefined }
): Promise<ApiLeadResponse> => {
  const { offset, limit, targeted } = props;
  let url = `/api/leads/?offset=${offset}&limit=${limit}`;

  if (targeted) {
    url += `&targeted=true`; // Conditionally add targeted parameter
  }
  const response = await api.get(url);

  let leads: Array<LeadModelWithCompanyModel> = [];
  response.data.forEach((item: any) => {
    leads.push({
      id: item?.surrogateId,
      firstName: item?.firstName,
      lastName: item?.lastName,
      title: item?.title,
      email: item?.email,
      emailStatus: item?.emailStatus,
      phone: item?.phone,
      phoneStatus: item?.phoneStatus,
      linkedin: item?.linkedin,
      companyId: item?.companyId,
      location: item?.location,
      clickCount: item?.clickCount,
      replyCount: item?.replyCount,
      targeted: item?.targeted,
      company: {
        id: item?.company?.surrogateId,
        name: item?.company?.name,
        companyType: item?.company?.companyType,
        phone: item?.company?.phone,
        phoneStatus: item?.company?.phoneStatus,
        size: item?.company?.size,
        industry: item?.company?.industry,
        description: item?.company?.description,
        linkedin: item?.company?.linkedin,
        location: item?.company?.location,
      },
    });
  });
  return {
    data: leads,
  };
};

export const updateLeadsAsTargeted = async (
  leadIds: string[]
): Promise<ApiCountResponse> => {
  const response = await api.put("/api/leads/targeted", leadIds);

  return {
    data: {
      count: response.data?.count,
    },
  };
};

export const getLeadTotalCount = async ({
  targeted,
}: {
  targeted: boolean;
}): Promise<ApiCountResponse> => {
  let url = `/api/leads/total-count`;
  if (targeted) {
    url += `?targeted=true`; // Conditionally add targeted parameter
  }
  const response = await api.get(url);
  return {
    data: {
      count: response.data?.count,
    },
  };
};

// Extra functions
export const addLeadsToExistingCadence = async ({
  leadIds,
  cadenceId,
}: {
  leadIds: string[];
  cadenceId: string;
}) => {
  const response = await api.post(`/api/cadences/${cadenceId}/leads`, {
    leadIds,
  });

  if (response.status !== 200) {
    console.log("addLeadsToExistingCadence", response.status, response.data);
    throw new Error("Failed to add leads to existing cadence");
  }
};
