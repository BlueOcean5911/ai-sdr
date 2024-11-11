import { api } from "@/utils/api";
import { CountModel, FetchProps, SuccessModel } from "@/types";
import { EMAIL_STATUS } from "@/types/enums";
import {
  CompanyFilterConfig,
  defaultCompanyFilterConfig,
} from "@/contexts/FilterCompanyContext";

interface FetchCompaniesProps extends FetchProps {
  targeted?: boolean;
  filter: CompanyFilterConfig;
}

interface FetchTotalCountProps {
  targeted?: boolean;
  filter: CompanyFilterConfig;
}

export interface CompanyModel extends BaseCompanyModel {
  id: string;
}

export interface BaseCompanyModel {
  name?: string;
  website?: string;
  linkedin?: string;
  companyType?: string;
  phone?: string;
  phoneStatus: EMAIL_STATUS | string;
  description?: string;
  industry?: string;

  streetAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;

  yearFounded?: string;
  domain?: string;
  annualRevenue?: string;
  stage?: string;
  keywords?: string;

  size?: number;
  targeted?: boolean;
}

interface ApiCompaniesResponse {
  data: CompanyModel[]; // The structure of the data returned from the API
}

interface ApiCompanyResponse {
  data: CompanyModel; // The structure of the data returned from the API
}

interface ApiSuccessResponse {
  data: SuccessModel;
}

interface ApiCountResponse {
  data: CountModel; // The structure of the data returned from the API;
}

export const getCompanies = async (
  data: FetchCompaniesProps = {
    offset: 0,
    limit: 100,
    targeted: false,
    filter: defaultCompanyFilterConfig,
  }
): Promise<ApiCompaniesResponse> => {
  const { offset, limit, targeted } = data;
  const {
    company,
    industry,
    country,
    state,
    city,
    streetAddress,
    orderBy,
    isAscending,
  } = data.filter;
  let url = `/api/companies/?offset=${offset}&limit=${limit}`;

  if (targeted) url += `&targeted=true`;
  if (company) url += `&companyName=${company}`;
  if (country) url += `&country=${country}`;
  if (state) url += `&state=${state}`;
  if (city) url += `&city=${city}`;
  if (streetAddress) url += `&jobTitle=${streetAddress}`;
  if (industry) url += `&industry=${industry}`;
  if (orderBy) url += `&orderBy=${orderBy}`;
  if (isAscending !== undefined) url += `&isAscending=${isAscending}`;
  const response = await api.get(url);

  return {
    data: response.data,
  };
};

export const getCompanyById = async (data: {
  id: string;
}): Promise<ApiCompanyResponse> => {
  const { id } = data;
  let url = `/api/companies/${id}`;

  const response = await api.get(url);

  return {
    data: response.data,
  };
};

export const getCompanyTotalCount = async (
  data: FetchTotalCountProps = {
    targeted: false,
    filter: defaultCompanyFilterConfig,
  }
): Promise<ApiCountResponse> => {
  const { targeted } = data;
  const { company, country, state, city, streetAddress, industry } =
    data.filter;

  let url = "/api/companies/statistics/total-count?";

  if (targeted) {
    url += "&targeted=true";
  }
  if (company) {
    url += `&companyName=${company}`;
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
  if (streetAddress) {
    url += `&streetAddress=${streetAddress}`;
  }
  if (industry) {
    url += `&industry=${industry}`;
  }

  const response = await api.get(url);
  return {
    data: {
      count: response.data?.count,
    },
  };
};

export const addCompany = async (
  company: BaseCompanyModel
): Promise<ApiCompanyResponse> => {
  const response = await api.post("api/companies", company);

  if (response.status !== 200) {
    throw new Error("Failed to create company");
  }

  return {
    data: response.data,
  };
};

export const updateCompany = async (data: {
  id: string;
  updateData: CompanyModel;
}): Promise<ApiCompanyResponse> => {
  const { id, updateData } = data;
  const response = await api.put(`api/companies/${id}`, updateData);

  if (response.status !== 200) {
    throw new Error("Failed to update company");
  }

  return {
    data: response.data,
  };
};

export const deleteCompany = async (
  companyId: string
): Promise<ApiSuccessResponse> => {
  const response = await api.delete(`api/companies/${companyId}`);

  if (response.status !== 200) {
    throw new Error("Failed to update company");
  }

  return {
    data: {
      success: response.data?.success,
    },
  };
};

export const updateCompaniesAsTargeted = async (
  companyIds: string[]
): Promise<ApiCountResponse> => {
  const response = await api.put("/api/companies/targeted", companyIds);

  return {
    data: {
      count: response.data?.count,
    },
  };
};
