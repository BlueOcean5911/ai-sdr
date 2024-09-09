import { api } from "@/utils/api";
import { CountModel, FetchProps } from "@/types";
import { COMPANY_SIZE, EMAIL_STATUS } from "@/types/enums";

interface FetchCompaniesProps extends FetchProps {}

interface CompanyModel {
  id?: string;
  name?: string;
  phone?: string;
  phoneStatus?: EMAIL_STATUS;
  size?: COMPANY_SIZE;
  companyType?: string;
  industry?: string;
  description?: string;
  linkedin?: string;
  location?: string;
}

interface PostCompanyModel {
  name?: string;
  linkedin?: string;
  companyType?: string;
  phone?: string;
  phoneStatus?: EMAIL_STATUS;
  description?: string;
  industry?: string;
  location?: string;
  size?: COMPANY_SIZE;
  targeted?: boolean;
}

interface ApiCompanyResponse {
  data: CompanyModel; // The structure of the data returned from the API
}

interface ApiCountResponse {
  data: CountModel; // The structure of the data returned from the API;
}

export const getCompanies = async (
  data: FetchCompaniesProps = { offset: 0, limit: 100 }
): Promise<ApiCompanyResponse> => {
  const response = await api.get(
    `/api/companies?offset=${data.offset}&limit=${data.limit}`
  );
  return {
    data: {
      id: response.data?.surrogateId,
      name: response.data?.name,
      companyType: response.data?.companyType,
      phone: response.data?.phone,
      phoneStatus: response.data?.phoneStatus,
      size: response.data?.size,
      industry: response.data?.industry,
      description: response.data?.description,
      linkedin: response.data?.linkedin,
      location: response.data?.location,
    },
  };
};

export const getCompanyTotalCount = async (): Promise<ApiCountResponse> => {
  const response = await api.get(`/api/companies/total-count`);
  return {
    data: {
      count: response.data?.count,
    },
  };
};

export const addCompany = async (company: PostCompanyModel) => {
  const response = await api.post("api/companies", company);

  if (response.status !== 200) {
    throw new Error("Failed to create company");
  }
};
