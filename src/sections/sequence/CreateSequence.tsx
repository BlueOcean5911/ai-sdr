import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  EnvelopeOpenIcon,
  FireIcon,
  PaperAirplaneIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const CreateSequence = ({
  close,
  click: handleClick,
}: {
  close: () => void;
  click?: (type: any) => any;
}) => {
  return (
    <>
      <Dialog
        open={true}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-black/10" />
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <DialogPanel
              transition
              className="w-full max-w-lg rounded-xl bg-white p-4 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-end">
                <XCircleIcon
                  className="w-6 g-6 stroke-gray-300 hover:stroke-gray-500 cursor-pointer"
                  onClick={close}
                />
              </div>
              <div className="header border-b-2 border-gray-100">
                <h3>Create New Sequence</h3>
                <p className="text-xs text-gray-400 py-2">
                  Sequences are a series of automated or manual touchpoints and
                  activities, designed to drive deeper engagement with your
                  contacts.
                </p>
              </div>
              <div className="flex gap-4 p-4">
                <div
                  onClick={() => {
                    if (handleClick) {
                      handleClick("ai-assisted");
                    }
                    close();
                  }}
                  className="flex flex-col items-center justify-center text-center flex-1 border-gray-100 border-2 rounded-lg p-2 cursor-pointer hover:shadow-lg"
                >
                  <FireIcon className="w-16 h-16 stroke-gray-600 m-6" />
                  <h3>AI-assisted</h3>
                  <p className="text-xs text-gray-400">
                    Create a sequence with AI-assistance
                  </p>
                </div>
                <div
                  onClick={() => {
                    if (handleClick) {
                      handleClick("pre-formatted");
                    }
                    close();
                  }}
                  className="flex flex-col items-center justify-center text-center flex-1 border-gray-100 border-2 rounded-lg p-2 cursor-pointer hover:shadow-lg"
                >
                  <EnvelopeOpenIcon className="w-16 h-16 stroke-gray-600 m-6" />
                  <h3>Pre-formatted</h3>
                  <p className="text-xs text-gray-400">
                    Start with one of pre-formatted sequences
                  </p>
                </div>
                <div
                  onClick={() => {
                    if (handleClick) {
                      handleClick("from-scratch");
                    }
                    close();
                  }}
                  className="flex flex-col items-center justify-center text-center flex-1 border-gray-100 border-2 rounded-lg p-2 cursor-pointer hover:shadow-lg"
                >
                  <PaperAirplaneIcon className="w-16 h-16 stroke-gray-600 m-6" />
                  <h3>From scratch</h3>
                  <p className="text-xs text-gray-400">
                    Create new sequence from scratch
                  </p>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateSequence;
