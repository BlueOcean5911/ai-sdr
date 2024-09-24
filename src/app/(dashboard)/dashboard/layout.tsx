"use client";
import Link from "next/link";
import { classNames } from "@/utils";
import { usePathname } from "next/navigation";
import {
  BellAlertIcon,
  CheckIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_DASHBOARD } from "@/data/routes";
import { PenIcon } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const endpoint =
    pathname.split("/").length > 1 ? pathname.split("/").at(1) : "";

  return (
    <>
      <NavTitle>
        <Link href={ROUTE_DASHBOARD}>Dashboard</Link>
      </NavTitle>
      <div className="p-4 flex flex-1 flex-col gap-4 bg-gray-100">
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full p-5 flex flex-col justify-between rounded-lg bg-white shadow-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-sky-200">
                  <EnvelopeIcon className="size-3.5 stroke-sky-950" />
                </div>
                <span className="text-lg font-semibold">0 email delivered</span>
              </div>
              <span className="text-xs text-gray-400">Week-to-date</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-3 divide-y sm:divide-y-0 sm:divide-x">
              <div className="flex flex-col gap-1 grow">
                <span className="text-sm">0 email opened</span>
                <div className="flex justify-between items-center gap-6">
                  <span className="text-3xl">0%</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-center rounded-md bg-green-200">
                      0%
                    </span>
                    <span className="text-xs text-gray-400">
                      from last week
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 grow pt-2 sm:pt-0 sm:pl-2">
                <span className="text-sm">0 email replied</span>
                <div className="flex justify-between items-center gap-6">
                  <span className="text-3xl">0%</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-center rounded-md bg-green-200">
                      0%
                    </span>
                    <span className="text-xs text-gray-400">
                      from last week
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 grow pt-2 sm:pt-0 sm:pl-2">
                <span className="text-sm">0 email interested</span>
                <div className="flex justify-between items-center gap-6">
                  <span className="text-3xl">0%</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-center rounded-md bg-green-200">
                      0%
                    </span>
                    <span className="text-xs text-gray-400">
                      from last week
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-5 flex flex-col justify-between rounded-lg bg-white shadow-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-pink-200">
                  <PhoneIcon className="size-3.5 stroke-pink-950" />
                </div>
                <span className="text-lg font-semibold">0 calls dialed</span>
              </div>
              <span className="text-xs text-gray-400">Week-to-date</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-3 divide-y sm:divide-y-0 sm:divide-x">
              <div className="flex flex-col gap-1 grow">
                <span className="text-sm">0 calls connected</span>
                <div className="flex justify-between items-center gap-6">
                  <span className="text-3xl">0%</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-center rounded-md bg-green-200">
                      0%
                    </span>
                    <span className="text-xs text-gray-400">
                      from last week
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 grow pt-2 sm:pt-0 sm:pl-2">
                <span className="text-sm">0 positive calls</span>
                <div className="flex justify-between items-center gap-6">
                  <span className="text-3xl">0%</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-center rounded-md bg-green-200">
                      0%
                    </span>
                    <span className="text-xs text-gray-400">
                      from last week
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 grow pt-2 sm:pt-0 sm:pl-2">
                <span className="text-sm">Average duration</span>
                <div className="flex justify-between items-center gap-6">
                  <span className="text-3xl">0s</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-center rounded-md bg-green-200">
                      0%
                    </span>
                    <span className="text-xs text-gray-400">
                      from last week
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 flex flex-1 flex-col gap-3 rounded-lg bg-white shadow-md">
          <span className="text-lg font-semibold">Workspace</span>
          <div className="w-full flex items-center gap-6 border-b">
            <Link
              href="/dashboard/emails"
              className=" rounded-md text-sm hover:bg-gray-100"
            >
              <span
                className={classNames(
                  "p-2 flex flex-row items-center gap-2 border-b border-transparent",
                  endpoint === "/dashboard/emails"
                    ? "font-semibold border-black"
                    : ""
                )}
              >
                <EnvelopeIcon className="w-3.5 h-3.5" />
                Recent Replies
              </span>
            </Link>
            <Link
              href="/dashboard/"
              className=" rounded-md text-sm hover:bg-gray-100"
            >
              <span
                className={classNames(
                  "p-2 flex flex-row items-center gap-2 border-b border-transparent",
                  endpoint === "/dashboard/" ? "font-semibold border-black" : ""
                )}
              >
                <UserPlusIcon className="w-3.5 h-3.5" />
                Recommended prospects
              </span>
            </Link>
            <Link
              href="/dashboard/"
              className=" rounded-md text-sm hover:bg-gray-100"
            >
              <span
                className={classNames(
                  "p-2 flex flex-row items-center gap-2 border-b border-transparent",
                  endpoint === "/dashboard/" ? "font-semibold border-black" : ""
                )}
              >
                <PenIcon className="w-3 h-3" />
                Message optimizations
              </span>
            </Link>
            <Link
              href="/dashboard/tasks"
              className=" rounded-md text-sm hover:bg-gray-100"
            >
              <span
                className={classNames(
                  "p-2 flex flex-row items-center gap-2 border-b border-transparent",
                  endpoint === "/dashboard/tasks"
                    ? "font-semibold border-black"
                    : ""
                )}
              >
                <CheckIcon className="w-3.5 h-3.5" />
                Tasks
              </span>
            </Link>
            <Link
              href="/dashboard/alerts"
              className=" rounded-md text-sm hover:bg-gray-100"
            >
              <span
                className={classNames(
                  "p-2 flex flex-row items-center gap-2 border-b border-transparent",
                  endpoint === "/dashboard/alerts"
                    ? "font-semibold border-black"
                    : ""
                )}
              >
                <BellAlertIcon className="w-3.5 h-3.5" />
                Alerts
              </span>
            </Link>
          </div>
          <div className="flex flex-1 flex-col gap-3">{children}</div>
        </div>
      </div>
    </>
  );
}
