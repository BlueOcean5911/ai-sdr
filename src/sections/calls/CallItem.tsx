"use client";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { CallModel } from "@/services/callService";
import { SlCallIn } from "react-icons/sl";
import { SlCallOut } from "react-icons/sl";

import { formatTimestamp } from "@/utils/format";

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
    <tr className="group h-20 even:bg-blue-50 hover:bg-gray-100 hover:cursor-pointer border-b">
      <td className="px-4 py-2 w-10">
        <input
          className="mr-1 shadow-none ring-0 focus:ring-0"
          type="checkbox"
        />
      </td>
      <td className="px-3 py-1" >
        {call.direction === "inbound" ? (
          <SlCallIn className="w-5 h-5 fill-blue-900 stroke-blue-900" />
        ) : (
          <SlCallOut className="w-5 h-5 fill-blue-900 stroke-blue-900" />
        )}
      </td>
      <td className="min-w-32">
        <span className="text-sm font-semibold text-blue-900 line-clamp-1">
          {call.from_formatted || "Unknown"}
        </span>
        <span className="text-xs line-clamp-1">{call.from_ || "Unknown"}</span>
      </td>
      <td className="min-w-32">
        <p className="text-sm font-semibold text-blue-900 line-clamp-1">
          {call.to || "Unknown"}
        </p>
        <p className="text-xs line-clamp-1">
          {call.to_formatted || "Unknown"}
        </p>
      </td>
      <td className="min-w-20">
        <p className="text-sm">{call.start_time.split("T")[0]}</p>
        <span className="text-xs">{call.start_time.split("T")[1].replace("Z", "")}</span>
      </td>
      <td className="min-w-16 p-1 text-xs text-nowrap">
        {formatTimestamp(call.duration)}
      </td>
      <td className="min-w-32 p-1 text-xs font-semibold text-nowrap capitalize">
        {call.status}
      </td>
      <td className="min-w-20 p-1 text-xs font-semibold text-nowrap">
        {call.price}
      </td>
      <td className="min-w-32 p-1 text-xs font-semibold text-nowrap">
        {call.price_unit}
      </td>
      <td className="">
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
      </td>
    </tr>
  );
}

