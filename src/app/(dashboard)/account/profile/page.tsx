"use client";
import { useEffect, useState } from "react";
import { getMe, updateUser, UserModel } from "@/services/userService";
import { handleError, runService } from "@/utils/service_utils";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import FormHelperText from "@/components/extends/FormHelperText";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Profile() {
  const [userData, setUserData] = useState<UserModel>();

  const fetchUserData = () => {
    runService(
      undefined,
      getMe,
      (data) => {
        setUserData(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const updateUserData = (data: UserModel) => {
    runService(
      data,
      updateUser,
      (data) => {
        setUserData(data);
        // setChange(false);
        toast.success("Profile updated successfully");
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div className="p-4 flex flex-1 bg-gray-100 overflow-auto text-sm">
        <div className="flex flex-1 justify-center items-center bg-gray-100">
          <div className="card py-8 max-w-md w-full flex flex-col gap-5 border shadow-lg">
            <div className="change-password-header">
              <h1 className="text-lg">
                <span className="flex gap-2 items-center">
                  <UserCircleIcon className="w-6 h-6" />
                  Account Profile
                </span>
              </h1>
              <hr />
            </div>
            <div className="p-4 pt-6 border rounded mt-4">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  firstName: userData ? userData.firstName : "",
                  lastName: userData ? userData.lastName : "",
                  title: userData ? userData.title : "",
                  email: userData ? userData.email : "",
                  phone: userData ? userData.phone : "",
                }}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string().required("First Name is required"),
                  lastName: Yup.string().required("Last Name is required"),
                  email: Yup.string()
                    .required("Email is required")
                    .email("This eamil is not vaild"),
                })}
                onSubmit={async (
                  values,
                  { setErrors, setStatus, setSubmitting }
                ) => {
                  setSubmitting(true);
                  updateUserData({ ...values });
                  setSubmitting(false);
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  resetForm,
                  isSubmitting,
                  touched,
                  values,
                }) => (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-col w-full gap-1">
                          <label
                            className="text-xs min-w-24"
                            htmlFor="firstName"
                          >
                            First Name:
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                            className="input-primary"
                            value={values.firstName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </div>
                        {touched.firstName && errors.firstName && (
                          <div className="ml-24">
                            <FormHelperText>{errors.firstName}</FormHelperText>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-col w-full gap-1">
                          <label
                            className="text-xs min-w-24"
                            htmlFor="lastName"
                          >
                            Last Name:
                          </label>
                          <input
                            id="lastName"
                            type="text"
                            placeholder="Last Name"
                            className="input-primary"
                            value={values.lastName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </div>
                        {touched.lastName && errors.lastName && (
                          <div className="ml-24">
                            <FormHelperText>{errors.lastName}</FormHelperText>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col w-full gap-2">
                        <label className="text-xs min-w-24" htmlFor="title">
                          Title:
                        </label>
                        <div className="flex flex-col w-full gap-1">
                          <input
                            id="title"
                            type="text"
                            placeholder="Project Manager"
                            className="input-primary"
                            value={values.title}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-col w-full gap-1">
                          <label className="text-xs min-w-24" htmlFor="email">
                            Email:
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="yourname@example.com"
                            className="input-primary"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </div>
                        {touched.email && errors.email && (
                          <div className="ml-24">
                            <FormHelperText>{errors.email}</FormHelperText>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col w-full gap-1">
                        <label className="text-xs min-w-24" htmlFor="phone">
                          Phone:
                        </label>
                        <div className="flex flex-col w-full gap-1">
                          <input
                            id="phone"
                            type="text"
                            placeholder=""
                            className="input-primary"
                            value={values.phone}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary"
                      >
                        Save
                      </button>
                      <button
                        type="reset"
                        className="w-full btn-secondary"
                        onClick={() => resetForm()}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
