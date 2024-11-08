import { ApiSuccessResponse, FetchProps } from "@/types";
import { CADENCE_STEP_STATUS, LEAD_STATUS } from "@/types/enums";
import { api } from "@/utils/api";

interface FetchContactProps extends FetchProps {
  cadenceStatus?: string[];
  cadenceStep?: string[];
  emailFrom?: string;
  campaignId?: string;
  cadenceId?: string;
}

export interface ContactInCadence {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  companyId: string;
  companyName?: string;
  ownerId?: string;
  ownerFirstName?: string;
  ownerLastName?: string;
  currentStepStatus?: CADENCE_STEP_STATUS | string;
  cadenceCurrentStep?: number;
  leadStatus?: LEAD_STATUS | string;
  cadenceStepId: string;
}

export interface ContactInCampaign {
  campaignId?: string;
  campaignName?: string;
  campaignStatus?: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  companyId: string;
  companyName?: string;
  ownerId?: string;
  ownerFirstName?: string;
  ownerLastName?: string;
  currentStepStatus?: CADENCE_STEP_STATUS | string;
  cadenceCurrentStep?: number;
  leadStatus?: LEAD_STATUS | string;
}

export interface ContactInCadenceStatistics {
  totalCount: number;
  coldCount: number;
  approachingCount: number;
  repliedCount: number;
  interestedCount: number;
  notInterestedCount: number;
  unResponsiveCount: number;
  doNotContactCount: number;
  badDataCount: number;
  changedJobCount: number;
  openCount: number;
  unqualifiedCount: number;
}

interface ApiContactInCadenceResponse {
  data: ContactInCadence;
}

interface ApiContactsInCadenceResponse {
  data: ContactInCadence[];
}

interface ApiContactInCadenceStatisticsResponse {
  data: ContactInCadenceStatistics;
}

export const getContactsInCadenceStatistics = async ({
  cadenceId,
}: {
  cadenceId: string;
}): Promise<ApiContactInCadenceStatisticsResponse> => {
  const url = `api/contacts/statistics?cadenceId=${cadenceId}`;
  const response = await api.get(url);
  return {
    data: {
      totalCount: response.data?.totalCount,
      coldCount: response.data?.coldCount,
      approachingCount: response.data?.approachingCount,
      repliedCount: response.data?.repliedCount,
      interestedCount: response.data?.interestedCount,
      notInterestedCount: response.data?.notInterestedCount,
      unResponsiveCount: response.data?.unResponsiveCount,
      doNotContactCount: response.data?.doNotContactCount,
      badDataCount: response.data?.badDataCount,
      changedJobCount: response.data?.changedJobCount,
      openCount: response.data?.openCount,
      unqualifiedCount: response.data?.unqualifiedCount,
    },
  };
};

export const getContactsInCadence = async (
  data: FetchContactProps = { offset: 0, limit: 10 }
): Promise<ApiContactsInCadenceResponse> => {
  let url = `api/contacts?offset=${data.offset}&limit=${data.limit}`;
  if (data.cadenceId) {
    url += `&cadenceId=${data.cadenceId}`;
  }

  const response = await api.get(url);
  console.log(response);
  return {
    data: response.data.map((item: any) => ({
      firstName: item?.firstName,
      lastName: item?.lastName,
      jobTitle: item?.jobTitle,
      companyId: item?.companyId,
      companyName: item?.companyName,
      ownerId: item?.ownerId,
      ownerFirstName: item?.ownerFirstName,
      ownerLastName: item?.ownerLastName,
      currentStepStatus: item?.currentStepStatus,
      cadenceCurrentStep: item?.cadenceCurrentStep,
      leadStatus: item?.leadStatus,
      cadenceStepId: item?.cadenceStepId,
    })),
  };
};

export const getContactsInCampaign = async ({
  campaignId,
}: {
  campaignId: string;
}): Promise<ApiContactsInCadenceResponse> => {
  const url = `api/campaigns/${campaignId}/contacts`;
  const response = await api.get(url);
  return {
    data: response.data.map((item: any) => ({
      firstName: item?.firstName,
      lastName: item?.lastName,
      jobTitle: item?.jobTitle,
      companyId: item?.companyId,
      companyName: item?.companyName,
      ownerId: item?.ownerId,
      ownerFirstName: item?.ownerFirstName,
      ownerLastName: item?.ownerLastName,
      currentStepStatus: item?.currentStepStatus,
      cadenceCurrentStep: item?.cadenceCurrentStep,
      leadStatus: item?.leadStatus,
    })),
  };
};

export const updateCadenceState = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}): Promise<ApiSuccessResponse> => {
  return await api.put(`api/cadenceStates/${id}`, {
    state: status,
  });
};
