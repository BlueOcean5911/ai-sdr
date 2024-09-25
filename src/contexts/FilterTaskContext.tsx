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
    isOpen: true,
    fromUser: [],
    priority: [],
    search: "",
  });

  const updateTaskFilterConfig = (config: TaskFilterConfig) => {
    setTaskFilterConfig(config);
  };

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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
