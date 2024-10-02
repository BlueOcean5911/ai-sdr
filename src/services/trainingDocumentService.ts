import { ApiResponseTrainingDocuments } from "@/types";
import { api } from "@/utils/api";

export const getCaseStudies =
  async (): Promise<ApiResponseTrainingDocuments> => {
    return api.get("api/training-data/case-studies");
  };

export const getTestimonials =
  async (): Promise<ApiResponseTrainingDocuments> => {
    const response = api.get("api/training-data/testimonials");
    console.log("response", response);
    return response;
  };
