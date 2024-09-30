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

const Page = () => {
  return (
    <>
      <div className="w-full px-5 pt-2 flex items-center">
        <Link href={ROUTE_ACCOUNT_PROFILE}>
          <button className="p-1 text-sm rounded-md hover:bg-gray-100">
            Account
          </button>
        </Link>
        <ChevronRightIcon className="w-3 h-3" />
        <Link href={ROUTE_ACCOUNT_PROFILE}>
          <button className="p-1 text-sm rounded-md hover:bg-gray-100">
            Users
          </button>
        </Link>
      </div>
      <div className="w-full h-8 px-5 flex items-center gap-2">
        <Link href={ROUTE_ACCOUNT_PROFILE}>
          <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
            <span className="p-1.5 cursor-pointer">Profile</span>
            <span className="w-full border-b-2"></span>
          </span>
        </Link>
        <Link href={ROUTE_ACCOUNT_USERS}>
          <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
            <span className="p-1.5 cursor-pointer font-semibold">Users</span>
            <span className="w-full border-b-2  border-black"></span>
          </span>
        </Link>
        <Link href={ROUTE_ACCOUNT_COMPANY_DATA}>
          <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
            <span className="p-1.5 cursor-pointer">Company Data</span>
            <span className="w-full border-b-2"></span>
          </span>
        </Link>
      </div>

      <div className="card p-2 h-full flex flex-col bg-gray-100 overflow-auto">
        <ManageStuff />
      </div>
    </>
  );
};

export default Page;
