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
import { EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MailingModel } from "@/services/mailingService";
import {
  formatDate,
  formatDateTimeReadable,
  stripHtmlTags,
} from "@/utils/format";
import Link from "next/link";
import EmailTrackingStatus from "./EmailTrackingStatus";
import { LEAD_STAGE, MAILING_STATE } from "@/types/enums";
import { EmailContent } from "./EmailContent";
import { getLeadById, LeadModel } from "@/services/leadService";
import { runService } from "@/utils/service_utils";
import dynamic from "next/dynamic";

const EmailSendWindow = dynamic(
  () => import("@/sections/email/EmailSendWindow"),
  {
    ssr: false,
  }
);

export default function EmailItem({
  mailing,
  sendMailing,
  deleteManualMailing,
  deleteMailingInCadence,
  skipMailingInCadence,
  markAsInterested,
}: {
  mailing: MailingModel;
  sendMailing: (mailingId: string, cadenceStateId?: string) => void;
  deleteManualMailing: (mailingId: string) => void;
  deleteMailingInCadence: (mailingId: string) => void;
  skipMailingInCadence: (mailingId: string) => void;
  markAsInterested: (leadId: string) => void;
}) {
  const [sent, setSent] = useState(false);
  const [isOpenSendEmail, setIsOpenSendEmail] = useState(false);
  const [lead, setLead] = useState<LeadModel>();
  const handleReplyToThread = () => {
    setIsOpenSendEmail(true);
  };

  const fetchLead = async (leadId: string) => {
    runService(
      { id: leadId },
      getLeadById,
      (data) => {
        setLead(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    fetchLead(mailing.leadId);
  }, []);

  return (
    <tr
      key={mailing.id}
      className="h-24 even:bg-blue-50 hover:bg-gray-300 cursor-pointer"
    >
      <td className="px-4">
        <input className="shadow-none ring-0 focus:ring-0" type="checkbox" />
      </td>
      <td>
        <Link href={`/leads/${mailing.leadId}`}>
          <span className="text-sm text-blue-900 hover:underline">
            {mailing.leadName}
          </span>
        </Link>
      </td>
      <td>
        <div className="flex flex-col gap-0.5 text-xs">
          <div onClick={() => setSent(true)}>
            <span className="font-semibold line-clamp-1 text-sm">
              {mailing.subject}
            </span>
            <span className="line-clamp-2 text-gray-500">
              {stripHtmlTags(mailing.message)}
            </span>
          </div>
          {mailing.cadenceId && (
            <span className="flex items-center gap-1">
              <span className="text-xs">
                Step {mailing.currentCadenceStep} of
              </span>
              <span className="line-clamp-1 text-blue-500 hover:underline">
                <Link href={`/cadences/${mailing.cadenceId}`}>
                  {mailing.cadenceName}
                </Link>
              </span>
            </span>
          )}
        </div>
      </td>

      <td>
        <span className="p-1 text-xs rounded-full bg-gray-100 text-center">
          {mailing.ownerName}
        </span>
      </td>
      <td>
        <EmailTrackingStatus mailing={mailing} />
      </td>
      <td>
        <span className="text-xs">{formatDate(mailing.stateChangedAt)}</span>
      </td>
      <Transition appear show={sent} as={Fragment}>
        <Dialog as="div" className="relative" onClose={() => setSent(false)}>
          <div className="fixed inset-0 bg-black/65 z-40" />
          <div className="fixed inset-0 py-10 overflow-y-auto z-40">
            <div className="flex min-h-full items-center justify-center text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="max-w-2xl w-full flex flex-col transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="px-6 py-3 flex justify-between items-center text-lg font-semibold leading-6 bg-white text-gray-900"
                  >
                    <span>Email</span>
                    <div
                      className="p-1 rounded-md hover:bg-gray-100"
                      onClick={() => setSent(false)}
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </div>
                  </DialogTitle>

                  <div className="px-6 py-6 flex flex-col gap-6 bg-gray-50 text-sm">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row items-center gap-2">
                        <span className="font-semibold">
                          <span className="capitalize">
                            {mailing.mailingStatus}
                          </span>{" "}
                          at:
                        </span>
                        <span>
                          {formatDateTimeReadable(mailing.scheduledAt)}
                        </span>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <span className="font-semibold">From:</span>
                        <span>{mailing.ownerName}</span>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <span className="font-semibold">To:</span>
                        <span>{mailing.leadName}</span>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <span className="font-semibold">Subject:</span>
                        <span>{mailing.subject}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 bg-gray-100 p-2 px-4">
                      <EmailContent content={mailing.message} />
                    </div>
                    <div className="flex justify-between">
                      <span className="btn-primary capitalize">
                        {mailing.mailingStatus}
                      </span>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      <td className="px-4">
        <Menu>
          <MenuButton>
            <div className="p-1 border rounded-md hover:bg-white">
              <EllipsisHorizontalIcon className="w-5 h-5 stroke-gray-500" />
            </div>
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="flex flex-col w-56 origin-top-right bg-white rounded-md shadow-md border border-white/5 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
          >
            {mailing.mailingStatus === MAILING_STATE.BOUNCED && (
              <MenuItem>
                <button
                  className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                  onClick={() => {
                    sendMailing(mailing.id, mailing.cadenceStateId);
                  }}
                >
                  Resend Email
                </button>
              </MenuItem>
            )}
            {mailing.mailingStatus === MAILING_STATE.SCHEDULED && (
              <>
                <MenuItem>
                  <button
                    className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                    onClick={() => {
                      sendMailing(mailing.id, mailing.cadenceStateId);
                    }}
                  >
                    Send Now
                  </button>
                </MenuItem>
                {mailing.cadenceId ? (
                  <>
                    <MenuItem>
                      <button
                        className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                        onClick={() => skipMailingInCadence(mailing.id)}
                      >
                        Skip Email and Continue Cadence
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                        onClick={() => deleteMailingInCadence(mailing.id)}
                      >
                        Delete Email and Finish Cadence
                      </button>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem>
                    <button
                      className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                      onClick={() => deleteManualMailing(mailing.id)}
                    >
                      Delete
                    </button>
                  </MenuItem>
                )}
              </>
            )}
            {(mailing.mailingStatus === MAILING_STATE.DELIVERED ||
              mailing.mailingStatus === MAILING_STATE.OPENED ||
              mailing.mailingStatus === MAILING_STATE.REPLIED) && (
              <>
                {mailing.leadStage !== LEAD_STAGE.INTERESTED && (
                  <MenuItem>
                    <button
                      className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                      onClick={() => {
                        markAsInterested(mailing.leadId);
                      }}
                    >
                      Mark as Interested
                    </button>
                  </MenuItem>
                )}
                <MenuItem>
                  <button
                    className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                    onClick={() => {
                      handleReplyToThread();
                    }}
                  >
                    Reply to Thread
                  </button>
                </MenuItem>
              </>
            )}
          </MenuItems>
        </Menu>
      </td>
      {isOpenSendEmail && lead && (
        <>
          <EmailSendWindow
            close={() => setIsOpenSendEmail(false)}
            lead={lead}
            fromEmail={mailing.fromEmail}
            threadId={mailing.threadId}
            messageId={mailing.messageId}
          />
        </>
      )}
    </tr>
  );
}
