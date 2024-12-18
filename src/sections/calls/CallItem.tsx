"use client";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { CallProps } from "@/services/callService";
import { SlCallIn } from "react-icons/sl";
import { SlCallOut } from "react-icons/sl";
import Link from "next/link";
import { classNames } from "@/utils";
import { formatDateOrTime } from "@/utils/format";

export default function CallItem({
  call,
  handleEdit,
  handleDelete,
}: {
  call: CallProps;
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
      <td className="p-1">
        <div className="flex justify-end pr-8">
          {call.outbound ? (
            <SlCallOut className="w-5 h-5 fill-blue-900 stroke-blue-900" />
          ) : (
            <SlCallIn className="w-5 h-5 fill-blue-900 stroke-blue-900" />
          )}
        </div>
      </td>
      <td className="p-1 text-sm text-nowrap">
        <Link href={`/leads/${call.leadId}`}>
          <span className="block text-blue-900 font-bold hover:underline">
            {call.leadFirstName} {call.leadLastName}
          </span>
        </Link>
        <span
          className={classNames(
            call.leadFirstName || call.leadLastName ? "text-xs" : "text-sm"
          )}
        >
          {call.fromPhoneNumber}
        </span>
      </td>
      <td className="p-1 text-sm text-nowrap">
        <td className="p-1 text-sm text-nowrap">
          <span className="block text-blue-900 font-bold hover:underline">
            {call.userFirstName} {call.userLastName}
          </span>
          <span
            className={classNames(
              call.userFirstName || call.userLastName ? "text-xs" : "text-sm"
            )}
          >
            {call.toPhoneNumber}
          </span>
        </td>
      </td>
      <td className="p-1 text-sm text-nowrap">{call.callDispositionName}</td>
      <td className="p-1 text-sm text-nowrap">{call.callPurposeName}</td>
      <td className="p-1 text-sm text-nowrap capitalize">{call.note}</td>
      <td className="p-1 text-sm text-nowrap capitalize">{call.state}</td>
      <td className="p-1 text-sm text-nowrap capitalize">
        {formatDateOrTime(call.createdAt)}
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
                className="p-2 text-sm font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100"
                onClick={handleEdit}
              >
                Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="p-2 text-sm font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100"
                onClick={handleDelete}
              >
                Delete
              </button>
            </MenuItem>
            <MenuItem>
              <button className="p-2 text-sm font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100">
                CRM Sync History
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </td>
    </tr>
  );
}
