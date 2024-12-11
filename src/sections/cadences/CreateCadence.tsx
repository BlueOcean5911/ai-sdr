import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowRight, FileText, Sparkles, X } from "lucide-react";
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
              className="w-full max-w-2xl rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 p-4"
            >
              <div className="bg-white rounded-2xl w-full max-w-4xl relative transform transition-all">
                {/* Close Button */}
                <button
                  // onClick={onClose}
                  className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Header */}
                <div className="p-6 pb-0">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Create New Cadence
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Cadences are a series of automated or manual touchpoints and
                    activities, designed to drive deeper engagement with your
                    contacts.
                  </p>
                </div>

                {/* Cards Grid */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* AI-assisted Card */}
                  <button className="group relative bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border-2 border-transparent hover:border-purple-200 transition-all duration-300 hover:shadow-lg text-left">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full -mr-8 -mt-8 opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center mb-4 transition-colors">
                        <Sparkles className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        AI-assisted
                      </h3>
                      <p className="text-sm text-gray-600">
                        Create a cadence with AI-assistance
                      </p>
                    </div>
                  </button>

                  {/* Pre-formatted Card */}
                  <button className="group relative bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl border-2 border-transparent hover:border-amber-200 transition-all duration-300 hover:shadow-lg text-left">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-full -mr-8 -mt-8 opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center mb-4 transition-colors">
                        <FileText className="w-6 h-6 text-amber-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Pre-formatted
                      </h3>
                      <p className="text-sm text-gray-600">
                        Start with one of pre-formatted cadences
                      </p>
                    </div>
                  </button>

                  {/* From Scratch Card */}
                  <button
                    className="group relative bg-gradient-to-br from-rose-50 to-white p-6 rounded-xl border-2 border-transparent hover:border-rose-200 transition-all duration-300 hover:shadow-lg text-left"
                    onClick={() => {
                      if (handleClick) {
                        handleClick("from-scratch");
                      }
                      close();
                    }}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-100 rounded-full -mr-8 -mt-8 opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-rose-100 group-hover:bg-rose-200 flex items-center justify-center mb-4 transition-colors">
                        <ArrowRight className="w-6 h-6 text-rose-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        From scratch
                      </h3>
                      <p className="text-sm text-gray-600">
                        Create new cadence from scratch
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateCadence;
