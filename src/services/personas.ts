import { api } from "@/utils/api";
import { CountModel, FetchProps } from "@/types";
import { COMPANY_SIZE, EMAIL_STATUS } from "@/types/enums";

interface FetchPersonasProps extends FetchProps {}

interface PersonaModel extends BasePersonaModel {
  id?: string;
}

interface BasePersonaModel {
  name?: string;
  jobTitles: Array<string>;
  industries: Array<string>;
  location: string;
  employees: Array<COMPANY_SIZE>;
}

interface ApiPersonaResponse {
  data: PersonaModel;
}

interface ApiCountResponse {
  data: CountModel;
}

export const getPersonas = async (
  data: FetchPersonasProps = { offset: 0, limit: 100 }
): Promise<ApiPersonaResponse> => {
  const response = await api.get(
    `/api/personas?offset=${data.offset}&limit=${data.limit}`
  );
  return {
    data: {
      id: response.data?.surrogateId,
      name: response.data?.name,
      jobTitles: response.data?.jobTitles,
      industries: response.data?.industries,
      location: response.data?.location,
      employees: response.data?.employees as Array<COMPANY_SIZE>,
    },
  };
};

export const getPersonaTotalCount = async (): Promise<ApiCountResponse> => {
  const response = await api.get(`/api/personas/total-count`);
  return {
    data: {
      count: response.data?.count,
    },
  };
};

export const addPersona = async (persona: BasePersonaModel) => {
  const response = await api.post("api/personas", persona);

  if (response.status !== 200) {
    throw new Error("Failed to create persona");
  }
};
