import { api } from "@/utils/api";
import { ApiSuccessResponse, CountModel, FetchProps } from "@/types";
import { EMAIL_STATUS } from "@/types/enums";
import { CompanyModel } from "./companyService";
import {
  getDefaultLeadFilterConfig,
  LeadFilterConfig,
} from "@/contexts/FilterLeadContext";
interface FetchLeadsProps extends FetchProps {
  targeted?: boolean;
  filter: LeadFilterConfig;
}

interface FetchTotalCountProps {
  targeted?: boolean;
  filter: LeadFilterConfig;
}

export interface LeadModel extends BaseLeadModel {
  id: string;
}

export const getDefaultLead = (): LeadModel => {
  return {
    firstName: "",
    lastName: "",
    id: "",
  };
};

export interface LeadModelWithCompanyModel extends LeadModel {
  company?: CompanyModel;
}

export interface BaseLeadModel {
  firstName?: string;
  lastName?: string;
  title?: string;
  email?: string;
  emailStatus?: EMAIL_STATUS | string;
  workEmail?: string;
  workEmailStatus?: EMAIL_STATUS | string;
  primaryPhone?: string;
  primaryPhoneStatus?: EMAIL_STATUS | string;
  mobilePhone?: string;
  mobilePhoneStatus?: EMAIL_STATUS | string;
  workPhone?: string;
  workPhoneStatus?: EMAIL_STATUS | string;
  streetAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  timeZone?: string;
  annualRevenue?: string;
  source?: string;
  stage?: string;
  linkedin?: string;
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

interface ApiLeadWithCompanyModelResponse {
  data: LeadModelWithCompanyModel;
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
      workEmail: response?.data?.workEmail,
      workEmailStatus: response?.data?.workEmailStatus,
      primaryPhone: response?.data?.primaryPhone,
      primaryPhoneStatus: response?.data?.primaryPhoneStatus,
      mobilePhone: response?.data?.mobilePhone,
      mobilePhoneStatus: response?.data?.mobilePhoneStatus,
      workPhone: response?.data?.workPhone,
      workPhoneStatus: response?.data?.workPhoneStatus,
      streetAddress: response?.data?.streetAddress,
      city: response?.data?.city,
      state: response?.data?.state,
      country: response?.data?.country,
      timeZone: response?.data?.timeZone,
      annualRevenue: response?.data?.annualRevenue,
      source: response?.data?.source,
      stage: response?.data?.stage,
      linkedin: response?.data?.linkedin,
      companyId: response?.data?.companyId,
      clickCount: response?.data?.clickCount,
      replyCount: response?.data?.replyCount,
      targeted: response?.data?.targeted,
      personalNote1: response?.data?.personalNote1,
      ownerId: response?.data?.ownerId,
      company: {
        id: response?.data?.company?.id,
        name: response?.data?.company?.name,
        companyType: response?.data?.company?.companyType,
        phone: response?.data?.company?.phone,
        phoneStatus: response?.data?.company?.phoneStatus,
        size: response?.data?.company?.size,
        industry: response?.data?.company?.industry,
        description: response?.data?.company?.description,
        website: response?.data?.company?.website,
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

export const updateLead = async (data: {
  id: string;
  updateData: LeadModel;
}) => {
  const { id, updateData } = data;
  const response = await api.put(`api/leads/${id}`, updateData);
  if (response.status !== 200) {
    throw new Error("Failed to update lead");
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
      workEmail: response?.data?.workEmail,
      workEmailStatus: response?.data?.workEmailStatus,
      primaryPhone: response?.data?.primaryPhone,
      primaryPhoneStatus: response?.data?.primaryPhoneStatus,
      mobilePhone: response?.data?.mobilePhone,
      mobilePhoneStatus: response?.data?.mobilePhoneStatus,
      workPhone: response?.data?.workPhone,
      workPhoneStatus: response?.data?.workPhoneStatus,
      streetAddress: response?.data?.streetAddress,
      city: response?.data?.city,
      state: response?.data?.state,
      country: response?.data?.country,
      timeZone: response?.data?.timeZone,
      annualRevenue: response?.data?.annualRevenue,
      source: response?.data?.source,
      stage: response?.data?.stage,
      linkedin: response?.data?.linkedin,
      companyId: response?.data?.companyId,
      clickCount: response?.data?.clickCount,
      replyCount: response?.data?.replyCount,
      targeted: response?.data?.targeted,
      personalNote1: response?.data?.personalNote1,
      ownerId: response?.data?.ownerId,
      company: {
        id: response?.data?.company?.id,
        name: response?.data?.company?.name,
        companyType: response?.data?.company?.companyType,
        phone: response?.data?.company?.phone,
        phoneStatus: response?.data?.company?.phoneStatus,
        size: response?.data?.company?.size,
        industry: response?.data?.company?.industry,
        description: response?.data?.company?.description,
        website: response?.data?.company?.website,
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
  data: FetchLeadsProps = {
    offset: 0,
    limit: 100,
    targeted: undefined,
    filter: getDefaultLeadFilterConfig(),
  }
): Promise<ApiLeadsResponse> => {
  const { offset, limit, targeted } = data;
  const { title, company, industry, country, state, city } = data.filter;
  let url = `/api/leads/?offset=${offset}&limit=${limit}`;

  if (targeted) {
    url += `&targeted=true`;
  }
  if (title) {
    url += `&jobTitle=${title}`;
  }
  if (company) {
    url += `&companyName=${company}`;
  }
  if (industry) {
    url += `&industry=${industry}`;
  }
  if (country) {
    url += `&country=${country}`;
  }
  if (state) {
    url += `&state=${state}`;
  }
  if (city) {
    url += `&city=${city}`;
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
      workEmail: item?.workEmail,
      workEmailStatus: item?.workEmailStatus,
      primaryPhone: item?.primaryPhone,
      primaryPhoneStatus: item?.primaryPhoneStatus,
      mobilePhone: item?.mobilePhone,
      mobilePhoneStatus: item?.mobilePhoneStatus,
      workPhone: item?.workPhone,
      workPhoneStatus: item?.workPhoneStatus,
      streetAddress: item?.streetAddress,
      city: item?.city,
      state: item?.state,
      country: item?.country,
      timeZone: item?.timeZone,
      annualRevenue: item?.annualRevenue,
      source: item?.source,
      stage: item?.stage,
      linkedin: item?.linkedin,
      companyId: item?.companyId,
      clickCount: item?.clickCount,
      replyCount: item?.replyCount,
      targeted: item?.targeted,
      personalNote1: item?.personalNote1,
      ownerId: item?.ownerId,
      company: {
        id: item?.company?.id,
        name: item?.company?.name,
        companyType: item?.company?.companyType,
        phone: item?.company?.phone,
        phoneStatus: item?.company?.phoneStatus,
        size: item?.company?.size,
        industry: item?.company?.industry,
        description: item?.company?.description,
        website: item?.company?.website,
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
}): Promise<ApiLeadWithCompanyModelResponse> => {
  const { id } = props;
  let url = `/api/leads/${id}`;

  const response = await api.get(url);
  const item = response.data;
  // console.log("Fetched lead data", item);
  let lead: LeadModelWithCompanyModel = {
    id: item?.id,
    firstName: item?.firstName,
    lastName: item?.lastName,
    title: item?.title,
    email: item?.email,
    emailStatus: item?.emailStatus,
    workEmail: item?.workEmail,
    workEmailStatus: item?.workEmailStatus,
    primaryPhone: item?.primaryPhone,
    primaryPhoneStatus: item?.primaryPhoneStatus,
    mobilePhone: item?.mobilePhone,
    mobilePhoneStatus: item?.mobilePhoneStatus,
    workPhone: item?.workPhone,
    workPhoneStatus: item?.workPhoneStatus,
    streetAddress: item?.streetAddress,
    city: item?.city,
    state: item?.state,
    country: item?.country,
    timeZone: item?.timeZone,
    annualRevenue: item?.annualRevenue,
    source: item?.source,
    stage: item?.stage,
    linkedin: item?.linkedin,
    companyId: item?.companyId,
    clickCount: item?.clickCount,
    replyCount: item?.replyCount,
    targeted: item?.targeted,
    personalNote1: item?.personalNote1,
    ownerId: item?.ownerId,
    company: {
      id: item?.company?.id,
      name: item?.company?.name,
      companyType: item?.company?.companyType,
      phone: item?.company?.phone,
      phoneStatus: item?.company?.phoneStatus,
      size: item?.company?.size,
      industry: item?.company?.industry,
      description: item?.company?.description,
      website: item?.company?.website,
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
  };

  return {
    data: lead,
  };
};

export const deleteLead = async (
  leadId: string
): Promise<ApiSuccessResponse> => {
  const response = await api.delete(`api/leads/${leadId}`);

  if (response.status !== 200) {
    throw new Error("Failed to update lead");
  }

  return {
    data: {
      success: response.data?.success,
    },
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

export const getLeadTotalCount = async (
  data: FetchTotalCountProps = {
    targeted: false,
    filter: getDefaultLeadFilterConfig(),
  }
): Promise<ApiCountResponse> => {
  const { targeted } = data;
  const { title, company, industry, country, state, city } = data.filter;

  let url = `/api/leads/statistics/total-count?`;

  if (targeted) {
    url += `&targeted=true`;
  }
  if (title) {
    url += `&jobTitle=${title}`;
  }
  if (company) {
    url += `&companyName=${company}`;
  }
  if (industry) {
    url += `&industry=${industry}`;
  }
  if (country) {
    url += `&country=${country}`;
  }
  if (state) {
    url += `&state=${state}`;
  }
  if (city) {
    url += `&city=${city}`;
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
