import { ForgotPasswordProps } from "@/types";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import FormHelperText from "@/components/extends/FormHelperText";

export default function ForgotPassword({
  open,
  handleSend,
  handleClose,
}: ForgotPasswordProps) {
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
                <DialogPanel className="max-w-lg w-full flex flex-col rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="px-6 py-3 text-lg font-semibold leading-6 bg-white text-gray-900 rounded-md"
                  >
                    Forgot Password?
                  </DialogTitle>
                  <Formik
                    initialValues={{
                      email: "",
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .required("Email is required")
                        .email("Invalid Email"),
                    })}
                    onSubmit={async (
                      values,
                      { setErrors, setStatus, setSubmitting }
                    ) => {
                      setSubmitting(false);
                      handleSend(values.email);
                      setSubmitting(true);
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
                          <div className="flex flex-col">
                            <p className="text-base text-gray-600 py-4">
                              Enter your username or email, and we'll send you a
                              password reset link.
                            </p>
                            <label
                              htmlFor="email"
                              className="font-semibold py-2"
                            >
                              Email:
                            </label>
                            <div className="flex gap-4">
                              <div className="w-full flex flex-col">
                                <input
                                  id="email"
                                  type="text"
                                  placeholder="username@example.com"
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
                            </div>
                          </div>

                          <div className="pt-2 flex justify-end gap-4 text-sm">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn-primary"
                            >
                              Send Link
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
