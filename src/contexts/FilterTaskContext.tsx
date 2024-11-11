import { stateOptions } from "@/data/filter.data";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

interface TaskFilterConfig {
  params: { [key: string]: string };
  isOpen: boolean;
  fromUser: Option | Option[] | null;
  priority: Option | Option[] | null;
  state: Option | Option[] | null;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  orderBy: string;
  isAscending: boolean | undefined;
  search: string;
}

interface TaskFilterContextType {
  taskFilterConfig: TaskFilterConfig;
  setTaskFilterConfig: React.Dispatch<React.SetStateAction<TaskFilterConfig>>;
}

export const TaskFilterContext = createContext<
  TaskFilterContextType | undefined
>(undefined);

export const TaskFilterProvider = ({ children }: { children: ReactNode }) => {
  const [taskFilterConfig, setTaskFilterConfig] = useState<TaskFilterConfig>({
    params: {},
    isOpen: false,
    fromUser: null,
    priority: null,
    state: [stateOptions[0]],
    fromDate: undefined,
    toDate: undefined,
    orderBy: "",
    isAscending: undefined,
    search: "",
  });

  return (
    <TaskFilterContext.Provider
      value={{ taskFilterConfig, setTaskFilterConfig }}
    >
      {children}
    </TaskFilterContext.Provider>
  );
};

export const useTaskFilter = (): TaskFilterContextType => {
  const context = useContext(TaskFilterContext);
  if (context === undefined) {
    throw new Error("useTaskFilter must be used within an TaskFilterProvider");
  }
  return context;
};
