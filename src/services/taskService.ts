import { api } from "@/utils/api";
import { ApiCountResponse, FetchProps } from "@/types";
import { MAILING_STATE } from "@/types/enums";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

interface FetchTasksProps extends FetchProps {
  campaignId?: string;
  cadenceId?: string;
  priority?: Option | Option[] | null;
  fromUser?: Option | Option[] | null;
  search?: string;
  params: { [key: string]: string };
}

export interface TaskModel extends BaseTaskModel {
  id: string;
}

export interface BaseTaskModel {
  title: string;
  content: string;
  taskType: string;
  taskPriority: string;
  endDate: string;
  ownerId: string;
  leadId: string;
}

export interface TasksStatistics {
  total?: number;
  action?: number;
  email?: number;
  call?: number;
  meet?: number;
  linkedin?: number;
}

interface ApiTaskResponse {
  data: TaskModel;
}

interface ApiTasksResponse {
  data: TaskModel[];
}

interface ApiStatisticsResponse {
  data: TasksStatistics;
}

export const getTasks = async (
  data: FetchTasksProps = { offset: 0, limit: 100, params: {} }
): Promise<ApiTasksResponse> => {
  let url = `/api/tasks?offset=${data.offset}&limit=${data.limit}`;

  const keys = Object.keys(data.params);
  let searchParams = "";

  if (keys.length > 0) {
    searchParams =
      "&" + keys.map((key) => `${key}=${data.params[key]}`).join("&");
  }
  if (data.campaignId) {
    url += `&campaignId=${data.campaignId}`;
  }
  if (data.cadenceId) {
    url += `&cadenceId=${data.cadenceId}`;
  }
  let userIds: string[] = [];
  if (Array.isArray(data.fromUser)) {
    userIds = data.fromUser.map((option) => option.value);
  } else if (data.fromUser) {
    userIds = [data.fromUser.value];
  } else {
    userIds = [];
  }
  for (const userId of userIds) {
    url += `&userIds=${userId}`;
  }
  let priorities: string[] = [];
  if (Array.isArray(data.priority)) {
    priorities = data.priority.map((option) => option.value);
  } else if (data.priority) {
    priorities = [data.priority.value];
  } else {
    priorities = [];
  }
  for (const priority of priorities) {
    url += `&priorities=${priority}`;
  }
  if (data.search) {
    url += `&search=${data.search}`;
  }
  if (searchParams) {
    url += searchParams;
  }
  const response = await api.get(url);

  return {
    data: response.data,
  };
};

export const getTaskTotalCount = async (
  data: FetchTasksProps = { params: {} }
): Promise<ApiCountResponse> => {
  let url = `/api/tasks/total-count?`;
  //  get search params from current params
  const keys = Object.keys(data.params);
  let searchParams = "";

  if (keys.length > 0) {
    searchParams =
      "&" + keys.map((key) => `${key}=${data.params[key]}`).join("&");
  }
  if (data.campaignId) {
    url += `&campaignId=${data.campaignId}`;
  }
  if (data.cadenceId) {
    url += `&cadenceId=${data.cadenceId}`;
  }
  let userIds: string[] = [];
  if (Array.isArray(data.fromUser)) {
    userIds = data.fromUser.map((option) => option.value);
  } else if (data.fromUser) {
    userIds = [data.fromUser.value];
  } else {
    userIds = [];
  }
  for (const userId of userIds) {
    url += `&userIds=${userId}`;
  }
  let priorities: string[] = [];
  if (Array.isArray(data.priority)) {
    priorities = data.priority.map((option) => option.value);
  } else if (data.priority) {
    priorities = [data.priority.value];
  } else {
    priorities = [];
  }
  for (const priority of priorities) {
    url += `&priorities=${priority}`;
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

export const getTasksStatistics = async (): Promise<ApiStatisticsResponse> => {
  const response = await api.get(`api/tasks/statistics`);
  // console.log(response);
  return {
    data: response.data,
  };
};

export const addTask = async (task: TaskModel) => {
  // console.log("task data", task);
  const response = await api.post("api/tasks", task);
  // console.log("send task", response.data);
  if (response.status !== 200) {
    throw new Error("Failed to create task");
  }

  return {
    data: {
      id: response.data.surrogateId,
    },
  };
};

export const updateTask = async (data: {
  taskId: string;
  updateData: BaseTaskModel;
}) => {
  const { taskId, updateData } = data;
  const response = await api.put(`api/tasks/${taskId}`, updateData);
  console.log("send task", response.data);
  if (response.status !== 200) {
    throw new Error("Failed to create task");
  }

  return {
    data: {
      id: response.data.surrogateId,
    },
  };
};

export const deleteTask = async (taskId: string) => {
  const response = await api.delete(`api/tasks/${taskId}`);
  console.log("delete task", response.data);
  if (response.status !== 200) {
    throw new Error("Failed to delete task");
  }

  return {
    data: {
      success: response.data.success,
    },
  };
};
