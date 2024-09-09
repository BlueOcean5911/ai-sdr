import { api } from "@/utils/api";
import { CountModel, FetchProps } from "@/types";
import { COMPANY_SIZE } from "@/types/enums";
interface FetchPersonasProps extends FetchProps {}

interface PersonaModel {
  id?: string; // Assuming surrogate_id is a string
  name?: string;
  jobTitles?: Array<string>;
  industries?: Array<string>;
  location?: string;
  employees?: Array<COMPANY_SIZE>;
}

interface PostPersonModel {
  name?: string;
  jobTitles?: Array<string>;
  industries?: Array<string>;
  location?: string;
  employees?: Array<COMPANY_SIZE>;
}

interface ApiPersonaResponse {
  data: PersonaModel; // The structure of the data returned from the API
}

interface ApiCountResponse {
  data: CountModel; // The structure of the data returned from the API;
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
      employees: response.data?.employees,
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

export const addPersona = async (persona: PostPersonModel) => {
  const response = await api.post(`/api/personas`, persona);

  if (response.status !== 200) {
    throw new Error("Failed to create persona");
  }
};
