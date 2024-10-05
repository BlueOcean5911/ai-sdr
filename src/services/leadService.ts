import { api } from "@/utils/api";
import { CountModel, FetchProps } from "@/types";
import { EMAIL_STATUS } from "@/types/enums";
import { CompanyModel } from "./companyService";
interface FetchLeadsProps extends FetchProps {
  targeted?: boolean;
  jobTitle?: string;
  companyName?: string;
  location?: string;
  industry?: string;
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

interface ApiLeadsResponse {
  data: Array<LeadModelWithCompanyModel>; // The structure of the data returned from the API
}

interface ApiLeadResponse {
  data: LeadModel;
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
      id: response?.data?.id,
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
      personalNote1: response?.data?.personalNote1,
      company: {
        id: response?.data?.company?.id,
        name: response?.data?.company?.name,
        companyType: response?.data?.company?.companyType,
        phone: response?.data?.company?.phone,
        phoneStatus: response?.data?.company?.phoneStatus,
        size: response?.data?.company?.size,
        industry: response?.data?.company?.industry,
        description: response?.data?.company?.description,
        linkedin: response?.data?.company?.linkedin,
        streetAddress: response?.data?.company?.streetAddress,
        city: response?.data?.company?.city,
        state: response?.data?.company?.state,
        country: response?.data?.company?.country,
        postalCode: response?.data?.company?.postalCode,
        yearFounded: response?.data?.company?.yearFounded,
        domain: response?.data?.company?.domain,
        annualRevenue: response?.data?.company?.annualRevenue,
        stage: response?.data?.company?.stage,
        keywords: response?.data?.company?.keywords,
      },
    },
  };
};

export const getLeads = async (
  props: FetchLeadsProps = { offset: 0, limit: 100, targeted: undefined }
): Promise<ApiLeadsResponse> => {
  const { offset, limit, targeted, jobTitle, companyName, industry, location } =
    props;
  let url = `/api/leads/?offset=${offset}&limit=${limit}`;

  if (targeted) {
    url += `&targeted=true`; // Conditionally add targeted parameter
  }
  if (jobTitle) {
    url += `&jobTitle=${jobTitle}`;
  }
  if (companyName) {
    url += `&companyName=${companyName}`;
  }
  if (industry) {
    url += `&industry=${industry}`;
  }
  if (location) {
    url += `&location=${location}`;
  }

  const response = await api.get(url);
  console.log("response leads", response);
  let leads: Array<LeadModelWithCompanyModel> = [];
  response.data.forEach((item: any) => {
    leads.push({
      id: item?.id,
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
      personalNote1: item?.personalNote1,
      company: {
        id: item?.company?.id,
        name: item?.company?.name,
        companyType: item?.company?.companyType,
        phone: item?.company?.phone,
        phoneStatus: item?.company?.phoneStatus,
        size: item?.company?.size,
        industry: item?.company?.industry,
        description: item?.company?.description,
        linkedin: item?.company?.linkedin,
        
        streetAddress: item?.company?.streetAddress,
        city: item?.company?.city,
        state: item?.company?.state,
        country: item?.company?.country,
        postalCode: item?.company?.postalCode,

        yearFounded: item?.company?.yearFounded,
        domain: item?.company?.domain,
        annualRevenue: item?.company?.annualRevenue,
        stage: item?.company?.stage,
        keywords: item?.company?.keywords,
      },
    });
  });
  return {
    data: leads,
  };
};

export const getLeadById = async (props: {
  id: string;
}): Promise<ApiLeadResponse> => {
  const { id } = props;
  let url = `/api/leads/${id}`;

  const response = await api.get(url);

  let lead: LeadModel = {
    id: response.data?.id,
    firstName: response.data?.firstName,
    lastName: response.data?.lastName,
    title: response.data?.title,
    email: response.data?.email,
    emailStatus: response.data?.emailStatus,
    phone: response.data?.phone,
    phoneStatus: response.data?.phoneStatus,
    linkedin: response.data?.linkedin,
    companyId: response.data?.companyId,
    location: response.data?.location,
    clickCount: response.data?.clickCount,
    replyCount: response.data?.replyCount,
    targeted: response.data?.targeted,
    personalNote1: response?.data?.personalNote1,
  };

  return {
    data: lead,
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
  jobTitle,
  companyName,
  location,
  industry,
}: {
  targeted?: boolean;
  jobTitle?: string;
  companyName?: string;
  location?: string;
  industry?: string;
}): Promise<ApiCountResponse> => {
  let url = `/api/leads/statistics/total-count?`;
  if (targeted) {
    url += `&targeted=true`; // Conditionally add targeted parameter
  }
  if (jobTitle) {
    url += `&jobTitle=${jobTitle}`;
  }
  if (companyName) {
    url += `&companyName=${companyName}`;
  }
  if (industry) {
    url += `&industry=${industry}`;
  }
  if (location) {
    url += `&location=${location}`;
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
  // console.log("add lead to existing cadence", leadIds, cadenceId);
  const response = await api.post(`/api/cadences/${cadenceId}/leads`, {
    leadIds,
  });

  if (response.status !== 200) {
    console.log("addLeadsToExistingCadence", response.status, response.data);
    throw new Error("Failed to add leads to existing cadence");
  }
  return {
    data: {
      id: response.data?.id,
    },
  };
};
