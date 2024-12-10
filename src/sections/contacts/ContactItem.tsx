import React from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { ContactInCadence } from "@/services/contactsService";
import { classNames } from "@/utils";
import Link from "next/link";
import { getInitials, getRelativeTime } from "@/utils/format";
import { Tooltip } from "react-tooltip";

export default function ContactItem({
  contact,
  handleUpdate,
  onDelete,
}: {
  contact: ContactInCadence;
  handleUpdate: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full py-4 flex items-center border-b hover:bg-gray-100">
      <div className="px-4">
        <input className="shadow-none ring-0 focus:ring-0" type="checkbox" />
      </div>
      <div className="flex items-center flex-1 gap-2 cursor-pointer">
        <div className="flex items-center w-36  overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="text-xs">To:</span>
          <Link href={`/leads/${contact.leadId}`}>
            <span className="text-sm text-blue-900 font-bold hover:underline">
              {contact.firstName} {contact.lastName}
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center gap-2 text-xs text-nowrap">
          <span
            className={classNames(
              "p-1 capitalize rounded-full px-2",
              contact.status === "paused" ? "bg-red-400 text-white" : "",
              contact.status === "active" ? "bg-blue-500 text-white" : "",
              contact.status === "finished" ? "bg-green-500 text-white" : ""
            )}
          >
            {contact.status}
          </span>
          <span className="p-1 px-2 text-white bg-blue-400 rounded-full">
            Step {contact.cadenceCurrentStep}
          </span>
          <span className="p-1 bg-gray-200">{contact.leadStatus}</span>
          <span className="text-sm font-semibold line-clamp-1">
            {contact.jobTitle}
          </span>
          <span className="">@</span>
          <Link href={`/companies/${contact.companyId}`}>
            <span className="text-sm text-blue-600 font-semibold hover:underline">
              {contact.companyName}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span>
            Created At: <br />
            {getRelativeTime(contact.createdAt)}
          </span>
          <a
            data-tooltip-id="contact-ownername"
            data-tooltip-content={`${contact.ownerFirstName} ${contact.ownerLastName}`}
          >
            <p className="p-2 w-8 text-xs text-center rounded-full text-white bg-gray-700 aspect-square">
              {getInitials(
                `${contact.ownerFirstName} ${contact.ownerLastName}`
              )}
            </p>
          </a>
          <Tooltip id="contact-ownername" />
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
            {contact.currentStepStatus === "active" && (
              <MenuItem>
                <button
                  className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                  onClick={() => {
                    const cadenceStepId = contact.cadenceStepId
                      ? contact.cadenceStepId
                      : "";
                    handleUpdate(cadenceStepId, "paused");
                  }}
                >
                  Pause sequence now
                </button>
              </MenuItem>
            )}
            {contact.currentStepStatus === "paused" && (
              <MenuItem>
                <button
                  className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                  onClick={() => {
                    const cadenceStepId = contact.cadenceStepId
                      ? contact.cadenceStepId
                      : "";
                    handleUpdate(cadenceStepId, "active");
                  }}
                >
                  Resume sequence now
                </button>
              </MenuItem>
            )}
            <MenuItem>
              <button
                className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                onClick={() => {
                  const cadenceStepId = contact.cadenceStepId
                    ? contact.cadenceStepId
                    : "";
                  handleUpdate(cadenceStepId, "done");
                }}
              >
                Mark as done
              </button>
            </MenuItem>
            {contact.currentStepStatus !== "finished" && (
              <MenuItem>
                <button
                  className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                  onClick={() => {
                    const cadenceStepId = contact.cadenceStepId
                      ? contact.cadenceStepId
                      : "";
                    handleUpdate(cadenceStepId, "finished");
                  }}
                >
                  Mark as finished
                </button>
              </MenuItem>
            )}
            <MenuItem>
              <button
                className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                onClick={() => {
                  onDelete(contact.cadenceStepId);
                }}
              >
                Remove from cadence
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
