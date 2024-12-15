import { ApiSuccessResponse, FetchProps } from "@/types";
import {
  CADENCE_STEP_STATUS,
  LEAD_STAGE,
  LEAD_STATUS_IN_CADENCE,
} from "@/types/enums";
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
  contactStates?: Option | Option[] | null;
  owners?: Option | Option[] | null;
  search?: string;
  stage?: string | undefined;
}

export interface ContactInCadence {
  firstName: string;
  lastName: string;
  leadId: string;
  jobTitle?: string;
  companyId: string;
  companyName?: string;
  ownerId?: string;
  ownerFirstName?: string;
  ownerLastName?: string;
  currentStepStatus?: LEAD_STATUS_IN_CADENCE | string;
  cadenceCurrentStep?: number;
  leadStatus: LEAD_STAGE;
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
  leadStatus?: LEAD_STAGE | string;
}

export interface ContactInCadenceStatistics {
  totalCount: number;
  coldCount: number;
  approachingCount: number;
  repliedCount: number;
  interestedCount: number;
  notInterestedCount: number;
  unresponsiveCount: number;
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

  let contactStates: string[] = [];
  if (Array.isArray(data.contactStates)) {
    contactStates = data.contactStates.map((option) => option.value);
  } else if (data.contactStates) {
    contactStates = [data.contactStates.value];
  } else {
    contactStates = [];
  }
  for (const contactState of contactStates) {
    url += `&contactStates=${contactState}`;
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
      unresponsiveCount: response.data?.unresponsiveCount,
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
  if (data.stage) {
    url += `&stage=${data.stage}`;
  }

  let contactStates: string[] = [];
  if (Array.isArray(data.contactStates)) {
    contactStates = data.contactStates.map((option) => option.value);
  } else if (data.contactStates) {
    contactStates = [data.contactStates.value];
  } else {
    contactStates = [];
  }
  for (const contactState of contactStates) {
    url += `&contactStates=${contactState}`;
  }

  if (data.search) {
    url += `&search=${data.search}`;
  }

  const response = await api.get(url);

  return response;
};

export const pauseContactInCadence = async ({
  contactId,
  cadenceId,
}: {
  contactId: string;
  cadenceId: string;
}): Promise<ApiSuccessResponse> => {
  return await api.post(`api/contacts/pause/${cadenceId}/${contactId}`);
};

export const resumeContactInCadence = async ({
  contactId,
  cadenceId,
}: {
  contactId: string;
  cadenceId: string;
}): Promise<ApiSuccessResponse> => {
  return await api.post(`api/contacts/resume/${cadenceId}/${contactId}`);
};

export const removeContactInCadence = async ({
  contactId,
  cadenceId,
}: {
  contactId: string;
  cadenceId: string;
}): Promise<ApiSuccessResponse> => {
  return await api.delete(`api/contacts/remove/${cadenceId}/${contactId}`);
};

export const finishContactInCadence = async ({
  contactId,
  cadenceId,
}: {
  contactId: string;
  cadenceId: string;
}): Promise<ApiSuccessResponse> => {
  return await api.post(`api/contacts/finish/${cadenceId}/${contactId}`);
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
