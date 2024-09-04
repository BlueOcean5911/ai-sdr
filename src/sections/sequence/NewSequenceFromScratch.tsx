import { removeSpecialCharacters } from "@/utils/string";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-toastify";

const NewSequenceFromScratch = ({
  close,
  click,
}: {
  close: () => void;
  click: () => void;
}) => {
  const [errors, setErrors] = useState({
    name: "",
    subject: "",
    description: "",
  });
  const [values, setValues] = useState({
    name: "",
    description: "",
    subject: "",
  });

  const checkErrors = () => {
    let isValid = true;
    let newErrors = {};

    if (removeSpecialCharacters(values.name).length === 0) {
      newErrors = { ...newErrors, name: "Cadence name is required" };
      isValid = false;
    }
    if (removeSpecialCharacters(values.subject).length === 0) {
      newErrors = { ...newErrors, subject: "Subject is required" };
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
              className="w-full max-w-lg rounded-xl bg-white p-4 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-between border-b-2 border-gray-100 mb-2">
                <h2> New Cadence</h2>
                <XCircleIcon className="w-6 h-6 mr-4 stroke-gray-300 hover:stroke-gray-400" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 text-xs">
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
                  <label>Subject*</label>
                  <input
                    className="input-primary"
                    value={values.subject}
                    onChange={(e) => {
                      if (removeSpecialCharacters(values.subject).length > 0) {
                        setErrors({ ...errors, subject: "" });
                      } else {
                        setErrors({
                          ...errors,
                          subject: "Subject is required",
                        });
                      }
                      setValues({ ...values, subject: e.target.value });
                    }}
                  />
                  {errors.subject.length > 0 && (
                    <p className="text-red-500">{errors.subject}</p>
                  )}
                  <label>Description*</label>
                  <textarea
                    className="input-primary min-h-24"
                    value={values.description}
                    onChange={(e) => {
                      if (
                        removeSpecialCharacters(values.description).length > 0
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
                <div className="flex gap-4 justify-end">
                  <button className="btn-secondary">Cancel</button>
                  <button
                    className="btn-primary"
                    onClick={() => handleCreate()}
                  >
                    Create
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

export default NewSequenceFromScratch;
