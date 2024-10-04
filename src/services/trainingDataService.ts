import {
  ApiResponseTrainingDataMetrics,
  SuccessModel,
  TrainingDataMetrics,
} from "@/types";
import { api } from "@/utils/api";

export const getTrainingDataMetrics =
  async (): Promise<ApiResponseTrainingDataMetrics> => {
    const response = await api.get("/api/training-data/training-data-metrics");

    return response;
  };

export const updateTrainingDataMetrics = async (
  data: TrainingDataMetrics
): Promise<ApiResponseTrainingDataMetrics> => {
  const response = await api.post(
    "/api/training-data/training-data-metrics",
    data
  );

  return response;
};

export const deleteTrainingDocument = async ({
  id,
}: {
  id: string;
}): Promise<SuccessModel> => {
  return await api.delete(`/api/training-data/training-document/${id}`);
};
