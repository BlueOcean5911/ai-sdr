import { api } from "@/utils/api";

export const oauthHubspot = async (props: { code: string }) => {
  const { code } = props;

  const response = await api.get(
    `/api/integration/hubspot/callback?code=${code}`
  );

  return response;
};

export const checkIfConnectionExists = async (props: { code: string }) => {
  const response = await api.get("api/integration/hubspot/connection-exists");

  return response;
};
