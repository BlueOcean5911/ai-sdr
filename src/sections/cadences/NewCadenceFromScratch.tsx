import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import Select from "@/components/extends/Select/default";
import FormHelperText from "@/components/extends/FormHelperText";

import { getUsers, UserModel } from "@/services/userService";
import { handleError, runService } from "@/utils/service_utils";

const NewCadenceFromScratch = ({
  handleClose,
  handleCreate,
}: {
  handleClose: () => void;
  handleCreate: (name: string, ownerId: string) => void;
}) => {
  const [users, setUsers] = useState<UserModel[]>();

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

  return (
    <>
      <Dialog
        open={true}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={handleClose}
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
                  onClick={handleClose}
                >
                  <XMarkIcon className="w-5 h-5" />
                </div>
              </DialogTitle>
              <Formik
                initialValues={{
                  name: "",
                  ownerId: "",
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required("Cadence name is required"),
                  ownerId: Yup.string().required("Assignee is required"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(false);
                  handleCreate(values.name, values.ownerId);
                  toast.success("Cadence created successfully");
                  setSubmitting(true);
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting,
                  touched,
                  values,
                }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <div className="px-6 py-4 rounded-md bg-gray-100">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex flex-col">
                            <label>Name*</label>
                            <input
                              id="name"
                              type="text"
                              placeholder="Name"
                              className="input-primary max-h-9"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.name && errors.name && (
                              <FormHelperText>{errors.name}</FormHelperText>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <div className="flex flex-col">
                              <label htmlFor="Cadence Owner">
                                Cadence Owner*
                              </label>
                              <Select
                                data={userOptions}
                                defaultValue={userOptions[0]}
                                onChange={(selectedItem) => {
                                  if (
                                    selectedItem &&
                                    selectedItem.value !== values.ownerId
                                  )
                                    setFieldValue(
                                      "ownerId",
                                      selectedItem.value
                                    );
                                }}
                              ></Select>
                              {touched.ownerId && errors.ownerId && (
                                <FormHelperText>
                                  {errors.ownerId}
                                </FormHelperText>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full btn-primary"
                          >
                            Create
                          </button>
                          <button
                            className="w-full btn-secondary"
                            onClick={handleClose}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default NewCadenceFromScratch;
