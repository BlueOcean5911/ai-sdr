import { ApiResponseTrainingDocuments } from "@/types";
import { api } from "@/utils/api";

export const getCaseStudies =
  async (): Promise<ApiResponseTrainingDocuments> => {
    return await api.get("api/training-data/case-studies");
  };

export const getTestimonials =
  async (): Promise<ApiResponseTrainingDocuments> => {
    return await api.get("api/training-data/testimonials");
  };
