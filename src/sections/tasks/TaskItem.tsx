import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";

import { TaskModel } from "@/services/taskService";
import { formatDate, getInitials } from "@/utils/format";
import { getUsers, UserModel } from "@/services/userService";
import { runService, handleError } from "@/utils/service_utils";
import { TASK_STATE } from "@/types/enums";
import { taskTypeIcons } from "@/types";
import { TaskType } from "@/types";
import { getLeadById, LeadModelWithCompanyModel } from "@/services/leadService";

export default function TaskItem({
  task,
  handleEdit,
  handleDelete,
  handleOverview,
  handleUpdate,
}: {
  task: TaskModel;
  handleEdit: () => void;
  handleDelete: () => void;
  handleOverview: () => void;
  handleUpdate: (id: string, type: TASK_STATE) => void;
}) {
  const [users, setUsers] = useState<UserModel[]>();
  const [lead, setLead] = useState<LeadModelWithCompanyModel>();

  const fetchUsers = () => {
    runService(
      undefined,
      getUsers,
      (data) => {
        setUsers(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const fetchLead = () => {
    if (!task.leadId) return;
    runService(
      { id: task.leadId },
      getLeadById,
      (data) => {
        console.log("lead", data);
        setLead(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchUsers();
    fetchLead();
  }, [task]);

  const owner = users?.find((user) => user.id === task.ownerId);
  let ownerName = "";
  if (owner) {
    ownerName += owner.firstName ? owner.firstName : " ";
    ownerName += " ";
    ownerName += owner.lastName ? owner.lastName : " ";
  }

  return (
    <div className="w-full h-20 px-4 py-2 flex items-center gap-2 border-b even:bg-blue-50 hover:bg-gray-100 hover:cursor-pointer">
      <input className="mr-1 shadow-none ring-0 focus:ring-0" type="checkbox" />
      <div className="size-10">{taskTypeIcons[task.taskType as TaskType]}</div>
      <div className="flex justify-between items-center flex-1 gap-4">
        <div
          className="w-1/2 min-w-12 max-w-96 lg:max-w-xl xl:max-w-2xl flex flex-1 flex-col gap-1 overflow-hidden cursor-pointer"
          onClick={handleOverview}
        >
          <span className="text-sm font-semibold text-blue-900 line-clamp-1">
            {task.title}
          </span>
          <span className="text-xs line-clamp-1">{task.content}</span>
        </div>

        <p className="p-2 w-8 h-8 text-xs text-center rounded-full text-white bg-blue-700 aspect-square">
          {getInitials((lead?.firstName ?? "") + " " + (lead?.lastName ?? ""))}
        </p>

        {lead && (
          <div className="w-1/2 min-w-12 max-w-96 lg:max-w-xl xl:max-w-2xl flex flex-1 flex-col gap-1 overflow-hidden cursor-pointer">
            <span className="text-sm font-semibold text-blue-900 line-clamp-1">
              {lead?.firstName} {lead?.lastName}
            </span>
            <span className="text-xs line-clamp-1">
              {lead?.title} at {lead?.company?.name}
            </span>
          </div>
        )}

        <div className="min-w-44 flex flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-xs">
            <span
              className={`px-2 py-0.5 min-w-16 flex flex-1 justify-center capitalize rounded-full ${task.taskPriority} text-white`}
            >
              {task.taskPriority}
            </span>
            <span>{formatDate(task.endDate)}</span>

            <a
              data-tooltip-id="task-ownername"
              data-tooltip-content={`${ownerName}`}
            >
              <p className="p-2 w-8 text-xs text-center rounded-full text-white bg-gray-700 aspect-square">
                {getInitials(ownerName)}
              </p>
            </a>
            <Tooltip id="task-ownername" />
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <Menu>
          <MenuButton className="">
            <div className="p-1 border rounded-md">
              <EllipsisHorizontalIcon className="w-5 h-5 stroke-gray-500" />
            </div>
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="flex flex-col origin-top-right bg-white rounded-md shadow-md border-2 border-white/5 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
          >
            <MenuItem>
              <button
                className="p-2 text-xs font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100"
                onClick={handleEdit}
              >
                Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="p-2 text-xs font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100"
                onClick={handleDelete}
              >
                Delete
              </button>
            </MenuItem>
            <hr />
            {Object.values(TASK_STATE)
              .filter((state) => state !== task.status)
              .map((state) => (
                <MenuItem key={state}>
                  <button
                    className="p-2 text-xs font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100"
                    onClick={() => handleUpdate(task.id, state)}
                  >
                    {`${state.charAt(0).toUpperCase() + state.slice(1)} Task`}
                  </button>
                </MenuItem>
              ))}
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
