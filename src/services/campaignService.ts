import { api } from "@/utils/api";
import { ApiCountResponse, CountModel, FetchProps } from "@/types";
import { CAMPAIGN_STAGE, COMPANY_SIZE, EMAIL_STATUS } from "@/types/enums";
import internal from "stream";

interface FetchCompaniesProps extends FetchProps {}

interface CampaignModel extends BaseCampaignModel {
  id?: string;
}

interface BaseCampaignModel {
  title?: string;
  amount?: number;
  description?: string;
  status?: CAMPAIGN_STAGE;
}

interface ApiCampaignResponse {
  data: CampaignModel; // The structure of the data returned from the API
}

export const getCompanies = async (
  data: FetchCompaniesProps = { offset: 0, limit: 100 }
): Promise<ApiCampaignResponse> => {
  const response = await api.get(
    `/api/campaigns?offset=${data.offset}&limit=${data.limit}`
  );
  return {
    data: {
      id: response.data?.surrogateId,
      title: response.data?.title,
      amount: response.data?.amount,
      description: response.data?.description,
      status: response.data?.stage as CAMPAIGN_STAGE,
    },
  };
};

export const getCampaignTotalCount = async (): Promise<ApiCountResponse> => {
  const response = await api.get(`/api/campaigns/total-count`);
  return {
    data: {
      count: response.data?.count,
    },
  };
};

export const addCampaign = async (company: BaseCampaignModel) => {
  const response = await api.post("api/campaigns", company);

  if (response.status !== 200) {
    throw new Error("Failed to create company");
  }
};
