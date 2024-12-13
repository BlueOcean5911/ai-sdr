import { format, toZonedTime } from "date-fns-tz";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import FormHelperText from "@/components/extends/FormHelperText";
import Select from "@/components/extends/Select/default";
import { useTaskFilter } from "@/contexts/FilterTaskContext";
import { getLeads } from "@/services/leadService";
import { getUsers } from "@/services/userService";
import { addTask, BaseTaskModel, updateTask } from "@/services/taskService";
import { CreateTaskProps } from "@/types";
import { CADENCE_STEP_TYPE } from "@/types/enums";
import { getUserTimeZone } from "@/utils/format";
import { handleError, runService } from "@/utils/service_utils";

const taskTypeOptions = [
  { value: CADENCE_STEP_TYPE.MANUAL_EMAIL, name: "Email" },
  { value: CADENCE_STEP_TYPE.PHONE_CALL, name: "Phone Call" },
  { value: CADENCE_STEP_TYPE.ACTION_ITEM, name: "Action Item" },
];

const taskPriorityOptions = [
  { value: "low", name: "Low" },
  { value: "medium", name: "Medium" },
  { value: "high", name: "High" },
  { value: "critical", name: "Critical" },
];

export default function CreateTask({
  open,
  task = undefined,
  handleSave,
  handleClose,
}: CreateTaskProps) {
  const { setTaskFilterConfig } = useTaskFilter();
  const [userOptions, setUserOptions] = useState<any[]>([]);
  const [leadOptions, setLeadOptions] = useState<any[]>([]);

  const userTimeZone: string = getUserTimeZone();

  const fetchUsers = () => {
    runService(
      undefined,
      getUsers,
      (data: any[]) => {
        const tempUserOptions = data.map((user) => {
          return {
            name: user.firstName + " " + user.lastName,
            value: user.id,
          };
        });
        setUserOptions(tempUserOptions);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const fetchLeads = () => {
    runService(
      undefined,
      getLeads,
      (data: any[]) => {
        const tempLeadOptions = data.map((user) => {
          return {
            name: user.firstName + " " + user.lastName,
            value: user.id,
          };
        });
        // console.log("tempLeadOptions: ", tempLeadOptions);
        setLeadOptions([{ name: "None", value: "none" }, ...tempLeadOptions]);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchUsers();
    fetchLeads();
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
                      title: task ? task.title : "",
                      leadId: task ? task.leadId : "none",
                      taskType: task ? task.taskType : "",
                      ownerId: task ? task.ownerId : "",
                      taskPriority: task ? task.taskPriority : "",
                      endDate: task
                        ? format(
                            toZonedTime(task.endDate + "Z", userTimeZone),
                            "yyyy-MM-dd HH:mm"
                          ).replace(" ", "T")
                        : format(new Date(), "yyyy-MM-dd HH:mm").replace(
                            " ",
                            "T"
                          ),
                      content: task ? task.content : "",
                      status: task ? task.status : "incomplete",
                    }}
                    validationSchema={Yup.object().shape({
                      title: Yup.string().required("Title is required"),
                      content: Yup.string().required("Note is required"),
                      taskType: Yup.string().required("Type is required"),
                      taskPriority: Yup.string().required(
                        "Priority is required"
                      ),
                      ownerId: Yup.string().required("Assignee is required"),
                      endDate: Yup.string().required("Due date is required"),
                    })}
                    onSubmit={async (
                      values,
                      { setErrors, setStatus, setSubmitting }
                    ) => {
                      let taskData: Partial<BaseTaskModel> = {};

                      if (task) {
                        if (values.title !== task.title)
                          taskData.title = values.title;
                        if (values.content !== task.content)
                          taskData.content = values.content;
                        if (values.taskType !== task.taskType)
                          taskData.taskType = values.taskType;
                        if (values.taskPriority !== task.taskPriority)
                          taskData.taskPriority = values.taskPriority;
                        if (values.endDate !== task.endDate)
                          taskData.endDate = new Date(values.endDate)
                            .toISOString()
                            .replace("Z", "");
                        if (values.ownerId !== task.ownerId)
                          taskData.ownerId = values.ownerId;
                        if (values.leadId !== task.leadId)
                          taskData.leadId = values.leadId;
                        if (values.status !== task.status)
                          taskData.status = values.status;

                        console.log(taskData);

                        runService(
                          { taskId: task.id, updateData: taskData },
                          updateTask,
                          (data) => {
                            setTaskFilterConfig((prev) => ({
                              ...prev,
                              createdTaskId: data.id,
                            }));
                            toast.success("Task updated successfully");
                            handleClose();
                          },
                          (status, error) => {
                            console.log(status, error);
                            toast.error(error);
                          }
                        );
                      } else {
                        let taskData: BaseTaskModel = {
                          title: values.title,
                          content: values.content,
                          taskType: values.taskType,
                          taskPriority: values.taskPriority,
                          endDate: new Date(values.endDate)
                            .toISOString()
                            .replace("Z", ""),
                          ownerId: values.ownerId,
                          leadId: values.leadId,
                          status: values.status,
                        };

                        runService(
                          taskData,
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
                      }
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
                        <div className="px-6 py-3 flex flex-col gap-2 text-sm bg-gray-50 rounded-md">
                          <div className="flex gap-2">
                            <div className="w-2/3 flex flex-col gap-1">
                              <label htmlFor="title">Title:</label>
                              <input
                                id="title"
                                type="text"
                                placeholder="Title"
                                className="input-primary max-h-9"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.title && errors.title && (
                                <FormHelperText>{errors.title}</FormHelperText>
                              )}
                            </div>
                            <div className="w-1/3 flex flex-col gap-1">
                              <label htmlFor="leadId">Lead:</label>
                              <Select
                                data={leadOptions}
                                defaultValue={leadOptions.find(
                                  (option) => option.value === values.leadId
                                )}
                                onChange={(selectedItem) => {
                                  if (
                                    selectedItem &&
                                    selectedItem.value !== values.leadId
                                  )
                                    setFieldValue("leadId", selectedItem.value);
                                }}
                              ></Select>
                              {touched.leadId && errors.leadId && (
                                <FormHelperText>{errors.leadId}</FormHelperText>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <div className="w-1/2 flex flex-col gap-1">
                              <label htmlFor="taskType">Type:</label>
                              <Select
                                data={taskTypeOptions}
                                defaultValue={taskTypeOptions.find(
                                  (option) => option.value === values.taskType
                                )}
                                onChange={(selectedItem) => {
                                  if (selectedItem.value !== values.taskType)
                                    setFieldValue(
                                      "taskType",
                                      selectedItem.value
                                    );
                                }}
                              />
                              {touched.taskType && errors.taskType && (
                                <FormHelperText>
                                  {errors.taskType}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="w-1/2 flex flex-col gap-1">
                              <label htmlFor="ownerId">Owner:</label>
                              <Select
                                data={userOptions}
                                defaultValue={userOptions.find(
                                  (option) => option.value === values.ownerId
                                )}
                                onChange={(selectedItem) => {
                                  if (selectedItem.value !== values.ownerId)
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

                          <div className="flex gap-2">
                            <div className="w-3/5 flex flex-col gap-1">
                              <label htmlFor="taskPriority">Priority:</label>
                              <Select
                                data={taskPriorityOptions}
                                defaultValue={taskPriorityOptions.find(
                                  (option) =>
                                    option.value === values.taskPriority
                                )}
                                onChange={(selectedItem) => {
                                  if (
                                    selectedItem.value !== values.taskPriority
                                  )
                                    setFieldValue(
                                      "taskPriority",
                                      selectedItem.value
                                    );
                                }}
                              />
                              {touched.taskPriority && errors.taskPriority && (
                                <FormHelperText>
                                  {errors.taskPriority}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="w-2/5 flex flex-col gap-1">
                              <label htmlFor="endDate">Due Date:</label>
                              <input
                                id="endDate"
                                type="datetime-local"
                                placeholder="Due Date"
                                className="input-primary max-h-9"
                                value={values.endDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.endDate && errors.endDate && (
                                <FormHelperText>
                                  {errors.endDate}
                                </FormHelperText>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label htmlFor="content">Note:</label>
                            <div className="flex gap-2">
                              <div className="w-full flex flex-col">
                                <textarea
                                  id="content"
                                  placeholder="Note"
                                  className="input-primary"
                                  value={values.content}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {touched.content && errors.content && (
                                  <FormHelperText>
                                    {errors.content}
                                  </FormHelperText>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 flex justify-end gap-4">
                            <button
                              type="button"
                              className="btn-secondary"
                              onClick={handleClose}
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn-primary"
                            >
                              {task ? "Updte" : "Save"} Task
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
