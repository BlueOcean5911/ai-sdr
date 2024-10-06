import { api } from "@/utils/api";
import {
  ApiCountResponse,
  CountModel,
  FetchProps,
  SuccessModel,
} from "@/types";
import { CAMPAIGN_STAGE, COMPANY_SIZE, EMAIL_STATUS } from "@/types/enums";
import internal from "stream";
import { UserModel } from "./userService";

interface FetchCompaniesProps extends FetchProps {}

export interface CampaignModel extends BaseCampaignModel {
  id?: string;
}

export interface CampaignModelWithCreatorAndOwner extends CampaignModel {
  createdAt: string;
  creatorId: string;
  creator: UserModel;
  owner: UserModel;
}

export interface BaseCampaignModel {
  title?: string;
  amount?: number;
  description?: string;
  status?: CAMPAIGN_STAGE | string;
  star?: boolean;
  isActive?: boolean;
}

interface ApiCampaignResponse {
  data: CampaignModel;
}

interface ApiCampaignsResponse {
  data: CampaignModel[];
}

interface ApiCampaignsWithCreatorResponse {
  data: CampaignModelWithCreatorAndOwner[];
}

export const addCampaign = async (
  campaign: BaseCampaignModel
): Promise<ApiCampaignResponse> => {
  console.log("campaign===", campaign);
  const response = await api.post("api/campaigns", campaign);

  if (response.status !== 200) {
    throw new Error("Failed to create company");
  }

  return {
    data: {
      id: response.data?.id,
      title: response.data?.title,
      amount: response.data?.amount,
      description: response.data?.description,
      status: response.data?.status,
    },
  };
};

export const getCampaigns = async (
  data: FetchCompaniesProps = { offset: 0, limit: 100 }
): Promise<ApiCampaignsWithCreatorResponse> => {
  const response = await api.get(
    `/api/campaigns?offset=${data.offset}&limit=${data.limit}`
  );
  return {
    data: response.data.map((item: any) => ({
      id: item?.id,
      title: item?.title,
      amount: item?.amount,
      description: item?.description,
      status: item?.status,
      star: item?.star,
      isActive: item?.isActive,
      creatorId: item?.creatorId,
      createdAt: item?.createdAt,
      creator: {
        id: item?.creatorId,
        firstName: item?.creator.firstName,
        lastName: item?.creator.lastName,
        email: item?.email,
        phone: item?.phone,
        title: item?.title,
      },
      owner: {
        id: item?.creatorId,
        firstName: item?.creator.firstName,
        lastName: item?.creator.lastName,
        email: item?.email,
        phone: item?.phone,
        title: item?.title,
      },
    })),
  };
};

export const getCampaign = async (id: string): Promise<ApiCampaignResponse> => {
  const response = await api.get(`api/campaigns/${id}`);

  return {
    data: {
      id: response.data?.id,
      title: response.data?.title,
      amount: response.data?.amount,
      description: response.data?.description,
      status: response.data?.status,
      star: response.data?.star,
      isActive: response.data?.isActive,
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

export const updateCampaign = async ({
  id,
  data,
}: {
  id: string;
  data: CampaignModel;
}): Promise<ApiCampaignResponse> => {
  delete data.id;
  console.log("updatedCampaign", data);
  const response = await api.put(`/api/campaigns/${id}`, data);

  return {
    data: response.data,
  };
};

export const deleteCampaign = async ({
  id,
}: {
  id: string;
}): Promise<SuccessModel> => {
  return await api.delete(`/api/campaigns/${id}`);
};
