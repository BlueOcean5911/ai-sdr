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
import EmailSendWindow from "@/sections/email/EmailSendWindow";
import { MailingModel } from "@/services/mailingService";
import { formatDate } from "@/utils/format";

export default function EmailItem({ mailing }: { mailing: MailingModel }) {
  const [sent, setSent] = useState(false);

  const router = useRouter();

  return (
    <div className="w-full h-28 py-2 flex items-center border-b hover:bg-gray-100">
      <div className="px-4">
        <input className="shadow-none ring-0 focus:ring-0" type="checkbox" />
      </div>
      <div
        className="flex items-center flex-1 gap-2 cursor-pointer"
        onClick={() => setSent(true)}
      >
        <div className="min-w-28 flex items-center overflow-hidden max-w-28">
          <span className="text-xs">To:</span>
          <span className="text-sm text-blue-900">{mailing.leadName}</span>
        </div>

        <div className="flex flex-1 flex-col gap-0.5 text-xs">
          <span className="font-semibold line-clamp-1">{mailing.subject}</span>
          <span className="line-clamp-2 text-gray-500">{mailing.message}</span>
          <span className="line-clamp-1 text-blue-500">
            Step {mailing.currentCadenceStep} of {mailing.cadenceName}
          </span>
        </div>

        <div className="flex  gap-2 text-xs flex-col">
          <p className="p-1 rounded-full bg-gray-100 text-center">
            {mailing.ownerName}
          </p>
          <div className="flex items-center gap-2">
            <span className="px-1 flex flex-1 justify-center bg-orange-500 text-white capitalize">
              {mailing.mailingStatus}
            </span>
            <span>{formatDate(mailing.scheduledAt)}</span>
          </div>
        </div>
      </div>
      {/* {send ? <EmailSendWindow close={() => setSend(false)} /> : <></>} */}
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
                    <span>Sent Email</span>
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
                        <span className="font-semibold">Sent at:</span>
                        <span>Thu, Aug 22, 2024 at 12:54 PM</span>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <span className="font-semibold">From:</span>
                        <span>Niklaus Anton niklausanton23@gmail.com</span>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <span className="font-semibold">To:</span>
                        <span>Joyce Jing joyce@zwhrconsulting.com</span>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <span className="font-semibold">Subject:</span>
                        <span>Solution for General Manager</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <span>Hi Joyce,</span>
                      <span>
                        Congratulations on your 12-year milestone as a General
                        Manager at ZW HR Consulting Co., Ltd.! Your leadership
                        must have played a pivotal role in the company's
                        success.
                      </span>
                      <span>
                        Noticed that Greate is a General Manager's best friend
                        at times. Niklaus understands the value of Greate's, and
                        we're here to make things easier for you.
                      </span>
                      <span>
                        Greate's can often feel overwhelming, but with our
                        Greate, you'll breeze through them. We've helped
                        businesses like yours before, and I thought you might be
                        interested in how we did that.
                      </span>
                      <span>
                        Could we connect for 15 minutes this week to discuss how
                        Greate can be a solution and not a challenge for you?
                      </span>
                      <span>Best, Niklaus Anton</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="p-1 rounded-md text-white bg-blue-500">
                        Delivered
                      </span>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

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
                Retry
              </button>
            </MenuItem>
            <MenuItem>
              <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                Skip Email and Continue Cadence
              </button>
            </MenuItem>
            <MenuItem>
              <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                Delete Email and Finish Cadence
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
