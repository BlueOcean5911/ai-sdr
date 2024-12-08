import { ApiSuccessResponse } from "@/types";
import { api } from "@/utils/api";

export interface OAuthRedirect {
  url: string;
}

export interface OAuthRedirectResponse {
  data: OAuthRedirect;
}

export interface CheckModel {
  connected: boolean;
}

export interface CheckModelResponse {
  data: CheckModel;
}

export const checkIfGmailConnected = async (): Promise<CheckModelResponse> => {
  const response = await api.get("/api/mailboxes/gmail/is-connected");
  return response;
};

export const connectWithGmail = async (): Promise<OAuthRedirectResponse> => {
  const response = await api.post("/api/mailboxes/gmail/connect");

  return response;
};

export const disconnectWithGmail = async (): Promise<ApiSuccessResponse> => {
  const response = await api.delete("/api/mailboxes/gmail/disconnect");
  return response;
};
