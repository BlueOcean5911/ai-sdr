import { api } from "@/utils/api";
import { CountModel, FetchProps } from "@/types";
import { CADENCE_STEP_TYPE, COMPANY_SIZE, EMAIL_STATUS } from "@/types/enums";
import { boolean } from "yup";
import { TemplateModel } from "./templatesService";

interface FetchCadenceStepsProps extends FetchProps {}

export interface CadenceStepModel extends CadenceStepWithTemplateModel {
  id: string;
}

export interface CadenceStepWithTemplateModel extends BaseCadenceStepModel {
  template: TemplateModel;
}

export interface BaseCadenceStepModel {
  name?: string;
  order?: number;
  taskNote?: string;
  stepType?: CADENCE_STEP_TYPE | string;

  activeCount?: number;
  pausedCount?: number;
  notSentCount?: number;
  bouncedCount?: number;
  finishedCount?: number;

  scheduledCount?: number;
  deliveredCount?: number;
  replyCount?: number;
  interestedCount?: number;
  optOutCount?: number;

  templateId?: string;
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

  return {
    data: response.data?.map((item: any) => ({
      id: item?.surrogateId,
      name: item?.name,
      order: item?.order,
      taskNote: item?.taskNote,
      stepType: item?.stepType,

      activeCount: item?.activeCount,
      pausedCount: item?.pausedCount,
      notSentCount: item?.notSentCount,
      bouncedCount: item?.bouncedCount,
      finishedCount: item?.finishedCount,

      scheduledCount: item?.scheduledCount,
      deliveredCount: item?.deliveredCount,
      replyCount: item?.replyCount,
      interestedCount: item?.interestedCount,
      optOutCount: item?.optOutCount,

      templateId: item?.templateId,

      template: {
        subject: item?.template?.subject,
        bodyText: item?.template?.bodyText,
      },
    })),
  };
};

export const getCadenceStepsByCadenceId = async ({
  cadenceId,
}: {
  cadenceId: string;
}) => {
  let url = `/api/cadence-steps/cadence-id/${cadenceId}`;
  const response = await api.get(url);

  return {
    data: response.data?.map((item: any) => ({
      id: item?.surrogateId,
      name: item?.name,
      order: item?.order,
      taskNote: item?.taskNote,
      stepType: item?.stepType,

      activeCount: item?.activeCount,
      pausedCount: item?.pausedCount,
      notSentCount: item?.notSentCount,
      bouncedCount: item?.bouncedCount,
      finishedCount: item?.finishedCount,

      scheduledCount: item?.scheduledCount,
      deliveredCount: item?.deliveredCount,
      replyCount: item?.replyCount,
      interestedCount: item?.interestedCount,
      optOutCount: item?.optOutCount,

      templateId: item?.templateId,

      template: {
        subject: item?.template?.subject,
        bodyText: item?.template?.bodyText,
      },
    })),
  };
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
  const response = await api.post("api/cadenceSteps", cadenceStep);

  if (response.status !== 200) {
    throw new Error("Failed to create cadenceStep");
  }
  const item = response.data;
  return {
    data: {
      id: item?.surrogateId,
      name: item?.name,
      order: item?.order,
      taskNote: item?.taskNote,
      stepType: item?.stepType,

      activeCount: item?.activeCount,
      pausedCount: item?.pausedCount,
      notSentCount: item?.notSentCount,
      bouncedCount: item?.bouncedCount,
      finishedCount: item?.finishedCount,

      scheduledCount: item?.scheduledCount,
      deliveredCount: item?.deliveredCount,
      replyCount: item?.replyCount,
      interestedCount: item?.interestedCount,
      optOutCount: item?.optOutCount,

      template: {
        subject: item?.template?.subject,
        bodyText: item?.template?.bodyText,
      },
    },
  };
};
