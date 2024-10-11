import React, { Fragment, useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  StarIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { TaskModel } from "@/services/taskService";
import {
  formatDate,
  formatDateTimeReadable,
  getInitials,
} from "@/utils/format";
import { getUsers, UserModel } from "@/services/userService";
import { runService, handleError } from "@/utils/service_utils";

export default function TaskItem({
  task,
  handleEdit,
  handleDelete,
}: {
  task: TaskModel;
  handleEdit: () => void;
  handleDelete: () => void;
}) {
  const [users, setUsers] = useState<UserModel[]>();
  const [starred, setStarred] = useState(false);

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
  let displayName = "";
  if (owner) {
    displayName += owner.firstName ? owner.firstName : " ";
    displayName += " ";
    displayName += owner.lastName ? owner.lastName : " ";
  }

  return (
    <div className="w-full h-20 px-4 py-2 flex items-center gap-2 border-b hover:bg-gray-100">
      <input className="shadow-none ring-0 focus:ring-0" type="checkbox" />
      <div
        className="p-1 cursor-pointer rounded-md hover:bg-gray-100"
        onClick={() => setStarred(!starred)}
      >
        <StarIcon
          className={`w-5 h-5 ${
            starred ? "fill-blue-900 stroke-blue-900" : "stroke-gray-500"
          }`}
        />
      </div>
      <div className="flex items-center flex-1 gap-4 cursor-pointer">
        <div className="w-1/2 max-w-96 lg:max-w-xl xl:max-w-2xl flex flex-col gap-1 overflow-hidden">
          <span className="text-sm font-semibold text-blue-900 line-clamp-1">
            {task.title}
          </span>
          <span className="text-xs line-clamp-1">{task.content}</span>
        </div>

        <div className="min-w-64 flex flex-1 flex-row justify-between items-center gap-2">
          <span className="p-1 text-xs font-semibold text-nowrap rounded-sm bg-gray-100 capitalize">
            {task.taskType}
          </span>

          <div className="flex items-center gap-4 text-xs">
            <span
              className={`px-1 flex flex-1 justify-center capitalize rounded-sm ${task.taskPriority} text-white`}
            >
              {task.taskPriority}
            </span>
            <span>{formatDate(task.endDate)}</span>
            <p className="p-2 w-8 text-xs text-center rounded-full text-white bg-gray-700 aspect-square">
              {getInitials(displayName)}
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
            className="flex flex-col w-32 origin-top-right bg-white rounded-md shadow-md border-2 border-white/5 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
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
            <MenuItem>
              <button className="p-2 text-xs font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100">
                CRM Sync History
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
