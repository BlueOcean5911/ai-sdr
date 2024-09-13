import { removeSpecialCharacters } from "@/utils/string";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import RSelect from "@/components/extends/Select/default";
import { getUsers, UserModel } from "@/services/userService";
import { handleError, runService } from "@/utils/service_utils";
import FormHelperText from "@/components/extends/FormHelperText";

const NewCadenceFromScratch = ({
  close,
  click,
}: {
  close: () => void;
  click: (name: string, ownerId: string) => void;
}) => {
  const [users, setUsers] = useState<UserModel[]>();
  const [errors, setErrors] = useState({
    name: "",
    ownerId: "",
  });
  const [values, setValues] = useState({
    name: "",
    ownerId: "",
  });

  const fetchUsers = () => {
    runService(
      undefined,
      getUsers,
      (data) => {
        setUsers(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const userOptions = useMemo(() => {
    let options = users
      ? users.map((user) => {
          return {
            name: user.firstName + " " + user.lastName,
            value: user.id,
          };
        })
      : [];
    return options;
  }, [users]);

  const checkErrors = () => {
    let isValid = true;
    let newErrors = {};

    if (removeSpecialCharacters(values.name).length === 0) {
      newErrors = { ...newErrors, name: "Cadence name is required" };
      isValid = false;
    }

    setErrors({ ...errors, ...newErrors });
    return isValid;
  };

  const handleCreate = () => {
    if (checkErrors()) {
      click(values.name, values.ownerId);
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
                <span>New Cadence</span>
                <div
                  className="p-1 rounded-md hover:bg-gray-100"
                  onClick={close}
                >
                  <XMarkIcon className="w-5 h-5" />
                </div>
              </DialogTitle>
              <div className="px-6 py-4 rounded-md bg-gray-100">
                <div className="flex flex-col gap-4">
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
                      <div className="flex flex-col">
                        <label htmlFor="Cadence Owner">Cadence Owner*</label>
                        <RSelect
                          data={userOptions}
                          onChange={(item) => {
                            if (values.ownerId !== item?.value) {
                              setValues({ ...values, ownerId: item?.value });
                            }
                          }}
                        ></RSelect>
                        {errors.ownerId && (
                          <FormHelperText>{errors.ownerId}</FormHelperText>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <button
                      className="w-full p-1 text-sm rounded-md text-white bg-blue-500 hover:bg-blue-400"
                      onClick={() => handleCreate()}
                    >
                      Create
                    </button>
                    <button
                      className="w-full p-1 text-sm rounded-md bg-gray-300 hover:bg-gray-200"
                      onClick={close}
                    >
                      Close
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
