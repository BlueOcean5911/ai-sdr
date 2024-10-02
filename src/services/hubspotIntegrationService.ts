import { api } from "@/utils/api";

export const fetchHubspotCompanies = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  return await api.get(
    `/api/integration/hubspot/companies?limit=${limit}&offset=${offset}`
  );
};

export const fetchHubspotContacts = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  return await api.get(
    `/api/integration/hubspot/contacts?limit=${limit}&offset=${offset}`
  );
};
