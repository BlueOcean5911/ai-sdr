import { statusOptions } from "@/data/filter.data";
import { CreateLeadProps } from "@/types";
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
import { addLead, BaseLeadModel, updateLead } from "@/services/leadService";
import Select from "react-tailwindcss-select";
import { Formik } from "formik";
import * as Yup from "yup";
import FormHelperText from "@/components/extends/FormHelperText";
import { toast } from "react-toastify";
import RSelect from "@/components/extends/Select/default";
import { useLeadFilter } from "@/contexts/FilterLeadContext";

const linkedinUrlRegex =
  /^(https?:\/\/)?(www\.)?(linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9-]+)/;

export default function CreateLead({
  open,
  lead = undefined,
  handleClose,
}: CreateLeadProps) {
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
                    {lead ? "Edit Lead" : "Create New Lead"}
                  </DialogTitle>
                  <Formik
                    initialValues={{
                      firstName: lead ? lead.firstName : "",
                      lastName: lead ? lead.lastName : "",
                      email: lead ? lead.email : "",
                      emailStatus: statusOptions[3],
                      workEmail: lead ? lead.workEmail : "",
                      workEmailStatus: statusOptions[3],
                      primaryPhone: lead ? lead.primaryPhone : "",
                      primaryPhoneStatus: statusOptions[3],
                      mobilePhone: lead ? lead.mobilePhone : "",
                      mobilePhoneStatus: statusOptions[3],
                      workPhone: lead ? lead.workPhone : "",
                      workPhoneStatus: statusOptions[3],
                      title: lead ? lead.title : "",
                      companyId: lead ? lead.companyId : "",
                      linkedin: lead ? lead.linkedin : "",
                      city: lead ? lead.city : "",
                      state: lead ? lead.state : "",
                      country: lead ? lead.country : "",
                      timeZone: lead ? lead.timeZone : "",
                      annualRevenue: lead ? lead.annualRevenue : "",
                      personalNote1: lead ? lead.personalNote1 : "",
                      personalNote2: lead ? lead.personalNote2 : "",
                      ownerId: lead ? lead.ownerId : "",
                    }}
                    validationSchema={Yup.object().shape({
                      firstName: Yup.string().required(
                        "First Name is required"
                      ),
                      lastName: Yup.string().required("Last Name is required"),
                      email: Yup.string()
                        .required("Email is required")
                        .email("Invalid Email"),
                      workEmail: Yup.string()
                        .required("Work Email is required")
                        .email("Invalid Email"),
                      // emailStatus: Yup.string().required("Status is required"),
                      primaryPhone: Yup.string().required(
                        "Primary Phone is required"
                      ),
                      // phoneStatus: Yup.string().required("Status is required"),
                      title: Yup.string().required("Job Title is required"),
                      companyId: Yup.string().required("Company is required"),
                      linkedinUrl: Yup.string()
                        .matches(
                          linkedinUrlRegex,
                          "Please enter a valid LinkedIn URL"
                        )
                        .required("LinkedIn URL is required"),
                      city: Yup.string().required("City is required"),
                      state: Yup.string().required("State is required"),
                      country: Yup.string().required("Country is required"),
                      annualRevenue: Yup.string().required(
                        "Annual Revenue is required"
                      ),
                      // ownerId: Yup.string().required(
                      //   "Lead Owner is required"
                      // ),
                    })}
                    onSubmit={async (
                      values,
                      { setErrors, setStatus, setSubmitting }
                    ) => {
                      const primaryPhoneStatus =
                        values.primaryPhoneStatus.value;
                      const emailStatus = values.emailStatus.value;

                      let leadData: BaseLeadModel = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        title: values.title,
                        email: values.email,
                        emailStatus: emailStatus,
                        primaryPhone: values.primaryPhone,
                        primaryPhoneStatus: primaryPhoneStatus,
                        linkedin: values.linkedin,
                        city: values.city,
                        state: values.state,
                        country: values.country,
                        timeZone: values.timeZone,
                        annualRevenue: values.annualRevenue,
                        personalNote1: values.personalNote1,
                        personalNote2: values.personalNote2,

                        clickCount: 0,
                        replyCount: 0,

                        targeted: false,
                        // personaId: undefined,
                        // companyId: values.companyId,
                        // ownerId: values.ownerId,
                        personaId: undefined,
                        companyId: undefined,
                        ownerId: values.ownerId,
                      };
                      lead
                        ? runService(
                            { id: lead.id, updateData: leadData },
                            updateLead,
                            (data) => {
                              setLeadFilterConfig((prev) => ({
                                ...prev,
                                createdLeadId: data.id,
                              }));
                              toast.success("Lead updated successfully");
                              handleClose();
                            },
                            (status, error) => {
                              console.log(status, error);
                              toast.error(error);
                            }
                          )
                        : runService(
                            leadData,
                            addLead,
                            (data) => {
                              setLeadFilterConfig((prev) => ({
                                ...prev,
                                createdLeadId: data.id,
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
                            <label htmlFor="workEmail">Work Email</label>
                            <div className="flex gap-4">
                              <div className="w-full flex flex-col">
                                <input
                                  id="workEmail"
                                  type="email"
                                  placeholder="Work Email"
                                  className="input-primary max-h-9"
                                  value={values.workEmail}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {touched.workEmail && errors.workEmail && (
                                  <FormHelperText>
                                    {errors.workEmail}
                                  </FormHelperText>
                                )}
                              </div>
                              <div className="w-full flex flex-col">
                                <Select
                                  value={values.workEmailStatus}
                                  onChange={(item: any) => {
                                    console.log("item", item);
                                    setFieldValue("workEmailStatus", item);
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
                            <label htmlFor="primaryPhone">Primary Phone</label>
                            <div className="flex gap-4">
                              <div className="w-full flex flex-col">
                                <input
                                  id="primaryPhone"
                                  type="text"
                                  placeholder="Primary Phone Number"
                                  className="input-primary max-h-9"
                                  value={values.primaryPhone}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {touched.primaryPhone &&
                                  errors.primaryPhone && (
                                    <FormHelperText>
                                      {errors.primaryPhone}
                                    </FormHelperText>
                                  )}
                              </div>
                              <div className="w-full flex flex-col">
                                <Select
                                  value={values.primaryPhoneStatus}
                                  onChange={(item: any) => {
                                    setFieldValue("primaryPhoneStatus", item);
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
                            <label htmlFor="workPhone">Mobile Phone</label>
                            <div className="flex gap-4">
                              <div className="w-full flex flex-col">
                                <input
                                  id="workPhone"
                                  type="text"
                                  placeholder="Mobile Phone Number"
                                  className="input-primary max-h-9"
                                  value={values.workPhone}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {touched.workPhone && errors.workPhone && (
                                  <FormHelperText>
                                    {errors.workPhone}
                                  </FormHelperText>
                                )}
                              </div>
                              <div className="w-full flex flex-col">
                                <Select
                                  value={values.workPhoneStatus}
                                  onChange={(item: any) => {
                                    setFieldValue("workPhoneStatus", item);
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
                            <label htmlFor="mobilePhone">Work Phone</label>
                            <div className="flex gap-4">
                              <div className="w-full flex flex-col">
                                <input
                                  id="mobilePhone"
                                  type="text"
                                  placeholder="Work Phone Number"
                                  className="input-primary max-h-9"
                                  value={values.mobilePhone}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {touched.mobilePhone && errors.mobilePhone && (
                                  <FormHelperText>
                                    {errors.mobilePhone}
                                  </FormHelperText>
                                )}
                              </div>
                              <div className="w-full flex flex-col">
                                <Select
                                  value={values.mobilePhoneStatus}
                                  onChange={(item: any) => {
                                    setFieldValue("mobilePhoneStatus", item);
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
                            <label htmlFor="companyId">Company</label>
                            <input
                              id="companyId"
                              type="text"
                              placeholder="Company Name"
                              className="input-primary max-h-9"
                              value={values.companyId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.companyId && errors.companyId && (
                              <FormHelperText>
                                {errors.companyId}
                              </FormHelperText>
                            )}
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor="title">Job Title</label>
                            <input
                              id="title"
                              type="text"
                              placeholder='"Director of Sales", "VP of Marketing", etc.'
                              className="input-primary max-h-9"
                              value={values.title}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.title && errors.title && (
                              <FormHelperText>{errors.title}</FormHelperText>
                            )}
                          </div>

                          <div className="flex flex-row gap-2">
                            <div className="flex flex-col">
                              <label htmlFor="city">City</label>
                              <input
                                id="city"
                                type="text"
                                placeholder="City"
                                className="input-primary max-h-9"
                                value={values.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.city && errors.city && (
                                <FormHelperText>{errors.city}</FormHelperText>
                              )}
                            </div>

                            <div className="flex flex-col">
                              <label htmlFor="state">State</label>
                              <input
                                id="state"
                                type="text"
                                placeholder="State"
                                className="input-primary max-h-9"
                                value={values.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.state && errors.state && (
                                <FormHelperText>{errors.state}</FormHelperText>
                              )}
                            </div>

                            <div className="flex flex-col">
                              <label htmlFor="country">Country</label>
                              <input
                                id="country"
                                type="text"
                                placeholder="Country"
                                className="input-primary max-h-9"
                                value={values.country}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.country && errors.country && (
                                <FormHelperText>
                                  {errors.country}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="flex flex-col">
                              <label htmlFor="annualRevenue">
                                Annual Revenue
                              </label>
                              <input
                                id="annualRevenue"
                                type="text"
                                placeholder="Annual Revenue"
                                className="input-primary max-h-9"
                                value={values.annualRevenue}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.annualRevenue &&
                                errors.annualRevenue && (
                                  <FormHelperText>
                                    {errors.annualRevenue}
                                  </FormHelperText>
                                )}
                            </div>
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor="personalNote1">
                              Personal Note1
                            </label>
                            <textarea
                              id="personalNote1"
                              className="input-primary"
                              value={values.personalNote1}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor="personalNote2">
                              Personal Note2
                            </label>
                            <textarea
                              id="personalNote2"
                              className="input-primary"
                              value={values.personalNote2}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor="ownerId">Lead Owner</label>
                            <RSelect
                              value={userOptions.find(
                                (option) => option.value === values.ownerId
                              )}
                              data={userOptions}
                              onChange={(item) => {
                                if (values.ownerId !== item?.value) {
                                  setFieldValue("ownerId", item?.value);
                                }
                              }}
                            ></RSelect>
                            {touched.ownerId && errors.ownerId && (
                              <FormHelperText>{errors.ownerId}</FormHelperText>
                            )}
                          </div>

                          <div className="pt-2 flex justify-end gap-4">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn-primary"
                            >
                              {lead ? "Update Lead" : "Create Lead"}
                            </button>
                            <button
                              className="btn-secondary"
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
