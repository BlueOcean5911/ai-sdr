import { useEffect, useMemo, useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  XMarkIcon,
  UserCircleIcon,
  BriefcaseIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
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
    return users
      ? users.map((user) => ({
          name: `${user.firstName} ${user.lastName}`,
          value: user.id,
        }))
      : [];
  }, [users]);

  return (
    <Dialog open={true} onClose={handleClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
          >
            <span className="flex items-center gap-2">
              <SparklesIcon className="h-6 w-6 text-blue-500" />
              New Cadence
            </span>
            <button
              onClick={handleClose}
              className="rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </Dialog.Title>
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
              setSubmitting(true);
              handleCreate(values.name, values.ownerId);
              toast.success("Cadence created successfully");
              setSubmitting(false);
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
              <form noValidate onSubmit={handleSubmit} className="mt-4">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name*
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BriefcaseIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Cadence Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {touched.name && errors.name && (
                      <FormHelperText>{errors.name}</FormHelperText>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="ownerId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Owner*
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserCircleIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <Select
                        data={userOptions}
                        defaultValue={userOptions[0]}
                        onChange={(selectedItem) => {
                          if (
                            selectedItem &&
                            selectedItem.value !== values.ownerId
                          )
                            setFieldValue("ownerId", selectedItem.value);
                        }}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    {touched.ownerId && errors.ownerId && (
                      <FormHelperText>{errors.ownerId}</FormHelperText>
                    )}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    Create
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default NewCadenceFromScratch;
