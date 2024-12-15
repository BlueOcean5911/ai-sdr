import { api } from "@/utils/api";
import { UserModel } from "./userService";
import { ApiCountResponse, FetchProps } from "@/types";

interface FetchAlertsProps extends FetchProps {
  search?: string;
  params: { [key: string]: string };
}

export interface AlertModel extends BaseAlertModel {
  id: string;
  dmler: UserModel;
  receptient: UserModel;
  isSelected?: boolean;
}

export interface BaseAlertModel {
  type: string;
  title: string;
  content: string;
  href: string;
  createdAt: string;
  isRead: boolean;
}

export interface UpdateAlertModel {
  type?: string;
  title?: string;
  content?: string;
  href?: string;
  date?: string;
  isRead: boolean;
}

export interface AlertsStatistics {
  total?: number;
  action?: number;
  email?: number;
  call?: number;
  meet?: number;
  linkedin?: number;
}

interface ApiAlertsResponse {
  data: AlertModel[];
}

interface ApiStatisticsResponse {
  data: AlertsStatistics;
}

export const getAlerts = async (
  data: FetchAlertsProps = { offset: 0, limit: 100, params: {} }
): Promise<ApiAlertsResponse> => {
  let url = `/api/alerts?offset=${data.offset}&limit=${data.limit}`;

  const keys = Object.keys(data.params);
  let searchParams = "";

  if (keys.length > 0) {
    searchParams =
      "&" + keys.map((key) => `${key}=${data.params[key]}`).join("&");
  }

  if (data.search) {
    url += `&search=${data.search}`;
  }
  if (searchParams) {
    url += searchParams;
  }
  const response = await api.get(url);
  // console.log(response);
  return {
    data: response.data,
  };
};

export const getAlertTotalCount = async (
  data: FetchAlertsProps = { params: {} }
): Promise<ApiCountResponse> => {
  let url = `/api/alerts/total-count?`;
  //  get search params from current params
  const keys = Object.keys(data.params);
  let searchParams = "";

  if (keys.length > 0) {
    searchParams =
      "&" + keys.map((key) => `${key}=${data.params[key]}`).join("&");
  }

  if (data.search) {
    url += `&search=${data.search}`;
  }
  if (searchParams) {
    url += searchParams;
  }
  const response = await api.get(url);

  return {
    data: {
      count: response.data?.count,
    },
  };
};

export const getAlertsStatistics = async (): Promise<ApiStatisticsResponse> => {
  const response = await api.get(`api/alerts/statistics`);
  // console.log(response);
  return {
    data: response.data,
  };
};

export const addAlert = async (alert: AlertModel) => {
  // console.log("alert data", alert);
  const response = await api.post("api/alerts", alert);
  // console.log("send alert", response.data);
  if (response.status !== 200) {
    throw new Error("Failed to create alert");
  }

  return {
    data: {
      id: response.data.surrogateId,
    },
  };
};

export const updateAlert = async (data: {
  alertId: string;
  updateData: UpdateAlertModel;
}) => {
  const { alertId, updateData } = data;
  const response = await api.put(`api/alerts/${alertId}`, updateData);
  // console.log("send alert", response.data);
  if (response.status !== 200) {
    throw new Error("Failed to create alert");
  }

  return {
    data: response.data,
  };
};

export const deleteAlert = async (alertId: string) => {
  const response = await api.delete(`api/alerts/${alertId}`);
  console.log("delete alert", response.data);
  if (response.status !== 200) {
    throw new Error("Failed to delete alert");
  }

  return {
    data: {
      success: response.data.success,
    },
  };
};
