"use client";
import Pagination from "@/components/extends/Pagination/Pagination";
import { useTaskFilter } from "@/contexts/FilterTaskContext";
import FilterTask from "@/components/Filter/filterTask";
import TaskToolbar from "@/sections/tasks/TaskToolbar";
import TaskItem from "@/sections/tasks/TaskItem";
import { handleError, runService } from "@/utils/service_utils";
import {
  deleteTask,
  getTasks,
  getTaskTotalCount,
  TaskModel,
} from "@/services/taskService";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CreateTask from "@/sections/tasks/CreateTask";
import { taskData } from "@/data/task.data";
import { toast } from "react-toastify";

export default function Tasks(
  { campaignId, cadenceId }: { campaignId?: string; cadenceId?: string } = {
    cadenceId: "",
    campaignId: "",
  }
) {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState<TaskModel>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { taskFilterConfig, setTaskFilterConfig } = useTaskFilter();
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const currentParams = Object.fromEntries(useSearchParams());

  const fetchTasks = (params: { [key: string]: string }) => {
    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    runService(
      {
        offset: offset,
        limit: limit,
        fromUser: taskFilterConfig.fromUser,
        priority: taskFilterConfig.priority,
        search: taskFilterConfig.search,
        params,
      },
      getTasks,
      (data) => {
        setTasks(data);
      },
      (status, error) => {
        handleError(status, error);
        console.log(status, error);
      }
    );
  };

  const fetchTaskTotalCount = (params: { [key: string]: string }) => {
    runService(
      {
        fromUser: taskFilterConfig.fromUser,
        priority: taskFilterConfig.priority,
        search: taskFilterConfig.search,
        params,
      },
      getTaskTotalCount,
      (data) => {
        console.log("Task total", data);
        setTotalCount(data?.count ? data?.count : 0);
      },
      (status, error) => {
        handleError(status, error);
        console.log(status, error);
      }
    );
  };

  useEffect(() => {
    fetchTaskTotalCount(currentParams);
    fetchTasks(currentParams);
  }, []);

  useEffect(() => {
    fetchTaskTotalCount(currentParams);
    fetchTasks(currentParams);
  }, [taskFilterConfig, currentPage, pageSize]);

  const handleCreate = () => {
    setFocus(undefined);
    setOpen(true);
  };

  const handleEdit = (task: TaskModel) => {
    setFocus(task);
    setOpen(true);
  };

  const handleDelete = (taskId: string) => {
    runService(
      taskId,
      deleteTask,
      (data) => {
        if (data.success === true) {
          toast.success("Task delteted successfully");
          fetchTaskTotalCount(currentParams);
          fetchTasks(currentParams);
        } else toast.error("Something went wrong");
      },
      (status, error) => {
        handleError(status, error);
        console.log(status, error);
      }
    );
  };

  return (
    <div className="flex gap-4 p-4 flex-1 overflow-auto">
      {taskFilterConfig.isOpen && <FilterTask />}
      {
        <CreateTask
          open={open}
          task={focus}
          handleSave={() => {}}
          handleClose={() => setOpen(false)}
        />
      }
      <div className="card p-4 pt-7 flex-1 flex flex-col overflow-auto shadow-lg">
        <div className="overflow-auto">
          <TaskToolbar handleCreate={handleCreate} />
        </div>

        {/* Table */}
        <div className="flex flex-1 flex-col w-full py-2 align-middle overflow-auto">
          <div className="h-full border rounded-md overflow-auto">
            {tasks.length > 0 ? (
              tasks.map((task: TaskModel) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  handleEdit={() => handleEdit(task)}
                  handleDelete={() => handleDelete(task.id)}
                />
              ))
            ) : (
              <div className="h-full flex flex-1 justify-center items-center">
                <p>No tasks</p>
              </div>
            )}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-end">
          <Pagination
            className="pagination-bar"
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={(pageSize: number, currentPage: number) => {
              setPageSize(pageSize);
              setCurrentPage(currentPage);
            }}
          />
        </div>
      </div>
    </div>
  );
}
