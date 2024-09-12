import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const CreateCampaign = ({
  close,
  click: handleClick,
}: {
  close: () => void;
  click?: (type: any) => any;
}) => {
  const router = useRouter();

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
              className="w-full max-w-sm rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="px-6 py-3 flex justify-between items-center rounded-md text-lg font-semibold leading-6 bg-white text-gray-900"
              >
                <span>Create New Campaign</span>
                <div
                  className="p-1 rounded-md hover:bg-gray-100"
                  onClick={close}
                >
                  <XMarkIcon className="w-5 h-5" />
                </div>
              </DialogTitle>
              <div className="p-6 max-w-sm w-full flex flex-col gap-5 rounded-md bg-gray-100">
                <div className="flex items-center">
                  <label className="min-w-24 text-sm" htmlFor="title">
                    Title:
                  </label>
                  <input id="title" type="text" className="input-primary" />
                </div>
                <div className="flex items-center">
                  <label className="min-w-24 text-sm" htmlFor="amount">
                    Amount:
                  </label>
                  <input id="amount" type="text" className="input-primary" />
                </div>
                <div className="flex items-center">
                  <label className="min-w-24 text-sm" htmlFor="desctiption">
                    Description:
                  </label>
                  <input
                    id="desctiption"
                    type="text"
                    className="input-primary"
                  />
                </div>
                <div className="flex items-center">
                  <label className="min-w-24 text-sm" htmlFor="status">
                    Status:
                  </label>
                  <input id="status" type="text" className="input-primary" />
                </div>
                <div className="flex items-center gap-6">
                  <button
                    className="w-full p-1 text-sm rounded-md text-white bg-blue-500 hover:bg-blue-400"
                    onClick={() => router.push("/campaigns/campaign.id/")}
                  >
                    Save
                  </button>
                  <button
                    className="w-full p-1 text-sm rounded-md bg-gray-300 hover:bg-gray-200"
                    onClick={close}
                  >
                    Close
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

export default CreateCampaign;
