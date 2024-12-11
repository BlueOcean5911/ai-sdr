"use client";
import FormHelperText from "@/components/extends/FormHelperText";
import { updatePassword } from "@/services/userService";
import { SuccessModel } from "@/types";
import { handleError, runService } from "@/utils/service_utils";
import { KeyIcon } from "@heroicons/react/24/outline";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const Security = () => {
  return (
    <div className="p-4 flex flex-1 bg-gray-100 overflow-auto text-sm">
      <div className="flex flex-1 justify-center items-center bg-gray-100">
        <div className="card py-8 max-w-md w-full flex flex-col gap-5 border shadow-lg">
          <div className="change-password-header">
            <h1 className="text-lg">
              {" "}
              <span className="flex gap-2 items-center">
                <KeyIcon className="w-6 h-6" />
                Password
              </span>
            </h1>
            <hr />
          </div>
          <div className="p-4 pt-6 border rounded mt-4">
            <Formik
              initialValues={{
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={Yup.object().shape({
                oldPassword: Yup.string().required("Old password is required"),
                newPassword: Yup.string()
                  .required("New password is required")
                  .min(8, "Password must be at least 8 characters long"),
                confirmPassword: Yup.string()
                  .required("Confirm password is required")
                  .oneOf([Yup.ref("newPassword")], "Passwords must match"),
              })}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);

                if (values.newPassword !== values.confirmPassword) {
                  toast.error("Passwords do not match");
                  return;
                }
                runService(
                  {
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword,
                  },
                  updatePassword,
                  (data: SuccessModel) => {
                    if (data.success) {
                      toast.success("Password updated successfully");
                      resetForm();
                    } else {
                      toast.success("Invalid password");
                    }
                  },
                  (status, error) => {
                    handleError(status, error);
                  }
                );
                resetForm();

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
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs min-w-36" htmlFor="oldPassword">
                        Old Password:
                      </label>
                      <div className="flex flex-col w-full gap-1">
                        <input
                          id="oldPassword"
                          type="password"
                          className="input-primary"
                          value={values.oldPassword}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.oldPassword && errors.oldPassword && (
                          <FormHelperText>{errors.oldPassword}</FormHelperText>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs min-w-36" htmlFor="newPassword">
                        New Password:
                      </label>
                      <div className="flex flex-col w-full gap-1">
                        <input
                          id="newPassword"
                          type="password"
                          className="input-primary"
                          value={values.newPassword}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.newPassword && errors.newPassword && (
                          <FormHelperText>{errors.newPassword}</FormHelperText>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        className="min-w-36 text-xs"
                        htmlFor="confirmPassword"
                      >
                        Confirm Password:
                      </label>
                      <div className="flex flex-col w-full gap-1">
                        <input
                          id="confirmPassword"
                          type="password"
                          className="input-primary"
                          value={values.confirmPassword}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                          <FormHelperText>
                            {errors.confirmPassword}
                          </FormHelperText>
                        )}
                      </div>
                    </div>
                    <button
                      className="w-full btn-primary"
                      disabled={isSubmitting}
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
