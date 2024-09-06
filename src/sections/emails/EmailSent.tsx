import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";

export default function EmailSent() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
                    className="px-6 py-3 text-lg font-semibold leading-6 bg-white text-gray-900"
                  >
                    Email Sent
                  </DialogTitle>

                  <div className="px-6 py-3 flex flex-col gap-2 bg-gray-50">
                    <p className="text-sm text-gray-500">
                      Add a step for the sequence to follow and automate for
                      you.
                    </p>

                    <div className="py-1 flex flex-col gap-1">
                      <span>Sent at: Thu, Aug 22, 2024 at 12:54 PM</span>
                      <span>From: Niklaus Anton niklausanton23@gmail.com</span>
                      <span>To: Joyce Jing joyce@zwhrconsulting.com</span>
                      <span>Subject: Solution for General Manager</span>
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
                      <span>Best,</span>
                      <span>Niklaus --</span>
                      <span>Niklaus Anton</span>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
