import { api } from "@/utils/api";

export interface TemplateModel {
  id?: string;
  archivedAt?: Date | null;
  bodyHtml?: string | null;
  bodyText?: string | null;
  deliverCount?: number;
  failureCount?: number;
  name?: string | null;
  openCount?: number;
  optOutCount?: number;
  ownerId?: string | null;
  replyCount?: number;
  shareType?: boolean;
  subject?: string | null;
  clonedFromId?: string | null;
}

export interface TemplateUpdateModel {
  subject?: string | null;
  bodyText?: string | null;
  bodyHtml?: string | null;
  shareType?: boolean | null;
  clonedFromId?: string | null;
}

interface ApiTemplateResponse {
  data: TemplateModel;
}

const getModelFromResponse = (response: any): TemplateModel => {
  return {
    id: response.data?.surrogateId,
    archivedAt: response.data?.archivedAt,
    bodyHtml: response.data?.bodyHtml,
    bodyText: response.data?.bodyText,
    deliverCount: response.data?.deliverCount,
    failureCount: response.data?.failureCount,
    name: response.data?.name,
    openCount: response.data?.openCount,
    optOutCount: response.data?.optOutCount,
    replyCount: response.data?.replyCount,
    shareType: response.data?.shareType,
    subject: response.data?.subject,
    clonedFromId: response.data?.clonedFromId,
  };
};

export const getTemplate = async (id: string): Promise<ApiTemplateResponse> => {
  const response = await api.get(`api/templates/${id}`);

  return {
    data: getModelFromResponse(response),
  };
};

export const updateTemplate = async (data: {
  id: string;
  updateData: TemplateUpdateModel;
}): Promise<ApiTemplateResponse> => {
  const { id, updateData } = data;
  const response = await api.put(`api/templates/${id}`, updateData);

  return {
    data: getModelFromResponse(response),
  };
};

export const sendTemplateToMe = async (id: string): Promise<boolean> => {
  try {
    await api.post(`api/templates/${id}/send-to-me`);
    return true;
  } catch (e) {
    console.log("sendTemplateToMe", e);
    throw new Error("Failed to send template to me");
  }
};
