import { api } from "@/utils/api";
import { CountModel, FetchProps } from "@/types";
import { SHARE_TYPE } from "@/types/enums";
import { UserModel } from "./userService";

interface FetchCompaniesProps extends FetchProps {}

export interface CadenceModel extends BaseCadenceModel {
  id?: string;
}

export interface BaseCadenceModel {
  name?: string;

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

  star?: boolean;
  isActive?: boolean;
  stepsCount?: number;
  shareType?: SHARE_TYPE;
  ownerId?: string;

  clonedFromId?: string;
}

export interface FetchCadenceModel extends CadenceModel, ExtraCadenceModel {}

interface ExtraCadenceModel {
  owner: UserModel;
}

export interface ApiCadencesResponse {
  data: FetchCadenceModel[];
}

interface ApiCadenceResponse {
  data: FetchCadenceModel;
}

export interface ApiCountResponse {
  data: CountModel;
}

export const getCadenceById = async (
  id: string
): Promise<ApiCadenceResponse> => {
  const url = `/api/cadences/${id}`;
  const response = await api.get(url);

  return {
    data: {
      id: response.data?.surrogateId,
      name: response.data?.name,
      activeCount: response.data?.activeCount,
      pausedCount: response.data?.pausedCount,
      notSentCount: response.data?.notSentCount,
      bouncedCount: response.data?.bouncedCount,
      finishedCount: response.data?.finishedCount,
      scheduledCount: response.data?.scheduledCount,
      deliveredCount: response.data?.deliveredCount,
      replyCount: response.data?.replyCount,
      interestedCount: response.data?.interestedCount,
      optOutCount: response.data?.optOutCount,
      star: response.data?.star,
      isActive: response.data?.isActive,
      stepsCount: response.data?.stepsCount,
      shareType: response.data?.shareType,
      ownerId: response.data?.ownerId,
      clonedFromId: response.data?.clonedFromId,
      owner: {
        id: response.data?.owner?.surrogateId,
        firstName: response.data?.owner?.firstName,
        lastName: response.data?.owner?.lastName,
        email: response.data?.owner?.email,
      },
    },
  };
};

export const getCadences = async (
  data: FetchCompaniesProps = { offset: 0, limit: 100 }
): Promise<ApiCadenceResponse> => {
  const response = await api.get(
    `/api/cadences?offset=${data.offset}&limit=${data.limit}`
  );
  console.log(response);

  return {
    data: response.data?.map((item: any) => ({
      id: item?.surrogateId,
      name: item?.name,
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
      star: item?.star,
      isActive: item?.isActive,
      stepsCount: item?.stepsCount,
      shareType: item?.shareType,
      ownerId: item?.ownerId,
      clonedFromId: item?.clonedFromId,
      owner: {
        id: item?.owner?.surrogateId,
        firstName: item?.owner?.firstName,
        lastName: item?.owner?.lastName,
        email: item?.owner?.email,
      },
    })),
  };
};

export const getCadenceTotalCount = async (): Promise<ApiCountResponse> => {
  const response = await api.get(`/api/cadences/total-count`);
  return {
    data: {
      count: response.data?.count,
    },
  };
};

export const addCadence = async (cadence: BaseCadenceModel) => {
  const response = await api.post("api/cadences", cadence);

  if (response.status !== 200) {
    throw new Error("Failed to create cadence");
  }
};

export const updateCadence = async ({
  cadenceId,
  updatedCadence,
}: {
  cadenceId: string;
  updatedCadence: BaseCadenceModel;
}): Promise<ApiCadenceResponse> => {
  const url = `api/cadences/${cadenceId}`;
  const response = await api.put(url, updatedCadence);

  return {
    data: {
      id: response.data?.surrogateId,
      name: response.data?.name,
      activeCount: response.data?.activeCount,
      pausedCount: response.data?.pausedCount,
      notSentCount: response.data?.notSentCount,
      bouncedCount: response.data?.bouncedCount,
      finishedCount: response.data?.finishedCount,
      scheduledCount: response.data?.scheduledCount,
      deliveredCount: response.data?.deliveredCount,
      replyCount: response.data?.replyCount,
      interestedCount: response.data?.interestedCount,
      optOutCount: response.data?.optOutCount,
      star: response.data?.star,
      isActive: response.data?.isActive,
      stepsCount: response.data?.stepsCount,
      shareType: response.data?.shareType,
      ownerId: response.data?.ownerId,
      clonedFromId: response.data?.clonedFromId,
      owner: {
        id: response.data?.owner?.surrogateId,
        firstName: response.data?.owner?.firstName,
        lastName: response.data?.owner?.lastName,
        email: response.data?.owner?.email,
      },
    },
  };
};
