import { api } from "@/utils/api";
import { CountModel, FetchProps, SuccessModel } from "@/types";
import { EMAIL_STATUS } from "@/types/enums";
import {
  CompanyFilterConfig,
  getDefaultCompanyFilterConfig,
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
  phoneStatus?: EMAIL_STATUS;
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
    filter: getDefaultCompanyFilterConfig(),
  }
): Promise<ApiCompaniesResponse> => {
  const { offset, limit, targeted } = data;
  const { company, country, state, city, streetAddress, industry } =
    data?.filter;
  let url = `/api/companies?offset=${offset}&limit=${limit}`;

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

  let companies: Array<CompanyModel> = [];
  response.data.forEach((item: any) => {
    companies.push({
      id: item?.id,
      name: item?.name,
      website: item?.website,
      linkedin: item?.linkedin,
      companyType: item?.companyType,
      phone: item?.phone,
      phoneStatus: item?.phoneStatus,
      description: item?.description,
      industry: item?.industry,

      streetAddress: item?.streetAddress,
      city: item?.city,
      state: item?.state,
      country: item?.country,
      postalCode: item?.postalCode,

      yearFounded: item?.yearFounded,
      domain: item?.domain,
      annualRevenue: item?.annualRevenue,
      stage: item?.stage,
      keywords: item?.keywords,

      size: item?.size,
      targeted: item?.targeted,
    });
  });
  return {
    data: companies,
  };
};

export const getCompanyById = async (data: {
  id: string;
}): Promise<ApiCompanyResponse> => {
  const { id } = data;
  let url = `/api/companies/${id}`;

  const response = await api.get(url);

  let company: CompanyModel = {
    id: response.data?.id,
    name: response.data?.name,
    website: response.data?.website,
    linkedin: response.data?.linkedin,
    companyType: response.data?.companyType,
    phone: response.data?.phone,
    phoneStatus: response.data?.phoneStatus,
    description: response.data?.description,
    industry: response.data?.industry,

    streetAddress: response.data?.streetAddress,
    city: response.data?.city,
    state: response.data?.state,
    country: response.data?.country,
    postalCode: response.data?.postalCode,

    yearFounded: response.data?.yearFounded,
    domain: response.data?.domain,
    annualRevenue: response.data?.annualRevenue,
    stage: response.data?.stage,
    keywords: response.data?.keywords,

    size: response.data?.size,
    targeted: response.data?.targeted,
  };
  return {
    data: company,
  };
};

export const getCompanyTotalCount = async (
  data: FetchTotalCountProps = {
    targeted: false,
    filter: getDefaultCompanyFilterConfig(),
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
    data: {
      id: response.data?.id,
      name: response.data?.name,
      website: response.data?.website,
      linkedin: response.data?.linkedin,
      companyType: response.data?.companyType,
      phone: response.data?.phone,
      phoneStatus: response.data?.phoneStatus,
      description: response.data?.description,
      industry: response.data?.industry,

      streetAddress: response.data?.streetAddress,
      city: response.data?.city,
      state: response.data?.state,
      country: response.data?.country,
      postalCode: response.data?.postalCode,

      yearFounded: response.data?.yearFounded,
      domain: response.data?.domain,
      annualRevenue: response.data?.annualRevenue,
      stage: response.data?.stage,
      keywords: response.data?.keywords,

      size: response.data?.size,
      targeted: response.data?.targeted,
    },
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
    data: {
      id: response.data?.id,
      name: response.data?.name,
      website: response.data?.website,
      linkedin: response.data?.linkedin,
      companyType: response.data?.companyType,
      phone: response.data?.phone,
      phoneStatus: response.data?.phoneStatus,
      description: response.data?.description,
      industry: response.data?.industry,

      streetAddress: response.data?.streetAddress,
      city: response.data?.city,
      state: response.data?.state,
      country: response.data?.country,
      postalCode: response.data?.postalCode,

      yearFounded: response.data?.yearFounded,
      domain: response.data?.domain,
      annualRevenue: response.data?.annualRevenue,
      stage: response.data?.stage,
      keywords: response.data?.keywords,

      size: response.data?.size,
      targeted: response.data?.targeted,
    },
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
