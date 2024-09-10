import { removeSpecialCharacters } from "@/utils/string";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-toastify";

const NewCadenceFromScratch = ({
  close,
  click,
}: {
  close: () => void;
  click: () => void;
}) => {
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  const [values, setValues] = useState({
    name: "",
    description: "",
  });

  const checkErrors = () => {
    let isValid = true;
    let newErrors = {};

    if (removeSpecialCharacters(values.name).length === 0) {
      newErrors = { ...newErrors, name: "Cadence name is required" };
      isValid = false;
    }
    if (removeSpecialCharacters(values.description).length === 0) {
      newErrors = { ...newErrors, description: "Description is required" };
      isValid = false;
    }

    setErrors({ ...errors, ...newErrors });
    return isValid;
  };

  const handleCreate = () => {
    if (checkErrors()) {
      click();
      toast.success("Cadence created successfully");
    }
  };

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
              className="w-full max-w-lg rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="px-4 py-2 flex justify-between items-center border-b-2">
                <h3>New Cadence</h3>
                <XCircleIcon
                  className="w-6 h-6 hover:stroke-gray-600"
                  onClick={close}
                />
              </div>
              <div className="px-4 py-2 bg-gray-100">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex flex-col">
                      <label>Name*</label>
                      <input
                        className="input-primary"
                        value={values.name}
                        onChange={(e) => {
                          if (removeSpecialCharacters(values.name).length > 0) {
                            setErrors({ ...errors, name: "" });
                          } else {
                            setErrors({
                              ...errors,
                              name: "Cadence name is required",
                            });
                          }
                          setValues({ ...values, name: e.target.value });
                        }}
                      />
                      {errors.name.length > 0 && (
                        <p className="text-red-500">{errors.name}</p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label>Description*</label>
                      <textarea
                        className="input-primary min-h-24"
                        value={values.description}
                        onChange={(e) => {
                          if (
                            removeSpecialCharacters(values.description).length >
                            0
                          ) {
                            setErrors({ ...errors, description: "" });
                          } else {
                            setErrors({
                              ...errors,
                              description: "Description is required",
                            });
                          }
                          setValues({ ...values, description: e.target.value });
                        }}
                      />
                      {errors.description.length > 0 && (
                        <p className="text-red-500">{errors.description}</p>
                      )}
                    </div>
                  </div>
                  <div className=" py-2 flex justify-between gap-4">
                    <button className="w-full px-2 py-1.5 flex justify-center items-center gap-2 border-2 border-gray-300 rounded-md hover:bg-gray-200">
                      Cancel
                    </button>
                    <button
                      className="w-full p-2 flex-center gap-2 rounded-md bg-blue-500 hover:bg-blue-400 cursor-pointer"
                      onClick={() => handleCreate()}
                    >
                      <span className="text-white">Create</span>
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default NewCadenceFromScratch;
