import ActionItemIcon from "@/components/Icons/actionitem.icon";
import AutomaticEmailIcon from "@/components/Icons/automaticemail.icon";
import LinkedinInteractIcon from "@/components/Icons/linkedininteract.icon";
import LinkedinMessageIcon from "@/components/Icons/linkedinmessage.icon";
import LinkedinRequestIcon from "@/components/Icons/linkedinrequest.icon";
import LinkedinViewIcon from "@/components/Icons/linkedinview.icon";
import ManualEmailIcon from "@/components/Icons/manualmail.icon";
import PhoneCallIcon from "@/components/Icons/phonecall.icon";
import { BaseCadenceStepModel } from "@/services/cadenceStepService";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  InformationCircleIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { Fragment, useState } from "react";

export default function AddStep({
  handleCreateStep,
}: {
  handleCreateStep: (data: BaseCadenceStepModel) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [more, setMore] = useState(false);
  const [startNow, setStartNow] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    setMore(false);
    setStartNow(true);
  }

  const createStep = () => {
    const step: BaseCadenceStepModel = {
      // name:
    };
    handleCreateStep(step);
    setIsOpen(false);
  };

  return (
    <>
      <div className="w-28 flex items-center">
        <button
          className="h-8 px-3 rounded-md text-sm text-white bg-blue-900 data-[focus]:bg-blue-500"
          onClick={openModal}
        >
          Add a step
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative" onClose={closeModal}>
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
                    className="px-6 py-3 flex justify-between text-lg font-semibold leading-6 bg-white text-gray-900"
                  >
                    <span>Select a sequence step</span>
                    <div
                      className="p-1 rounded-md cursor-pointer hover:bg-gray-100"
                      onClick={closeModal}
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </div>
                  </DialogTitle>

                  {!more ? (
                    <div className="px-6 py-3 flex flex-col gap-2 bg-gray-50">
                      <p className="text-sm text-gray-500">
                        Add a step for the sequence to follow and automate for
                        you.
                      </p>

                      <div className="py-1">
                        <p className="py-1 text-sm">Automatc</p>
                        <div
                          className="flex flex-1 items-center bg-white rounded-md shadow-md border hover:border-blue-600 cursor-pointer"
                          onClick={() => setMore(true)}
                        >
                          <div className="w-50 p-4 flex justify-between items-center gap-4">
                            <AutomaticEmailIcon />
                            <div className="flex flex-col gap-1">
                              <span className="font-semibold">
                                Automatic email
                              </span>
                              <span className="text-sm">
                                Emails are delivered automatically.
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <p className="py-1 text-sm">Task</p>
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-1 items-center bg-white rounded-md shadow-md border hover:border-blue-600 cursor-pointer">
                            <div className="w-50 p-4 flex justify-between items-center gap-4">
                              <ManualEmailIcon />
                              <div className="flex flex-col gap-1">
                                <span className="font-semibold">
                                  Manual email
                                </span>
                                <span className="text-sm">
                                  Task is created to edit and deliver email.
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-1 items-center bg-white rounded-md shadow-md border hover:border-blue-600 cursor-pointer">
                            <div className="w-50 p-4 flex justify-between items-center gap-4">
                              <PhoneCallIcon />
                              <div className="flex flex-col gap-1">
                                <span className="font-semibold">
                                  Phone Call
                                </span>
                                <span className="text-sm">
                                  Task is created to call prospect.
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-1 items-center bg-white rounded-md shadow-md border hover:border-blue-600 cursor-pointer">
                            <div className="w-50 p-4 flex justify-between items-center gap-4">
                              <ActionItemIcon />
                              <div className="flex flex-col gap-1">
                                <span className="font-semibold">
                                  Action Item
                                </span>
                                <span className="text-sm">
                                  Task is created to perform custom action.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <p className="py-1 flex flex-row items-center gap-1">
                          <span className="text-sm">LinkedIn tasks</span>
                          <InformationCircleIcon className="w-4 h-4" />
                        </p>
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-1 justify-between items-center bg-white rounded-md shadow-md border hover:border-blue-600 cursor-pointer">
                            <div className="w-50 p-4 flex justify-between items-center gap-4">
                              <LinkedinRequestIcon />
                              <div className="flex flex-col gap-1">
                                <span className="font-semibold">
                                  LinkedIn - Send connection request
                                </span>
                                <span className="text-sm">
                                  Send personalized invitations to connect with
                                  contacts for a positive first impression.
                                </span>
                              </div>
                            </div>
                            <div className="px-4 flex items-center">
                              <LockClosedIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
                            </div>
                          </div>
                          <div className="flex flex-1 justify-between items-center bg-white rounded-md shadow-md border hover:border-blue-600 cursor-pointer">
                            <div className="w-50 p-4 flex justify-between items-center gap-4">
                              <LinkedinMessageIcon />
                              <div className="flex flex-col gap-1">
                                <span className="font-semibold">
                                  LinkedIn - Send message
                                </span>
                                <span className="text-sm">
                                  Send personalized direct messages to contacts
                                  you’re connected with to build relationships.
                                </span>
                              </div>
                            </div>
                            <div className="px-4 flex items-center">
                              <LockClosedIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
                            </div>
                          </div>
                          <div className="flex flex-1 justify-between items-center bg-white rounded-md shadow-md border hover:border-blue-600 cursor-pointer">
                            <div className="w-50 p-4 flex justify-between items-center gap-4">
                              <LinkedinViewIcon />
                              <div className="flex flex-col gap-1">
                                <span className="font-semibold">
                                  LinkedIn - View profile
                                </span>
                                <span className="text-sm">
                                  View a contact's LinkedIn profile to gather
                                  key information for more effective engagement.
                                </span>
                              </div>
                            </div>
                            <div className="px-4 flex items-center">
                              <LockClosedIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
                            </div>
                          </div>
                          <div className="flex flex-1 justify-between items-center bg-white rounded-md shadow-md border hover:border-blue-600 cursor-pointer">
                            <div className="w-50 p-4 flex justify-between items-center gap-4">
                              <LinkedinInteractIcon />
                              <div className="flex flex-col gap-1">
                                <span className="font-semibold">
                                  LinkedIn - Interact with post
                                </span>
                                <span className="text-sm">
                                  View a contact's activities and interact with
                                  their recent posts to foster engagement and
                                  boost visibility.
                                </span>
                              </div>
                            </div>
                            <div className="px-4 flex items-center">
                              <LockClosedIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="px-6 py-3 flex flex-col gap-4 bg-gray-50">
                      <div className="flex items-center bg-white rounded-md shadow-md border hover:border-blue-600">
                        <div className="w-50 p-4 flex justify-between items-center gap-4">
                          <AutomaticEmailIcon />
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold">
                              Automatic email
                            </span>
                            <span className="text-sm">
                              Emails are delivered automatically.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <label className="text-sm text-nowrap">Step Name</label>
                        <input className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-900  sm:text-sm sm:leading-6 " />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span>When to start this step:</span>
                        <div className="flex items-center gap-2">
                          <input
                            className="focus:ring-0"
                            type="radio"
                            name="start"
                            id="startNow"
                            checked={startNow}
                            onChange={() => setStartNow(!startNow)}
                          />
                          <label
                            htmlFor="startNow"
                            className="text-sm cursor-pointer"
                          >
                            Immediately after the contact is added to sequence
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            className="focus:ring-0"
                            type="radio"
                            name="start"
                            id="startAfter"
                            checked={!startNow}
                            onChange={() => setStartNow(!startNow)}
                          />
                          <input
                            type="number"
                            name="amount"
                            id="amount"
                            defaultValue={30}
                            className="max-w-24 input-primary"
                            disabled={startNow}
                          />
                          <select
                            disabled={startNow}
                            className="max-w-32  input-primary"
                          >
                            <option value="minutes">minutes</option>
                            <option value="hours">hours</option>
                            <option value="days">days</option>
                          </select>
                          <label
                            htmlFor="startAfter"
                            className="text-sm cursor-pointer"
                          >
                            after the contact is added
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-end gap-4">
                        <button
                          className="px-3 py-1 rounded-md text-sm bg-gray-300 hover:bg-gray-200"
                          onClick={closeModal}
                        >
                          Back
                        </button>
                        <button
                          className="px-3 py-1 rounded-md text-sm text-white bg-blue-500 hover:bg-blue-400"
                          onClick={() => {
                            createStep();
                          }}
                        >
                          Create Step
                        </button>
                      </div>
                    </div>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
