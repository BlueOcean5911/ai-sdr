import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { useTwilioContext } from "@/contexts/TwilioContext";
import { Fragment } from "react";

const CallModal = () => {
  const {
    callStatus,
    callDuration,
    handleAcceptCall,
    handleRejectCall,
    handleHangUp,
  } = useTwilioContext();

  const show =
    callStatus === "incoming" ||
    callStatus === "outgoing" ||
    callStatus === "connected";

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative" onClose={() => {}}>
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
                <DialogPanel className="max-w-sm w-full flex flex-col rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="px-6 py-3 text-lg font-semibold leading-6 bg-white text-gray-900 rounded-md"
                  >
                    Call Modal
                  </DialogTitle>
                  <div className="p-6 flex flex-col gap-2">
                    <p className="capitalize">Call Status: {callStatus}</p>
                    {callStatus === "connected" ? (
                      <>Duration: {callDuration}</>
                    ) : (
                      <></>
                    )}
                    {callStatus === "connected" || callStatus === "outgoing" ? (
                      <div className="w-full flex justify-center items-center">
                        <button
                          className="w-1/2 p-2 border rounded-md text-white bg-red-500"
                          onClick={handleHangUp}
                        >
                          Hang Up
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center gap-2">
                        <button
                          className="w-full p-2 border rounded-md text-white bg-green-500"
                          onClick={handleAcceptCall}
                        >
                          Accept Call
                        </button>
                        <button
                          className="w-full p-2 border rounded-md text-white bg-red-500"
                          onClick={handleRejectCall}
                        >
                          Reject Call
                        </button>
                      </div>
                    )}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CallModal;
