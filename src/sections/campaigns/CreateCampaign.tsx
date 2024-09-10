import { Dialog, DialogPanel } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
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
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-black/10" />
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="px-4 py-2 flex justify-between items-center border-b">
                <h3>Create New Campaign</h3>
                <XCircleIcon
                  className="w-6 g-6 hover:stroke-gray-600 cursor-pointer"
                  onClick={close}
                />
              </div>
              <div className="p-8 max-w-lg w-full flex flex-col gap-5 rounded-md bg-gray-100">
                <div className="flex items-center">
                  <label className="min-w-24" htmlFor="title">
                    Title:
                  </label>
                  <input id="title" type="text" className="input-primary" />
                </div>
                <div className="flex items-center">
                  <label className="min-w-24" htmlFor="amount">
                    Amount:
                  </label>
                  <input id="amount" type="text" className="input-primary" />
                </div>
                <div className="flex items-center">
                  <label className="min-w-24" htmlFor="desctiption">
                    Description:
                  </label>
                  <input
                    id="desctiption"
                    type="text"
                    className="input-primary"
                  />
                </div>
                <div className="flex items-center">
                  <label className="min-w-24" htmlFor="status">
                    Status:
                  </label>
                  <input id="status" type="text" className="input-primary" />
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="w-full p-2 rounded-md text-white bg-blue-500 hover:bg-blue-400"
                    onClick={() => router.push("/campaigns/campaign.id/")}
                  >
                    Save
                  </button>
                  <button
                    className="w-full p-2 rounded-md bg-gray-300 hover:bg-gray-200"
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
