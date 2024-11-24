import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { LeadModelWithCompanyModel } from "@/services/leadService";
import { useTwilioContext } from "@/contexts/TwilioContext";

export default function SelectPhone({
  open,
  lead,
  handleClose,
}: {
  open: boolean;
  lead: LeadModelWithCompanyModel | undefined;
  handleClose: () => void;
}) {
  const { twilioNumber, setTwilioNumber, handleCallOut } = useTwilioContext();

  const handleCall = (number: string) => {
    console.log("selected phone number: ", number);
    handleCallOut(number);
    handleClose();
  };

  return (
    <>
      {lead && (
        <Transition appear show={open} as={Fragment}>
          <Dialog as="div" className="relative" onClose={handleClose}>
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
                  <DialogPanel className="max-w-2xl w-full flex flex-col rounded-md bg-white text-left align-middle shadow-xl transition-all">
                    <DialogTitle
                      as="h3"
                      className="px-6 py-3 text-lg font-semibold leading-6 bg-white text-gray-900 rounded-md"
                    >
                      Call with {lead.firstName} {lead.lastName}
                    </DialogTitle>
                    <div className="flex flex-col gap-2 p-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                          Your Phone
                        </label>
                        <input type="text" value={twilioNumber} onChange={(e) => setTwilioNumber(e.target.value)} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                          Primary Phone
                        </label>
                        <button
                        className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                          onClick={() =>
                            lead.primaryPhone
                              ? handleCall(lead.primaryPhone)
                              : {}
                          }
                        >
                          {lead.primaryPhone}
                        </button>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                          Mobile Phone
                        </label>
                        <button
                        className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                          onClick={() =>
                            lead.mobilePhone ? handleCall(lead.mobilePhone) : {}
                          }
                        >
                          {lead.mobilePhone}
                        </button>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                          Work Phone
                        </label>
                        <button
                        className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                          onClick={() =>
                            lead.workPhone ? handleCall(lead.workPhone) : {}
                          }
                        >
                          {lead.workPhone}
                        </button>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
