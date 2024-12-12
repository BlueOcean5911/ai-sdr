"use client";

import { useEffect, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { handleError, runService } from "@/utils/service_utils";
import {
  LeadModelWithCompanyModel,
  getLeadById,
  // updateLead,
} from "@/services/leadService";
import {
  getTaskById,
  TaskModel,
  updateTask,
  UpdateTaskModel,
} from "@/services/taskService";
import TaskView from "@/sections/tasks/TaskView";
import LeadView from "@/sections/leads/LeadView";
import { TASK_STATE } from "@/types/enums";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [task, setTask] = useState<TaskModel>();
  const [lead, setLead] = useState<LeadModelWithCompanyModel>();
  const router = useRouter();

  useEffect(() => {
    runService(
      { id: id },
      getTaskById,
      (data) => {
        console.log(data);
        setTask(data);

        runService(
          { id: data.leadId },
          getLeadById,
          (data) => {
            setLead(data);
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    );
  }, [id]);

  const handleUpdateTask = (id: string, data: UpdateTaskModel) => {
    runService(
      { taskId: id, updateData: data },
      updateTask,
      (data) => {
        // console.log("Updated task", data);
        toast.success("Successfully updated");
      },
      (statusCode, error) => {
        handleError(statusCode, error);
        toast.error("Something went wrong");
      }
    );
  };

  return (
    <>
      <div className="w-full flex flex-1 flex-col overflow-auto">
        <div className="px-5 py-2 flex items-center">
          <button
            className="p-1 text-sm rounded-md hover:bg-gray-100"
            onClick={() => router.push("/tasks")}
          >
            Tasks
          </button>
          <ChevronRightIcon className="w-3 h-3" />
          <button className="p-1 text-sm rounded-md hover:bg-gray-100">
            {task?.title}
          </button>
        </div>
        <div className="flex flex-1 flex-row gap-2">
          <TaskView
            task={task}
            handleUpdate={(id, type: string, value: TASK_STATE | string) =>
              handleUpdateTask(id, {
                [type]: value,
              })
            }
          />
          {lead && <LeadView lead={lead} />}
        </div>
      </div>
    </>
  );
}
