"use client";
import NavTitle from "@/components/DashboardLayout/Nav/Title";
import ManageStuff from "@/sections/account/ManageStuff";
import Link from "next/link";
import {
  ROUTE_ACCOUNT,
  ROUTE_ACCOUNT_COMPANY_DATA,
  ROUTE_ACCOUNT_PROFILE,
  ROUTE_ACCOUNT_USERS,
} from "@/data/routes";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Account() {
  const [change, setChange] = useState(false);
  const router = useRouter();

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
              <input id="firstName" type="text" className="input-primary" />
            </div>
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="lastName">
                Last Name:
              </label>
              <input id="lastName" type="text" className="input-primary" />
            </div>
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="title">
                Title:
              </label>
              <input id="title" type="text" className="input-primary" />
            </div>
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="email">
                Email:
              </label>
              <input id="email" type="text" className="input-primary" />
            </div>
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="phone">
                Phone:
              </label>
              <input id="phone" type="text" className="input-primary" />
            </div>{" "}
            <div className="flex flex-col gap-2">
              <button
                className="min-w-32 px-2 py-1.5 flex justify-center items-center gap-2 border-2 border-gray-300 rounded-md hover:bg-gray-200"
                onClick={() => setChange(!change)}
              >
                {change ? "Hide" : "Change Password"}
              </button>
              {change && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <label className="min-w-36" htmlFor="oldPassword">
                      Old Password:
                    </label>
                    <input
                      id="oldPassword"
                      type="password"
                      className="input-primary"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="min-w-36" htmlFor="newPassword">
                      New Password:
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      className="input-primary"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="min-w-36" htmlFor="confirmPassword">
                      Confirm Password:
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      className="input-primary"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                className="w-full p-2 rounded-md text-white bg-blue-500 hover:bg-blue-400"
                onClick={() => router.push("/campaigns/campaign.id/")}
              >
                Save
              </button>
              <button
                className="w-full p-2 rounded-md bg-gray-300 hover:bg-gray-200"
                onClick={() => router.push("/campaigns/campaign.id/")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
