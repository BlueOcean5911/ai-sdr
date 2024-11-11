import { DeleteUserProps } from "@/types";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment } from "react";

export default function DeleteUser({
  open,
  user,
  handleDelete,
  handleClose,
}: DeleteUserProps) {
  return (
    <>
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
                <DialogPanel className="max-w-lg w-full flex flex-col rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="px-6 py-3 text-lg font-semibold leading-6 bg-white text-gray-900 rounded-md"
                  >
                    Delete User
                  </DialogTitle>
                  <div className="px-6 py-3 flex flex-col gap-2 text-sm bg-gray-50 rounded-md">
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold text-red-600 py-4">
                        Are you sure?
                      </p>
                    </div>

                    <div className="pt-2 flex justify-end gap-4 text-sm">
                      <button
                        className="btn-primary bg-red-400 hover:bg-red-500"
                        onClick={() =>
                          handleDelete(user && user.id ? user.id : "")
                        }
                      >
                        Delete
                      </button>
                      <button className="btn-secondary" onClick={handleClose}>
                        Close
                      </button>
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
