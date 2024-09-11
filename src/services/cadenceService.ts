import { api } from "@/utils/api";
import { CountModel, FetchProps } from "@/types";
import { EMAIL_STATUS, SHARE_TYPE } from "@/types/enums";
import { CompanyModel } from "./companyService";
interface FetchCadencesProps extends FetchProps {
  //   targeted?: boolean;
}

export interface CadenceModel extends BaseCadenceModel {
  id: string;
}

interface BaseCadenceModel {
  archiveAt?: string | number;
  clonedFromId?: string;

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

  name: string;
  star: boolean;
  isActive: boolean;
  stepsCount: number;
  shareType: SHARE_TYPE;
  lastUsedAt: string | number;
  ownerId: string;
}

interface ApiCadenceResponse {
  data: Array<CadenceModel>; // The structure of the data returned from the API
}

interface ApiCountResponse {
  data: CountModel; // The structure of the data returned from the API;
}

export const getCadences = async (
  props: FetchCadencesProps = { offset: 0, limit: 100 }
): Promise<ApiCadenceResponse> => {
  const { offset, limit } = props;
  let url = `/api/cadences/?offset=${offset}&limit=${limit}`;

  const response = await api.get(url);

  let cadences: Array<CadenceModel> = [];
  response.data.forEach((item: any) => {
    cadences.push({
      id: item?.surrogateId,
      archiveAt: item?.archiveAt,
      clonedFromId: item?.clonedFromId,
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
      name: item?.name,
      star: item?.star,
      isActive: item?.isActive,
      stepsCount: item?.stepsCount,
      shareType: item?.shareType,
      lastUsedAt: item?.lastUsedAt,
      ownerId: item?.ownerId,
    });
  });
  return {
    data: cadences,
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
  const response = await api.post("/api/cadences", cadence);
  if (response.status !== 200) {
    throw new Error("Failed to add cadence");
  }
};
