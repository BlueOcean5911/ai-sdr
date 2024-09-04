import Select from "@/components/extends/Select/default";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XCircle } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const AddCadence = ({
  children,
  open,
  close,
}: {
  children?: React.ReactNode;
  open: boolean;
  close: () => void;
}) => {
  const handleAddToCadence = () => {
    close();
    toast.success("Successfully Added");
  };
  useEffect(() => {
    console.log("open", open);
  });
  return (
    <>
      <div>{children}</div>
      <Dialog
        open={open}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-50 w-screen h-screen overflow-y-auto bg-black/10" />
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="bg-white w-full max-w-md rounded-xl backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex-center justify-between border-b-2 border-gray-100">
                <h3 className="p-2">Add Cadence</h3>
                <XCircle
                  className="w-6 h-6 mr-2 cursor-pointer stroke-gray-300 hover:stroke-gray-500"
                  onClick={close}
                />
              </div>
              <div className="p-2 min-h-32 flex-center flex-col items-center">
                <Select
                  className="w-full"
                  data={[
                    {
                      id: 1,
                      name: "Cadence 1",
                      value: "1",
                    },
                    {
                      id: 2,
                      name: "Cadence 2",
                      value: "2",
                    },
                    {
                      id: 3,
                      name: "Cadence 3",
                      value: "3",
                    },
                  ]}
                />
              </div>

              <div className="flex gap-4 p-2 justify-end">
                <button className="btn-secondary">Cancel</button>
                <button
                  className="btn-primary"
                  onClick={() => handleAddToCadence()}
                >
                  Add Lead to cadence
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddCadence;
