import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  EnvelopeOpenIcon,
  FireIcon,
  PaperAirplaneIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const CreateCadence = ({
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
        <div className="fixed inset-0 bg-black/65 z-40" />
        <div className="fixed inset-0 py-10 overflow-y-auto z-40">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <DialogPanel
              transition
              className="w-full max-w-lg rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="px-6 py-3 flex justify-between items-center rounded-md text-lg font-semibold leading-6 bg-white text-gray-900"
              >
                <span>Create New Cadence</span>
                <div
                  className="p-1 rounded-md hover:bg-gray-100"
                  onClick={close}
                >
                  <XMarkIcon className="w-5 h-5" />
                </div>
              </DialogTitle>
              <div className="px-6 py-6 flex flex-col gap-4 rounded-md bg-gray-100">
                <div className="flex justify-between gap-4">
                  <div
                    // onClick={() => {
                    //   if (handleClick) {
                    //     handleClick("ai-assisted");
                    //   }
                    //   close();
                    // }}
                    className="w-36 p-3 flex flex-col items-center justify-center gap-1 bg-gray-200 border rounded-lg cursor-not-allowed hover:shadow-lg"
                  >
                    {/* <FireIcon className="w-16 h-16 stroke-gray-600 m-4" /> */}
                    <Image
                      src={"/assets/images/icon/aiassisted.svg"}
                      alt="ai assisted"
                      width={72}
                      height={72}
                    />
                    <h4>AI-assisted</h4>
                    <p className="text-xs text-center text-gray-400">
                      Create a cadence with AI-assistance
                    </p>
                  </div>
                  <div
                    // onClick={() => {
                    //   if (handleClick) {
                    //     handleClick("pre-formatted");
                    //   }
                    //   close();
                    // }}
                    className="w-36 p-3 flex flex-col items-center justify-center gap-1 bg-gray-200 border rounded-lg cursor-not-allowed hover:shadow-lg"
                  >
                    {/* <EnvelopeOpenIcon className="w-16 h-16 stroke-gray-600 m-4" /> */}
                    <Image
                      src={"/assets/images/icon/preformatted.svg"}
                      alt="pre formatted"
                      width={72}
                      height={72}
                    />
                    <h4>Pre-formatted</h4>
                    <p className="text-xs text-center text-gray-400">
                      Start with one of pre-formatted cadences
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      if (handleClick) {
                        handleClick("from-scratch");
                      }
                      close();
                    }}
                    className="w-36 p-3 flex flex-col items-center justify-center gap-1 bg-white border rounded-lg cursor-pointer hover:shadow-lg"
                  >
                    {/* <PaperAirplaneIcon className="w-16 h-16 stroke-gray-600 m-4" /> */}
                    <Image
                      src={"/assets/images/icon/fromscratch.svg"}
                      alt="from scratch"
                      width={72}
                      height={72}
                    />
                    <h4>From scratch</h4>
                    <p className="text-xs text-center text-gray-400">
                      Create new cadence from scratch
                    </p>
                  </div>
                </div>
                <p className="text-sm">
                  Cadences are a series of automated or manual touchpoints and
                  activities, designed to drive deeper engagement with your
                  contacts.
                </p>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateCadence;
