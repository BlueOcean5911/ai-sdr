"use client";
import Link from "next/link";

import { ROUTE_DASHBOARD, ROUTE_LOGIN, ROUTE_REGISTER } from "@/data/routes";
import Logo from "@/components/extends/Logo";
import { LOGIN_BG_URL, LOGIN_SUB_IMAGE_001_URL } from "@/data/urls/images.url";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import FormHelperText from "@/components/extends/FormHelperText";
import Select from "@/components/extends/Select/default";
import { runService } from "@/utils/service_utils";
import { register } from "@/services/authService";

const companySizeOptions = [
  { value: "1-10", name: "1-10" },
  { value: "11-20", name: "11-20" },
  { value: "21-50", name: "21-50" },
  { value: "51-100", name: "51-100" },
  { value: "101-200", name: "101-200" },
  { value: "201-500", name: "201-500" },
  { value: "501-1000", name: "501-1000" },
  { value: "1001-2000", name: "1001-2000" },
  { value: "2001-5000", name: "2001-5000" },
  { value: "5001-10000", name: "5001-10000" },
  { value: "10001+", name: "10001+" },
];

interface FormValues {
  email: string;
  password: string;
}

export default function SignIn() {
  const handleRegister = (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    companyName: string,
    companySize: string
  ) => {
    runService(
      { email, password, firstName, lastName, companyName, companySize },
      register,
      (data) => {
        console.log(data);
      },
      (statusCode, error) => {
        console.log(statusCode, error);
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
                Sign Up to your account
              </h2>
            </div>
            <p className="mt-2 text-sm leading-6 ">
              Already a member?{" "}
              <Link
                href={ROUTE_LOGIN}
                className="font-semibold underline hover:text-blue-500"
              >
                Login
              </Link>
            </p>
            <div className="mt-10">
              <div>
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    companyName: "",
                    companySize: "",
                    email: "",
                    password: "",
                    submit: null,
                  }}
                  validationSchema={Yup.object().shape({
                    firstName: Yup.string().required("First name is required"),
                    lastName: Yup.string().required("Last name is required"),
                    companyName: Yup.string().required(
                      "Company name is required"
                    ),
                    companySize: Yup.string().required(
                      "Company size is required"
                    ),
                    email: Yup.string()
                      .email("Must be a valid email")
                      .max(255)
                      .required("Email is required"),
                    password: Yup.string()
                      .max(255)
                      .required("Password is required"),
                  })}
                  onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                  ) => {
                    handleRegister(
                      values.email,
                      values.password,
                      values.firstName,
                      values.lastName,
                      values.companyName,
                      values.companySize
                    );
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
                    <form
                      noValidate
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="flex gap-4">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium leading-6 "
                          >
                            First Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="firstName"
                              name="firstName"
                              type="text"
                              value={values.firstName}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              required
                              autoComplete="text"
                              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                            />
                          </div>
                          {touched.firstName && errors.firstName && (
                            <FormHelperText>{errors.firstName}</FormHelperText>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium leading-6 "
                          >
                            Last Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="lastName"
                              name="lastName"
                              type="text"
                              value={values.lastName}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              required
                              autoComplete="text"
                              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                            />
                          </div>
                          {touched.lastName && errors.lastName && (
                            <FormHelperText>{errors.lastName}</FormHelperText>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <label
                            htmlFor="companyName"
                            className="block text-sm font-medium leading-6 "
                          >
                            Company Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="companyName"
                              name="companyName"
                              type="text"
                              value={values.companyName}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              required
                              autoComplete="text"
                              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                            />
                          </div>
                          {touched.companyName && errors.companyName && (
                            <FormHelperText>
                              {errors.companyName}
                            </FormHelperText>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="companyName"
                            className="block text-sm font-medium leading-6 "
                          >
                            Company Size
                          </label>
                          <div className="mt-2">
                            <Select
                              data={companySizeOptions}
                              onChange={(selectedItem) => {
                                if (selectedItem.value !== values.companySize)
                                  setFieldValue(
                                    "companySize",
                                    selectedItem.value
                                  );
                              }}
                            />
                          </div>
                          {touched.companySize && errors.companySize && (
                            <FormHelperText>
                              {errors.companySize}
                            </FormHelperText>
                          )}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 "
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                          />
                        </div>
                        {touched.email && errors.email && (
                          <FormHelperText>{errors.email}</FormHelperText>
                        )}
                      </div>

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
                            onBlur={handleBlur}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                          />
                        </div>
                        {touched.password && errors.password && (
                          <FormHelperText>{errors.password}</FormHelperText>
                        )}
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-primary flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>

              {/* <div className="mt-10">
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center"
                  >
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className=" px-6 toogle-white color-primary">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4">
                  <Link
                    href="#"
                    className="btn-primary flex w-full items-center justify-center gap-3 rounded-md  px-3 py-2 text-sm font-semibold  shadow-sm"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                        fill="#34A853"
                      />
                    </svg>
                    <span className="text-sm font-semibold leading-6 text-white">
                      Google
                    </span>
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            alt=""
            src={LOGIN_BG_URL}
            width={1200}
            height={800}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex-center">
            <Image
              alt=""
              src={LOGIN_SUB_IMAGE_001_URL}
              width={1200}
              height={800}
              className="w-full aspect-auto max-w-[800px] px-8"
            />
          </div>
        </div>
      </div>
    </>
  );
}
