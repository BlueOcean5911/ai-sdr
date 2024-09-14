import { employeeOptions, statusOptions } from "@/data/filter.data";
import { CreateModelProps } from "@/types";
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
import { addLead, BaseLeadModel, LeadModel } from "@/services/leadService";
import Select from "react-tailwindcss-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormHelperText from "@/components/extends/FormHelperText";
import { toast } from "react-toastify";
import RSelect from "@/components/extends/Select/default";
import { useLeadFilter } from "@/contexts/FilterLeadContext";

export default function CreateLead({
  open,
  handleSave,
  handleClose,
}: CreateModelProps) {
  const [users, setUsers] = useState<UserModel[]>();
  const { setLeadFilterConfig } = useLeadFilter();
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
                    Create New Lead
                  </DialogTitle>
                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      email: "",
                      emailStatus: statusOptions[3],
                      phone: "",
                      phoneStatus: statusOptions[3],
                      jobTitle: "",
                      company: "",
                      linkedin: "",
                      location: "",
                      note1: "",
                      note2: "",
                      leadOwner: "",
                    }}
                    validationSchema={Yup.object().shape({
                      firstName: Yup.string().required(
                        "First Name is required"
                      ),
                      lastName: Yup.string().required("Last Name is required"),
                      email: Yup.string()
                        .required("Email is required")
                        .email("Invalid Email"),
                      // emailStatus: Yup.string().required("Status is required"),
                      phone: Yup.string().required("Phone is required"),
                      // phoneStatus: Yup.string().required("Status is required"),
                      jobTitle: Yup.string().required("Job Title is required"),
                      company: Yup.string().required("Company is required"),
                      linkedin: Yup.string()
                        .required("LinkedIn is required")
                        .url("Invalid URL"),
                      location: Yup.string().required("Location is required"),
                      // leadOwner: Yup.string().required(
                      //   "Lead Owner is required"
                      // ),
                    })}
                    onSubmit={async (
                      values,
                      { setErrors, setStatus, setSubmitting }
                    ) => {
                      const phoneStatus = values.phoneStatus.value;
                      const emailStatus = values.emailStatus.value;

                      let lead: BaseLeadModel = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        title: values.jobTitle,
                        email: values.email,
                        emailStatus: emailStatus,
                        phone: values.phone,
                        // phoneStatus: values.phoneStatus.value,
                        phoneStatus: phoneStatus,
                        linkedin: values.linkedin,
                        location: values.location,
                        personalNote1: values.note1,
                        personalNote2: values.note2,

                        clickCount: 0,
                        replyCount: 0,

                        targeted: false,
                        // personaId: undefined,
                        // companyId: values.company,
                        // ownerId: values.leadOwner,
                        personaId: undefined,
                        companyId: undefined,
                        ownerId: values.leadOwner,
                      };
                      runService(
                        lead,
                        addLead,
                        (data) => {
                          setLeadFilterConfig((prev) => ({
                            ...prev,
                            createdLeadId: data.surrogateId,
                          }));
                          toast.success("Lead created successfully");
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
                      setFieldValue,
                      handleSubmit,
                      isSubmitting,
                      touched,
                      values,
                    }) => (
                      <form noValidate onSubmit={handleSubmit}>
                        <div className="px-6 py-3 flex flex-col gap-2 text-sm bg-gray-50 rounded-md">
                          <div className="flex gap-4">
                            <div className="w-full flex flex-col">
                              <label htmlFor="firstName">First Name</label>
                              <input
                                id="firstName"
                                type="text"
                                placeholder="First Name"
                                className="input-primary max-h-9"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.firstName && errors.firstName && (
                                <FormHelperText>
                                  {errors.firstName}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="w-full flex flex-col">
                              <label htmlFor="lastName">Last Name</label>
                              <input
                                id="lastName"
                                type="text"
                                placeholder="Last Name"
                                className="input-primary max-h-9"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.lastName && errors.lastName && (
                                <FormHelperText>
                                  {errors.lastName}
                                </FormHelperText>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <div className="flex gap-4">
                              <div className="w-full flex flex-col">
                                <input
                                  id="email"
                                  type="text"
                                  placeholder="Email"
                                  className="input-primary max-h-9"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {touched.email && errors.email && (
                                  <FormHelperText>
                                    {errors.email}
                                  </FormHelperText>
                                )}
                              </div>
                              <div className="w-full flex flex-col">
                                <Select
                                  value={values.emailStatus}
                                  onChange={(item: any) => {
                                    console.log("item", item);
                                    setFieldValue("emailStatus", item);
                                  }}
                                  options={statusOptions}
                                  primaryColor={"indigo"}
                                  classNames={{
                                    menuButton: (value) => {
                                      const isDisabled = value?.isDisabled;
                                      return `flex text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                                        isDisabled
                                          ? "bg-gray-200"
                                          : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                                      }`;
                                    },
                                    menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-gray-700",
                                    listItem: (value) => {
                                      const isSelected = value?.isSelected;
                                      return `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                                        isSelected
                                          ? `text-white bg-blue-500`
                                          : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                                      }`;
                                    },
                                    searchBox:
                                      "w-full py-2 pl-8 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none",
                                    searchIcon:
                                      "absolute w-4 h-4 mt-2.5 pb-0.5 ml-1.5 text-gray-500",
                                  }}
                                ></Select>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor="phone">Phone</label>
                            <div className="flex gap-4">
                              <div className="w-full flex flex-col">
                                <input
                                  id="phone"
                                  type="text"
                                  placeholder="Phone Number"
                                  className="input-primary max-h-9"
                                  value={values.phone}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {touched.phone && errors.phone && (
                                  <FormHelperText>
                                    {errors.phone}
                                  </FormHelperText>
                                )}
                              </div>
                              <div className="w-full flex flex-col">
                                <Select
                                  value={values.phoneStatus}
                                  onChange={(item: any) => {
                                    setFieldValue("phoneStatus", item);
                                  }}
                                  options={statusOptions}
                                  primaryColor={"indigo"}
                                  classNames={{
                                    menuButton: (value) => {
                                      const isDisabled = value?.isDisabled;
                                      return `flex text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                                        isDisabled
                                          ? "bg-gray-200"
                                          : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                                      }`;
                                    },
                                    menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-gray-700",
                                    listItem: (value) => {
                                      const isSelected = value?.isSelected;
                                      return `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                                        isSelected
                                          ? `text-white bg-blue-500`
                                          : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                                      }`;
                                    },
                                    searchBox:
                                      "w-full py-2 pl-8 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none",
                                    searchIcon:
                                      "absolute w-4 h-4 mt-2.5 pb-0.5 ml-1.5 text-gray-500",
                                  }}
                                ></Select>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor="linkedin">LinkedIn URL</label>
                            <input
                              id="linkedin"
                              type="text"
                              placeholder="https://linkedin.com/in/contactname"
                              className="input-primary max-h-9"
                              value={values.linkedin}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.linkedin && errors.linkedin && (
                              <FormHelperText>{errors.linkedin}</FormHelperText>
                            )}
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor="company">Company</label>
                            <input
                              id="company"
                              type="text"
                              placeholder="Company Name"
                              className="input-primary max-h-9"
                              value={values.company}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.company && errors.company && (
                              <FormHelperText>{errors.company}</FormHelperText>
                            )}
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor="jobTitle">Job Title</label>
                            <input
                              id="jobTitle"
                              type="text"
                              placeholder='"Director of Sales", "VP of Marketing", etc.'
                              className="input-primary max-h-9"
                              value={values.jobTitle}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.jobTitle && errors.jobTitle && (
                              <FormHelperText>{errors.jobTitle}</FormHelperText>
                            )}
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor="location">Location</label>
                            <input
                              id="location"
                              type="text"
                              placeholder="Location / Country"
                              className="input-primary max-h-9"
                              value={values.location}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.location && errors.location && (
                              <FormHelperText>{errors.location}</FormHelperText>
                            )}
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor="note1">Personal Note1</label>
                            <textarea
                              id="note1"
                              className="input-primary"
                              value={values.note1}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor="note2">Personal Note2</label>
                            <textarea
                              id="note2"
                              className="input-primary"
                              value={values.note2}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor="leadOwner">Lead Owner</label>
                            <RSelect
                              data={userOptions}
                              onChange={(item) => {
                                if (values.leadOwner !== item?.value) {
                                  setFieldValue("leadOwner", item?.value);
                                }
                              }}
                            ></RSelect>
                            {touched.leadOwner && errors.leadOwner && (
                              <FormHelperText>
                                {errors.leadOwner}
                              </FormHelperText>
                            )}
                          </div>

                          <div className="pt-2 flex justify-end gap-4">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="px-2 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-400"
                            >
                              Save Lead
                            </button>
                            <button
                              className="px-2 py-1 rounded-md bg-gray-300 hover:bg-gray-200"
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
