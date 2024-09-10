import { api } from "@/utils/api";
import { CountModel, FetchProps } from "@/types";
import { COMPANY_SIZE, EMAIL_STATUS, SHARE_TYPE } from "@/types/enums";
import { UserModel } from "./userService";

interface FetchCompaniesProps extends FetchProps {}

interface CadenceModel extends BaseCadenceModel {
  id?: string;
}

interface BaseCadenceModel {
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

interface FetchCadenceModel extends CadenceModel, ExtraCadenceModel {}

interface ExtraCadenceModel {
  owner: UserModel;
}

interface ApiCadenceResponse {
  data: FetchCadenceModel;
}

interface ApiCountResponse {
  data: CountModel;
}

export const getCompanies = async (
  data: FetchCompaniesProps = { offset: 0, limit: 100 }
): Promise<ApiCadenceResponse> => {
  const response = await api.get(
    `/api/companies?offset=${data.offset}&limit=${data.limit}`
  );
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
        firstName: response.data?.owner?.name,
        lastName: response.data?.owner?.lastName,
        email: response.data?.owner?.email,
      },
    },
  };
};

export const getCadenceTotalCount = async (): Promise<ApiCountResponse> => {
  const response = await api.get(`/api/companies/total-count`);
  return {
    data: {
      count: response.data?.count,
    },
  };
};

export const addCadence = async (company: BaseCadenceModel) => {
  const response = await api.post("api/companies", company);

  if (response.status !== 200) {
    throw new Error("Failed to create company");
  }
};
