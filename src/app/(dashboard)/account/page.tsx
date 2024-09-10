"use client";
import Link from "next/link";
import {
  ROUTE_ACCOUNT_COMPANY_DATA,
  ROUTE_ACCOUNT_PROFILE,
  ROUTE_ACCOUNT_USERS,
} from "@/data/routes";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import {
  getMe,
  updatePassword,
  updateUser,
  UserModel,
} from "@/services/userService";
import { handleError, runService } from "@/utils/service_utils";
import { toast } from "react-toastify";
import { classNames } from "@/utils";
import { Formik } from "formik";
import * as Yup from "yup";
import FormHelperText from "@/components/extends/FormHelperText";

export default function Account() {
  const [change, setChange] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState<UserModel>();
  const [updatedUserData, setUpdatedUserData] = useState<UserModel>();
  const fetchUserData = () => {
    runService(
      undefined,
      getMe,
      (data) => {
        setUserData(data);
        setUpdatedUserData(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const saveUserData = () => {
    runService(
      updatedUserData,
      updateUser,
      (data) => {
        setUserData(data);
        setUpdatedUserData(data);
        setChange(false);
        toast.success("Profile updated successfully");
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const updateUserPassword = (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    runService(
      { oldPassword, newPassword },
      updatePassword,
      (data) => {
        toast.success("Password updated successfully");
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
      {/* <NavTitle>
        <Link href={ROUTE_ACCOUNT}>Account</Link>
      </NavTitle> */}

      <div className="w-full px-5 pt-2 flex items-center">
        <Link href={ROUTE_ACCOUNT_PROFILE}>
          <button className="p-1 text-sm rounded-md hover:bg-gray-100">
            Account
          </button>
        </Link>
        <ChevronRightIcon className="w-3 h-3" />
        <Link href={ROUTE_ACCOUNT_PROFILE}>
          <button className="p-1 text-sm rounded-md hover:bg-gray-100">
            Profile
          </button>
        </Link>
      </div>
      <div className="w-full h-8 px-5 flex items-center gap-2">
        <Link href={ROUTE_ACCOUNT_PROFILE}>
          <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
            <span className="p-1.5 cursor-pointer font-semibold">Profile</span>
            <span className="w-full border-b-2 border-black"></span>
          </span>
        </Link>
        <Link href={ROUTE_ACCOUNT_USERS}>
          <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
            <span className="p-1.5 cursor-pointer">Users</span>
            <span className="w-full border-b-2"></span>
          </span>
        </Link>
        <Link href={ROUTE_ACCOUNT_COMPANY_DATA}>
          <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
            <span className="p-1.5 cursor-pointer">Company Data</span>
            <span className="w-full border-b-2"></span>
          </span>
        </Link>
      </div>

      <div className="p-2 flex flex-1 bg-gray-100 overflow-auto text-sm">
        <div className="flex flex-1 justify-center items-center rounded-md bg-white">
          <div className="p-8 max-w-lg w-full flex flex-col gap-5 rounded-md bg-gray-100">
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="firstName">
                First Name:
              </label>
              <input
                id="firstName"
                type="text"
                className="input-primary"
                defaultValue={userData?.firstName}
                value={updatedUserData?.firstName}
                onChange={(e) => {
                  setUpdatedUserData({
                    ...updatedUserData,
                    firstName: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="lastName">
                Last Name:
              </label>
              <input
                id="lastName"
                type="text"
                className="input-primary"
                defaultValue={userData?.lastName}
                value={updatedUserData?.lastName}
                onChange={(e) => {
                  setUpdatedUserData({
                    ...updatedUserData,
                    lastName: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="title">
                Title:
              </label>
              <input
                id="title"
                type="text"
                className="input-primary"
                defaultValue={userData?.title}
                value={updatedUserData?.title}
                onChange={(e) => {
                  setUpdatedUserData({
                    ...updatedUserData,
                    title: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="email">
                Email:
              </label>
              <input
                id="email"
                type="text"
                className="input-primary"
                defaultValue={userData?.email}
                value={updatedUserData?.email}
                onChange={(e) => {
                  setUpdatedUserData({
                    ...updatedUserData,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="phone">
                Phone:
              </label>
              <input
                id="phone"
                type="text"
                className="input-primary"
                defaultValue={userData?.phone}
                value={updatedUserData?.phone}
                onChange={(e) => {
                  setUpdatedUserData({
                    ...updatedUserData,
                    phone: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <div className="pb-2">Password</div>
              <div
                className={classNames(
                  "flex flex-col gap-2 ",
                  change ? "p-4 border-2 border-gray-300 rounded-md" : ""
                )}
              >
                <button
                  className="min-w-32 px-2 py-1.5 flex justify-center items-center gap-2 border-2 border-gray-300 rounded-md hover:bg-gray-200"
                  onClick={() => setChange(!change)}
                >
                  {change ? "Hide" : "Change Password"}
                </button>
                {change && (
                  <Formik
                    initialValues={{
                      oldPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    }}
                    validationSchema={Yup.object().shape({
                      oldPassword: Yup.string().required(
                        "Old password is required"
                      ),
                      newPassword: Yup.string()
                        .required("New password is required")
                        .min(8, "Password must be at least 8 characters long"),
                      confirmPassword: Yup.string()
                        .required("Confirm password is required")
                        .oneOf(
                          [Yup.ref("newPassword")],
                          "Passwords must match"
                        ),
                    })}
                    onSubmit={async (
                      values,
                      { setErrors, setStatus, setSubmitting }
                    ) => {
                      setSubmitting(true);
                      updateUserPassword(
                        values.oldPassword,
                        values.newPassword,
                        values.confirmPassword
                      );
                      setSubmitting(false);
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
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center">
                            <label className="min-w-36" htmlFor="oldPassword">
                              Old Password:
                            </label>
                            <div className="flex flex-col w-full">
                              <input
                                id="oldPassword"
                                type="password"
                                className="input-primary"
                                value={values.oldPassword}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              {touched.oldPassword && errors.oldPassword && (
                                <FormHelperText>
                                  {errors.oldPassword}
                                </FormHelperText>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <label className="min-w-36" htmlFor="newPassword">
                              New Password:
                            </label>
                            <div className="flex flex-col w-full">
                              <input
                                id="newPassword"
                                type="password"
                                className="input-primary"
                                value={values.newPassword}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              {touched.newPassword && errors.newPassword && (
                                <FormHelperText>
                                  {errors.newPassword}
                                </FormHelperText>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <label
                              className="min-w-36"
                              htmlFor="confirmPassword"
                            >
                              Confirm Password:
                            </label>
                            <div className="flex flex-col w-full">
                              <input
                                id="confirmPassword"
                                type="password"
                                className="input-primary"
                                value={values.confirmPassword}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              {touched.confirmPassword &&
                                errors.confirmPassword && (
                                  <FormHelperText>
                                    {errors.confirmPassword}
                                  </FormHelperText>
                                )}
                            </div>
                          </div>
                          <button
                            className="w-full p-2 rounded-md text-white bg-blue-500 hover:bg-blue-400"
                            disabled={isSubmitting}
                          >
                            Confirm
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="w-full p-2 rounded-md text-white bg-blue-500 hover:bg-blue-400"
                onClick={() => saveUserData()}
              >
                Save
              </button>
              <button
                className="w-full p-2 rounded-md bg-gray-300 hover:bg-gray-200"
                onClick={() => setUpdatedUserData({ ...userData })}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
