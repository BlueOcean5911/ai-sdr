"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  ROUTE_DASHBOARD,
  ROUTE_LOGIN,
  ROUTE_REQUEST_DEMO,
} from "@/data/routes";
import Logo from "@/components/extends/Logo";
import { LOGIN_BG_URL, LOGIN_SUB_IMAGE_001_URL } from "@/data/urls/images.url";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import FormHelperText from "@/components/extends/FormHelperText";
import { handleError, runService } from "@/utils/service_utils";
import { login, resetPassword, saveToken } from "@/services/authService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import { useRouter } from "next-nprogress-bar";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) router.push(ROUTE_LOGIN);
  }, []);

  const handleReset = async (password: string) => {
    await runService(
      { password, token },
      resetPassword,
      (data) => {
        if (data.success === true) {
          toast.success("Your password has been reset successfully.");
          router.push(ROUTE_LOGIN);
        }
      },
      (statusCode, error) => {
        handleError(statusCode, error);
      }
    );
  };
  return (
    <>
      <div className="flex min-h-dvh flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Logo />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight">
                Reset Password
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <Formik
                  initialValues={{
                    password: "",
                    password2: "",
                    submit: null,
                  }}
                  validationSchema={Yup.object().shape({
                    password: Yup.string()
                      .min(8, "Must be at least 8 characters")
                      .max(255)
                      .required("Password is required"),
                    password2: Yup.string().equals(
                      [Yup.ref("password")],
                      "Passwords must match"
                    ),
                  })}
                  onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                  ) => {
                    setSubmitting(true);
                    await handleReset(values.password);
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
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 "
                        >
                          Password
                        </label>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            autoComplete="password"
                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-900  sm:text-sm sm:leading-6 "
                          />
                        </div>
                        {touched.password && errors.password && (
                          <FormHelperText>{errors.password}</FormHelperText>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="password2"
                          className="block text-sm font-medium leading-6 "
                        >
                          Confirm Password
                        </label>
                        <div className="mt-2">
                          <input
                            id="password2"
                            name="password2"
                            type="password"
                            value={values.password2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            autoComplete="password2"
                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-900 sm:text-sm sm:leading-6"
                          />
                        </div>
                        {touched.password2 && errors.password2 && (
                          <FormHelperText>{errors.password2}</FormHelperText>
                        )}
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-primary flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          Reset Password
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
              <div className="mt-10"></div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            alt="Sign In Background Image"
            src={LOGIN_BG_URL}
            width={1200}
            height={800}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex-center">
            <Image
              alt="Sign In Background Image"
              src={LOGIN_SUB_IMAGE_001_URL}
              width={400}
              height={300}
              className="w-full aspect-auto max-w-[800px] px-8"
            />
          </div>
        </div>
      </div>
    </>
  );
}
