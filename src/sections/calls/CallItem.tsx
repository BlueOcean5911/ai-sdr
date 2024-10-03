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
import { CallModel } from "@/services/callService";
import {
  formatDate,
  formatDateTimeReadable,
  getInitials,
} from "@/utils/format";
import { SlCallIn } from "react-icons/sl";
import { SlCallOut } from "react-icons/sl";

export default function CallItem({
  call,
  handleEdit,
  handleDelete,
}: {
  call: CallModel;
  handleEdit: () => void;
  handleDelete: () => void;
}) {
  return (
    <div className="w-full h-20 px-4 py-2 flex items-center gap-2 border-b hover:bg-gray-100">
      <input className="shadow-none ring-0 focus:ring-0" type="checkbox" />
      <div className="px-3 py-1 cursor-pointer rounded-md hover:bg-gray-100">
        {call.direction ? (
          <SlCallIn className="w-5 h-5 fill-blue-900 stroke-blue-900" />
        ) : (
          <SlCallOut className="w-5 h-5 fill-blue-900 stroke-blue-900" />
        )}
      </div>
      <div className="flex items-center flex-1 gap-4 cursor-pointer">
        <div className="min-w-32 flex flex-col gap-1">
          <span className="text-sm font-semibold text-blue-900 line-clamp-1">
            {call.user}
          </span>
          <span className="text-xs line-clamp-1">{call.userPhone}</span>
        </div>

        <div className="min-w-32 flex flex-col gap-1">
          <span className="text-sm font-semibold text-blue-900 line-clamp-1">
            {call.contact}
          </span>
          <span className="text-xs line-clamp-1">{call.contactPhone}</span>
        </div>

        <div className="min-w-20 flex flex-col gap-1">
          <span className="text-sm">{call.time}</span>
          <span className="text-xs">{call.date}</span>
        </div>

        <span className="min-w-16 p-1 text-xs font-semibold text-nowrap">
          {call.duration}
        </span>

        <span className="min-w-32 p-1 text-xs font-semibold text-nowrap">
          {call.purpose}
        </span>

        <span className="min-w-20 p-1 text-xs font-semibold text-nowrap">
          {call.disposition}
        </span>

        <span className="min-w-32 p-1 text-xs font-semibold text-nowrap">
          {call.note}
        </span>
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
