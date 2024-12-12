import { api } from "@/utils/api";
import { ApiSuccessResponse, CountModel, FetchProps } from "@/types";
import { EMAIL_STATUS } from "@/types/enums";
import { CompanyModel } from "./companyService";
import {
  defaultLeadFilterConfig,
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
    data: response?.data,
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
    data: response?.data,
  };
};

export const getLeads = async (
  data: FetchLeadsProps = {
    offset: 0,
    limit: 100,
    targeted: undefined,
    filter: defaultLeadFilterConfig,
  }
): Promise<ApiLeadsResponse> => {
  const { offset, limit, targeted } = data;
  const {
    title,
    company,
    industry,
    country,
    state,
    city,
    orderBy,
    isAscending,
  } = data.filter;
  let url = `/api/leads/?offset=${offset}&limit=${limit}`;

  if (targeted) url += `&targeted=true`;
  if (title) url += `&jobTitle=${title}`;
  if (company) url += `&companyName=${company}`;
  if (country) url += `&country=${country}`;
  if (state) url += `&state=${state}`;
  if (city) url += `&city=${city}`;
  if (industry) url += `&industry=${industry}`;
  if (orderBy) url += `&orderBy=${orderBy}`;
  if (isAscending !== undefined) url += `&isAscending=${isAscending}`;
  console.log("url", url);

  const response = await api.get(url);
  console.log("response leads", response);

  return {
    data: response.data,
  };
};

export const getLeadById = async (props: {
  id: string;
}): Promise<ApiLeadWithCompanyModelResponse> => {
  const { id } = props;
  let url = `/api/leads/${id}`;

  const response = await api.get(url);

  return {
    data: response.data,
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
    filter: defaultLeadFilterConfig,
  }
): Promise<ApiCountResponse> => {
  const { targeted } = data;
  const {
    title,
    company,
    industry,
    country,
    state,
    city,
    orderBy,
    isAscending,
  } = data.filter;

  let url = `/api/leads/statistics/total-count?offset=0`;

  if (targeted) url += `&targeted=true`;
  if (title) url += `&jobTitle=${title}`;
  if (company) url += `&companyName=${company}`;
  if (country) url += `&country=${country}`;
  if (state) url += `&state=${state}`;
  if (city) url += `&city=${city}`;
  if (industry) url += `&industry=${industry}`;
  if (orderBy) url += `&orderBy=${orderBy}`;
  if (isAscending !== undefined) url += `&isAscending=${isAscending}`;

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
  const response = await api.post(`/api/v2/cadences/${cadenceId}/leads`, {
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

// Extra functions
export const getExistingLeadsInCadence = async ({
  leadIds,
  cadenceId,
}: {
  leadIds: string[];
  cadenceId: string;
}): Promise<ApiLeadsResponse> => {
  // console.log("add lead to existing cadence", leadIds, cadenceId);
  const response = await api.post(
    `/api/v2/cadences/${cadenceId}/get-existing-leads`,
    {
      leadIds,
    }
  );

  if (response.status !== 200) {
    console.log("getExistingLeadInCadence", response.status, response.data);
    throw new Error("Failed to get existing leads in cadence");
  }
  return response;
};
