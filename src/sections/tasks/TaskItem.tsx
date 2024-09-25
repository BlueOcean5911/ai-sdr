import React, { Fragment, useState } from "react";
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

export default function TaskItem({ task }: { task: TaskModel }) {
  const [starred, setStarred] = useState(false);
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
        <div className="min-w-96 max-w-96 flex flex-col gap-1 overflow-hidden">
          <span className="text-sm font-semibold text-blue-900 line-clamp-1">
            {task.title}
          </span>
          <span className="text-xs line-clamp-1">
            {task.status}: {task.description}
          </span>
        </div>

        <div className="min-w-64 flex flex-1 flex-row justify-between items-center gap-2">
          <span className="p-1 text-xs font-semibold text-nowrap rounded-sm bg-gray-100">
            {task.type}
          </span>

          <div className="flex items-center gap-4 text-xs">
            <span className="px-1 flex flex-1 justify-center rounded-sm bg-orange-500 text-white">
              {task.priority}
            </span>
            <span>{formatDate(task.dueDate)}</span>
            <p className="p-2 w-8 text-xs text-center rounded-full text-white bg-gray-700 aspect-square">
              {getInitials(task.assignee)}
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
            className="flex flex-col w-56 origin-top-right bg-white rounded-md shadow-md border border-white/5 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
          >
            <MenuItem>
              <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                Delete
              </button>
            </MenuItem>
            <MenuItem>
              <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                CRM Sync History
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
