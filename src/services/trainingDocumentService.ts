import { ApiResponseTrainingDocuments } from "@/types";
import { api } from "@/utils/api";

export const getCaseStudies =
  async (): Promise<ApiResponseTrainingDocuments> => {
    return api.get("api/training-data/case-studies");
  };
