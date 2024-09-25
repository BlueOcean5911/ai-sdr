import { api } from "@/utils/api";
import { CountModel, FetchProps } from "@/types";
import { COMPANY_SIZE, EMAIL_STATUS } from "@/types/enums";
import { boolean } from "yup";

interface FetchCompaniesProps extends FetchProps {
  targeted?: boolean;
  industry?: string;
  company?: string;
  location?: string;
}

export interface CompanyModel extends BaseCompanyModel {
  id: string;
}

export interface BaseCompanyModel {
  name?: string;
  linkedin?: string;
  companyType?: string;
  phone?: string;
  phoneStatus?: EMAIL_STATUS;
  description?: string;
  industry?: string;
  location?: string;
  size?: COMPANY_SIZE | string;
  targeted?: boolean;
}

interface ApiCompaniesResponse {
  data: CompanyModel[]; // The structure of the data returned from the API
}

interface ApiCompanyResponse {
  data: CompanyModel; // The structure of the data returned from the API
}
interface ApiCompanyResponse {
  data: CompanyModel; // The structure of the data returned from the API
}

interface ApiCountResponse {
  data: CountModel; // The structure of the data returned from the API;
}

export const getCompanies = async (
  data: FetchCompaniesProps = { offset: 0, limit: 100, targeted: false }
): Promise<ApiCompaniesResponse> => {
  const { offset, limit, targeted, company, location, industry } = data;
  let url = `/api/companies?offset=${offset}&limit=${limit}`;
  if (targeted) {
    url += "&targeted=true";
  }
  if (company) {
    url += `&companyName=${company}`;
  }
  if (location) {
    url += `&location=${location}`;
  }
  if (industry) {
    url += `&industry=${industry}`;
  }
  const response = await api.get(url);

  let companies: Array<CompanyModel> = [];
  response.data.forEach((item: any) => {
    companies.push({
      id: item?.surrogateId,
      name: item?.name,
      linkedin: item?.linkedin,
      companyType: item?.companyType,
      phone: item?.phone,
      phoneStatus: item?.phoneStatus,
      description: item?.description,
      industry: item?.industry,
      location: item?.location,
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
    id: response.data?.surrogateId,
    name: response.data?.name,
    linkedin: response.data?.linkedin,
    companyType: response.data?.companyType,
    phone: response.data?.phone,
    phoneStatus: response.data?.phoneStatus,
    description: response.data?.description,
    industry: response.data?.industry,
    location: response.data?.location,
    size: response.data?.size,
    targeted: response.data?.targeted,
  };
  return {
    data: company,
  };
};

export const getCompanyTotalCount = async ({
  targeted,
  company,
  location,
  industry,
}: {
  targeted: boolean;
  company?: string;
  location?: string;
  industry?: string;
}): Promise<ApiCountResponse> => {
  let url = "/api/companies/statistics/total-count?";
  if (targeted) {
    url += "&targeted=true";
  }
  if (company) {
    url += `&companyName=${company}`;
  }
  if (location) {
    url += `&location=${location}`;
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
      id: response.data?.surrogateId,
      name: response.data?.name,
      linkedin: response.data?.linkedin,
      companyType: response.data?.companyType,
      phone: response.data?.phone,
      phoneStatus: response.data?.phoneStatus,
      description: response.data?.description,
      industry: response.data?.industry,
      location: response.data?.location,
      size: response.data?.size,
      targeted: response.data?.targeted,
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
