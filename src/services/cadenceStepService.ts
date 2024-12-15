import { api } from "@/utils/api";
import { ApiSuccessResponse, CountModel, FetchProps } from "@/types";
import { CADENCE_STEP_TYPE, COMPANY_SIZE, EMAIL_STATUS } from "@/types/enums";
import { boolean, number } from "yup";
import { TemplateModel } from "./templatesService";
import { MailingsStatistics } from "./mailingService";

interface FetchCadenceStepsProps extends FetchProps {}

export interface CadenceStepModel
  extends CadenceStepWithTemplateAndStatisticsModel {
  id: string;
}

export interface CadenceStepWithTemplateModel extends BaseCadenceStepModel {
  template: TemplateModel;
}

export interface CadenceStepStatisticsModel {
  scheduled: number;
  delivered: number;
  bounced: number;
  opened: number;
  replied: number;
}

export interface CadenceStepWithTemplateAndStatisticsModel
  extends CadenceStepWithTemplateModel {
  statistics: MailingsStatistics;
}

export interface BaseCadenceStepModel {
  name?: string;
  order?: number;
  taskNote?: string;
  interval?: number;
  stepType?: CADENCE_STEP_TYPE | string;

  activeCount?: number;
  pausedCount?: number;
  notSentCount?: number;
  finishedCount?: number;

  bouncedCount?: number;
  scheduledCount?: number;
  deliveredCount?: number;
  openedCount?: number;
  repliedCount?: number;

  cadenceId?: string;
  templateId?: string;
}

export interface UpdateCadenceStep {
  name?: string;
  interval?: number;
  stepType?: CADENCE_STEP_TYPE | string;
  taskNote?: string;
}

interface ApiCadenceStepsResponse {
  data: CadenceStepModel[]; // The structure of the data returned from the API
}
interface ApiCadenceStepResponse {
  data: CadenceStepModel; // The structure of the data returned from the API
}

interface ApiCountResponse {
  data: CountModel; // The structure of the data returned from the API;
}

export const getCadenceSteps = async (): Promise<ApiCadenceStepsResponse> => {
  let url = `/api/cadence-steps`;
  const response = await api.get(url);
  console.log("cadence steps response", response);
  return response;
};

export const getCadenceStepsByCadenceId = async ({
  cadenceId,
}: {
  cadenceId: string;
}) => {
  let url = `/api/cadence-steps?cadenceId=${cadenceId}`;
  const response = await api.get(url);
  console.log("cadence steps response", response);
  return response;
};

export const getCadenceStepTotalCount = async ({
  targeted,
}: {
  targeted: boolean;
}): Promise<ApiCountResponse> => {
  let url = "/api/cadenceSteps/total-count";
  if (targeted) {
    url += "?targeted=true";
  }
  const response = await api.get(url);
  return {
    data: {
      count: response.data?.count,
    },
  };
};

export const addCadenceStep = async (
  cadenceStep: BaseCadenceStepModel
): Promise<ApiCadenceStepResponse> => {
  const response = await api.post("api/cadence-steps", cadenceStep);

  if (response.status !== 200) {
    throw new Error("Failed to create cadenceStep");
  }

  return response;
};

export const moveCadenceStep = async ({
  id,
  value,
}: {
  id: string;
  value: number;
}): Promise<ApiSuccessResponse> => {
  return await api.put(`/api/cadence-steps/${id}/move?value=${value}`);
};

export const updateCadenceStep = async ({
  data,
}: {
  data: any;
}): Promise<ApiSuccessResponse> => {
  const updatedCadenceStepData: UpdateCadenceStep = {
    name: data.name,
    interval: data.interval,
    stepType: data.stepType,
    taskNote: data.taskNote,
  };

  return await api.put(`api/cadence-steps/${data.id}`, updatedCadenceStepData);
};

export const deleteCadenceStep = async ({
  id,
}: {
  id: string;
}): Promise<ApiSuccessResponse> => {
  return api.delete(`api/cadence-steps/${id}`);
};
