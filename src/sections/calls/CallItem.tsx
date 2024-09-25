import React, { Fragment, useState } from "react";
import { EmailItemProps } from "@/types";
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
import { CallModel } from "@/services/callService";
import { formatDate, formatDateTimeReadable } from "@/utils/format";

export default function CallItem({ call }: { call: CallModel }) {
  return (
    <div className="w-full h-28 py-2 flex items-center border-b hover:bg-gray-100">
      <div className="px-4">
        <input className="shadow-none ring-0 focus:ring-0" type="checkbox" />
      </div>
      <div className="flex items-center flex-1 gap-2 cursor-pointer">
        <div className="min-w-28 flex items-center overflow-hidden max-w-28">
          <span className="text-xs">To:</span>
          <span className="text-sm text-blue-900">{call.title}</span>
        </div>

        <div className="flex flex-1 flex-col gap-0.5 text-xs">
          <span className="font-semibold line-clamp-1">{call.type}</span>
          <span className="line-clamp-2 text-gray-500">{call.status}</span>
          <span className="line-clamp-1 text-blue-500">
            Step {call.priority} of {call.description}
          </span>
        </div>

        <div className="flex  gap-2 text-xs flex-col">
          <p className="p-1 rounded-full bg-gray-100 text-center">
            {call.assignee}
          </p>
          <div className="flex items-center gap-2">
            <span className="px-1 flex flex-1 justify-center bg-orange-500 text-white capitalize">
              {call.assignee}
            </span>
            <span>{formatDate(call.dueDate)}</span>
          </div>
        </div>
      </div>

      <div className="px-4 flex items-center">
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
