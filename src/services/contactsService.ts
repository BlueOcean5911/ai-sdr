import { ApiSuccessResponse, FetchProps } from "@/types";
import { CADENCE_STEP_STATUS, LEAD_STATUS } from "@/types/enums";
import { api } from "@/utils/api";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

interface FetchContactProps extends FetchProps {
  cadenceId?: string;
  cadenceSteps?: Option | Option[] | null;
  owners?: Option | Option[] | null;
  search?: string;
}

export interface ContactInCadence {
  firstName?: string;
  lastName?: string;
  leadId?: string;
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
  createdAt: string;
  status?: string;
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

export const getContactsInCadenceStatistics = async (
  data: FetchContactProps = { offset: 0, limit: 10 }
): Promise<ApiContactInCadenceStatisticsResponse> => {
  let url = `api/contacts/statistics?`;
  if (data.cadenceId) {
    url += `&cadenceId=${data.cadenceId}`;
  }
  let userIds: string[] = [];
  if (Array.isArray(data.owners)) {
    userIds = data.owners.map((option) => option.value);
  } else if (data.owners) {
    userIds = [data.owners.value];
  } else {
    userIds = [];
  }
  for (const userId of userIds) {
    url += `&ownerIds=${userId}`;
  }
  let steps: string[] = [];
  if (Array.isArray(data.cadenceSteps)) {
    steps = data.cadenceSteps.map((option) => option.value);
  } else if (data.cadenceSteps) {
    steps = [data.cadenceSteps.value];
  } else {
    steps = [];
  }
  for (const state of steps) {
    url += `&cadenceSteps=${state}`;
  }

  if (data.search) {
    url += `&search=${data.search}`;
  }
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
  let userIds: string[] = [];
  if (Array.isArray(data.owners)) {
    userIds = data.owners.map((option) => option.value);
  } else if (data.owners) {
    userIds = [data.owners.value];
  } else {
    userIds = [];
  }
  for (const userId of userIds) {
    url += `&ownerIds=${userId}`;
  }
  let steps: string[] = [];
  if (Array.isArray(data.cadenceSteps)) {
    steps = data.cadenceSteps.map((option) => option.value);
  } else if (data.cadenceSteps) {
    steps = [data.cadenceSteps.value];
  } else {
    steps = [];
  }
  for (const state of steps) {
    url += `&cadenceSteps=${state}`;
  }

  if (data.search) {
    url += `&search=${data.search}`;
  }

  const response = await api.get(url);

  return response;
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
