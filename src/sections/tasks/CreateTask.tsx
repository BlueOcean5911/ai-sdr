import { CreateTaskProps } from "@/types";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment, useState, useEffect, useMemo } from "react";
import { handleError, runService } from "@/utils/service_utils";
import { getUsers, UserModel } from "@/services/userService";
import { addTask, BaseTaskModel } from "@/services/taskService";
import Select from "react-tailwindcss-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormHelperText from "@/components/extends/FormHelperText";
import { toast } from "react-toastify";
import RSelect from "@/components/extends/Select/default";
import { useTaskFilter } from "@/contexts/FilterTaskContext";

export default function CreateTask({
  open,
  task = undefined,
  handleSave,
  handleClose,
}: CreateTaskProps) {
  const [users, setUsers] = useState<UserModel[]>();
  const { setTaskFilterConfig } = useTaskFilter();
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
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative" onClose={handleClose}>
          <div className="fixed inset-0 bg-black/65 z-40" />
          <div className="fixed inset-0 py-10 overflow-y-auto z-40">
            <div className="flex min-h-full items-center justify-center text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="max-w-2xl w-full flex flex-col rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="px-6 py-3 text-lg font-semibold leading-6 bg-white text-gray-900 rounded-md"
                  >
                    {task ? "Edit" : "Create New"} Task
                  </DialogTitle>
                  <Formik
                    initialValues={{
                      contacts: task ? task.contacts : "",
                      type: task ? task.type : "",
                      assignee: task ? task.assignee : "",
                      priority: task ? task.priority : "",
                      dueDate: task ? task.dueDate : "",
                      note: task ? task.note : "",
                    }}
                    validationSchema={Yup.object().shape({
                      contacts: Yup.string().required("Contacts is required"),
                      note: Yup.string().required("Note is required"),
                      type: Yup.string().required("Type is required"),
                      priority: Yup.string().required("Priority is required"),
                      assignee: Yup.string().required("Assignee is required"),
                      dueDate: Yup.string().required("Due date is required"),
                    })}
                    onSubmit={async (
                      values,
                      { setErrors, setStatus, setSubmitting }
                    ) => {
                      let newTask: BaseTaskModel = {
                        contacts: values.contacts,
                        note: values.note,
                        type: values.type,
                        priority: values.priority,
                        assignee: values.assignee,
                        dueDate: values.dueDate,
                      };
                      runService(
                        newTask,
                        addTask,
                        (data) => {
                          setTaskFilterConfig((prev) => ({
                            ...prev,
                            createdTaskId: data.id,
                          }));
                          toast.success("Task created successfully");
                          handleClose();
                        },
                        (status, error) => {
                          console.log(status, error);
                          toast.error(error);
                        }
                      );
                    }}
                  >
                    {({
                      errors,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                      touched,
                      values,
                    }) => (
                      <form noValidate onSubmit={handleSubmit}>
                        <div className="px-6 py-3 flex flex-col gap-2 text-sm bg-gray-50 rounded-md">
                          <div className="w-full flex flex-col gap-1">
                            <label htmlFor="contacts">Contacts:</label>
                            <input
                              id="contacts"
                              type="text"
                              placeholder="Contacts"
                              className="input-primary max-h-9"
                              value={values.contacts}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.contacts && errors.contacts && (
                              <FormHelperText>{errors.contacts}</FormHelperText>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <div className="w-1/2 flex flex-col gap-1">
                              <label htmlFor="type">Type:</label>
                              <input
                                id="type"
                                type="text"
                                placeholder="Type"
                                className="input-primary max-h-9"
                                value={values.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.type && errors.type && (
                                <FormHelperText>{errors.type}</FormHelperText>
                              )}
                            </div>
                            <div className="w-1/2 flex flex-col gap-1">
                              <label htmlFor="assignee">Assignee:</label>
                              <input
                                id="assignee"
                                type="text"
                                placeholder="Assignee"
                                className="input-primary max-h-9"
                                value={values.assignee}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.assignee && errors.assignee && (
                                <FormHelperText>
                                  {errors.assignee}
                                </FormHelperText>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <div className="w-3/4 flex flex-col gap-1">
                              <label htmlFor="priority">Priority:</label>
                              <input
                                id="priority"
                                type="text"
                                placeholder="Priority"
                                className="input-primary max-h-9"
                                value={values.priority}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.priority && errors.priority && (
                                <FormHelperText>
                                  {errors.priority}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="w-1/4 flex flex-col gap-1">
                              <label htmlFor="dueDate">Due Date:</label>
                              <input
                                id="dueDate"
                                type="text"
                                placeholder="Due Date"
                                className="input-primary max-h-9"
                                value={values.dueDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.dueDate && errors.dueDate && (
                                <FormHelperText>
                                  {errors.dueDate}
                                </FormHelperText>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label htmlFor="note">Note:</label>
                            <div className="flex gap-2">
                              <div className="w-full flex flex-col">
                                <input
                                  id="note"
                                  type="text"
                                  placeholder="Note"
                                  className="input-primary max-h-9"
                                  value={values.note}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {touched.note && errors.note && (
                                  <FormHelperText>{errors.note}</FormHelperText>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 flex justify-end gap-4">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="px-2 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-400"
                            >
                              {task ? "Updte" : "Save"} Task
                            </button>
                            <button
                              type="button"
                              className="px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-200"
                              onClick={handleClose}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
