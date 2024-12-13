import { toZonedTime } from "date-fns-tz";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

import { TaskModel } from "@/services/taskService";
import { getLeadById, LeadModelWithCompanyModel } from "@/services/leadService";
import { getUsers, UserModel } from "@/services/userService";
import { TaskType, taskTypeIcons } from "@/types";
import { TASK_STATE } from "@/types/enums";
import { formatDateOrTime, getInitials, getUserTimeZone } from "@/utils/format";
import { runService, handleError } from "@/utils/service_utils";
import { classNames } from "@/utils";

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
  handleUpdate: (id: string, type: string, value: TASK_STATE | string) => void;
}) {
  const [users, setUsers] = useState<UserModel[]>();
  const [lead, setLead] = useState<LeadModelWithCompanyModel>();

  const userTimeZone: string = getUserTimeZone();

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
    if (!task.leadId || task.leadId === "none") return;
    runService(
      { id: task.leadId },
      getLeadById,
      (data) => {
        // console.log("lead", data);
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

  const zonedTime = toZonedTime(task.endDate + "Z", userTimeZone);
  const dueDate = formatDateOrTime(zonedTime);
  const owner = users?.find((user) => user.id === task.ownerId);
  let ownerName = "";
  if (owner) {
    ownerName += owner.firstName ? owner.firstName : " ";
    ownerName += " ";
    ownerName += owner.lastName ? owner.lastName : " ";
  }

  return (
    <tr className="group h-20 even:bg-blue-50 hover:bg-gray-100 hover:cursor-pointer border-b">
      <td className="px-4 py-2 w-10">
        <input
          className="mr-1 shadow-none ring-0 focus:ring-0"
          type="checkbox"
        />
      </td>
      <td className="pr-4 py-2 w-14">
        <div className="size-10">
          {taskTypeIcons[task.taskType as TaskType]}
        </div>
      </td>
      <td className="w-1/3 pr-4 py-2" onClick={handleOverview}>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-blue-900 line-clamp-1">
            {task.title}
          </span>
          <span className="text-xs line-clamp-1">{task.content}</span>
          {task.cadenceId && (
            <span className="flex items-center gap-1">
              <span className="text-xs">Step {task.currentCadenceStep} of</span>
              <span className="line-clamp-1 text-sm text-blue-500 hover:underline">
                <Link href={`/cadences/${task.cadenceId}`}>
                  {task.cadenceName}
                </Link>
              </span>
            </span>
          )}
        </div>
      </td>
      <td className="w-1/3 pr-4 py-2">
        {lead && (
          <div className="flex flex-row gap-2 items-center">
            <p className="p-2 w-8 h-8 text-xs text-center rounded-full text-white bg-blue-700 aspect-square">
              {getInitials(
                (lead?.firstName ?? "") + " " + (lead?.lastName ?? "")
              )}
            </p>
            <div className="flex flex-col gap-1">
              <Link
                href={`/leads/${lead.id}`}
                className="text-sm font-semibold text-blue-900 line-clamp-1 hover:underline"
              >
                {lead?.firstName} {lead?.lastName}
              </Link>
              <span className="text-xs line-clamp-1">
                {lead?.title} at {lead?.company?.name}
              </span>
            </div>
          </div>
        )}
      </td>
      <td className="pr-4 py-2">
        <span
          className={`max-w-16 flex flex-1 justify-center text-sm capitalize rounded-full ${task.taskPriority} text-white`}
        >
          {task.taskPriority}
        </span>
      </td>
      <td>
        <span
          className={classNames(
            "text-sm",
            zonedTime < new Date() ? "text-red-500" : ""
          )}
        >
          {dueDate}
        </span>
      </td>
      <td>
        <a
          data-tooltip-id="task-ownername"
          data-tooltip-content={`${ownerName}`}
        >
          <p className="p-2 w-8 text-xs text-center rounded-full text-white bg-gray-700 aspect-square">
            {getInitials(ownerName)}
          </p>
        </a>
        <Tooltip id="task-ownername" className="z-20" />
      </td>
      <td className="px-4 py-2 w-12">
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
            {!task.cadenceId && (
              <MenuItem>
                <button
                  className="p-2 text-xs font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </MenuItem>
            )}
            <hr />
            {Object.values(TASK_STATE)
              .filter((state) => state !== task.status)
              .map((state) => (
                <>
                  {task.cadenceId && state === TASK_STATE.ARCHIVED ? null : (
                    <MenuItem key={state}>
                      <button
                        className="p-2 text-xs font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100"
                        onClick={() => handleUpdate(task.id, "status", state)}
                      >
                        {`${
                          state.charAt(0).toUpperCase() + state.slice(1)
                        } Task`}
                      </button>
                    </MenuItem>
                  )}
                </>
              ))}
          </MenuItems>
        </Menu>
      </td>
    </tr>
  );
}
