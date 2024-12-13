import React from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { ContactInCadence } from "@/services/contactsService";
import { classNames } from "@/utils";
import Link from "next/link";
import { getInitials, getRelativeTime } from "@/utils/format";
import { Tooltip } from "react-tooltip";
import { useCadence } from "@/contexts/CadenceContext";
import { LEAD_STAGE, LEAD_STATUS_IN_CADENCE } from "@/types/enums";
import FinishCadenceModal from "./FinishCadenceModdal";
import { handleError, runService } from "@/utils/service_utils";
import { updateLead } from "@/services/leadService";

export default function ContactItem({
  contact,
  pause,
  resume,
  remove,
  finish,
}: {
  contact: ContactInCadence;
  pause: (contactId: string, cadenceId: string) => void;
  resume: (contactId: string, cadenceId: string) => void;
  remove: (contactId: string, cadenceId: string) => void;
  finish: (contactId: string, cadenceId: string, leadStage: LEAD_STAGE) => void;
}) {
  const { cadence } = useCadence();
  const [open, setOpen] = React.useState(false);

  const handleMarkAsFinished = (actionIndex: number) => {
    let leadStage: LEAD_STAGE = contact.leadStatus;
    if (actionIndex === 0) {
      leadStage = LEAD_STAGE.REPLIED;
    } else if (actionIndex === 1) {
      leadStage = LEAD_STAGE.INTERESTED;
    } else if (actionIndex === 2) {
      leadStage = LEAD_STAGE.DO_NOT_CONTACT;
    } else if (actionIndex === 3) {
      leadStage = LEAD_STAGE.CHANGED_JOB;
    }

    finish(contact.leadId, cadence.id, leadStage);
    setOpen(false);
  };
  return (
    <tr className="group h-20 even:bg-blue-50 hover:bg-gray-100 hover:cursor-pointer border-b">
      <td className="px-4">
        <input className="shadow-none ring-0 focus:ring-0" type="checkbox" />
      </td>
      <td>
        <div className="flex items-center w-36  overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="text-xs">To:</span>
          <Link href={`/leads/${contact.leadId}`}>
            <span className="text-sm text-blue-900 font-bold hover:underline">
              {contact.firstName} {contact.lastName}
            </span>
          </Link>
        </div>
      </td>
      <td>
        <span
          className={classNames(
            "p-1 text-xs capitalize rounded-full px-2",
            contact.status === LEAD_STATUS_IN_CADENCE.PAUSED
              ? "bg-red-400 text-white"
              : "",
            contact.status === LEAD_STATUS_IN_CADENCE.ACTIVE
              ? "bg-blue-500 text-white"
              : "",
            contact.status === LEAD_STATUS_IN_CADENCE.REMOVED
              ? "bg-gray-500 text-white"
              : "",
            contact.status === LEAD_STATUS_IN_CADENCE.FINISHED
              ? "bg-green-500 text-white"
              : ""
          )}
        >
          {contact.status}
        </span>
      </td>
      <td>
        <span className="p-1 px-2 text-xs text-white bg-blue-400 rounded-full">
          Step {contact.cadenceCurrentStep}
        </span>
      </td>
      <td>
        <div className="flex flex-1 items-center gap-2 text-xs text-nowrap">
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
      </td>

      <td>
        <div className="flex items-center gap-2 text-xs">
          <span>
            Created At: <br />
            {getRelativeTime(contact.createdAt)}
          </span>
        </div>
      </td>
      <td>
        <div className="flex justify-center items-center">
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
      </td>

      <td className="px-4">
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
            {contact.status === LEAD_STATUS_IN_CADENCE.ACTIVE && (
              <MenuItem>
                <button
                  className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                  onClick={() => {
                    pause(contact.leadId, cadence.id);
                  }}
                >
                  Pause sequence now
                </button>
              </MenuItem>
            )}
            {contact.status === LEAD_STATUS_IN_CADENCE.PAUSED && (
              <MenuItem>
                <button
                  className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                  onClick={() => {
                    resume(contact.leadId, cadence.id);
                  }}
                >
                  Resume sequence now
                </button>
              </MenuItem>
            )}
            {contact.status !== LEAD_STATUS_IN_CADENCE.FINISHED &&
              contact.status !== LEAD_STATUS_IN_CADENCE.REMOVED && (
                <MenuItem>
                  <button
                    className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                    onClick={() => setOpen(true)}
                  >
                    Mark as finished
                  </button>
                </MenuItem>
              )}
            {contact.status !== LEAD_STATUS_IN_CADENCE.REMOVED && (
              <MenuItem>
                <button
                  className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                  onClick={() => {
                    remove(contact.leadId, cadence.id);
                  }}
                >
                  Remove from cadence
                </button>
              </MenuItem>
            )}
          </MenuItems>
        </Menu>
      </td>
      <FinishCadenceModal
        open={open}
        onClose={() => setOpen(false)}
        handleMarkAsFinished={handleMarkAsFinished}
        contactName={`${contact.firstName} ${contact.lastName}`}
        cadenceName={cadence.name}
      />
    </tr>
  );
}
