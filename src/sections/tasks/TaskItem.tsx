import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { TaskModel } from "@/services/taskService";
import { formatDate, getInitials } from "@/utils/format";
import { getUsers, UserModel } from "@/services/userService";
import { runService, handleError } from "@/utils/service_utils";
import { TASK_STATE } from "@/types/enums";

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
  useEffect(() => {
    fetchUsers();
  }, []);

  const owner = users?.find((user) => user.id === task.ownerId);
  let ownerName = "";
  if (owner) {
    ownerName += owner.firstName ? owner.firstName : " ";
    ownerName += " ";
    ownerName += owner.lastName ? owner.lastName : " ";
  }

  return (
    <div className="w-full h-20 px-4 py-2 flex items-center gap-2 border-b hover:bg-gray-100">
      <input className="mr-1 shadow-none ring-0 focus:ring-0" type="checkbox" />
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

        <div className="min-w-64 flex flex-row justify-between items-center gap-2">
          <span className="px-2 py-0.5 min-w-20 text-xs font-bold text-center text-nowrap rounded-sm bg-gray-100 capitalize">
            {task.taskType}
          </span>

          <div className="flex items-center gap-4 text-xs">
            <span
              className={`px-2 py-0.5 min-w-16 flex flex-1 justify-center capitalize rounded-sm ${task.taskPriority} text-white`}
            >
              {task.taskPriority}
            </span>
            <span>{formatDate(task.endDate)}</span>
            <p className="p-2 w-8 text-xs text-center rounded-full text-white bg-gray-700 aspect-square">
              {getInitials(ownerName)}
            </p>
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
            <MenuItem>
              <button
                className="p-2 text-xs font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100"
                onClick={() => handleUpdate(task.id, TASK_STATE.COMPLETE)}
              >
                Complete Task
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="p-2 text-xs font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100"
                onClick={() => handleUpdate(task.id, TASK_STATE.ARCHIVED)}
              >
                Archive Task
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="p-2 text-xs font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100"
                onClick={() => handleUpdate(task.id, TASK_STATE.SKIPPED)}
              >
                Skip Task
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
