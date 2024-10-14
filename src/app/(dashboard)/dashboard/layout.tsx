"use client";
import Link from "next/link";
import { classNames } from "@/utils";
import { usePathname } from "next/navigation";
import {
  BellAlertIcon,
  CheckIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_DASHBOARD } from "@/data/routes";
import { useState } from "react";

const tempStatistics = {
  totalEmails: 60,
  emailDelivered: 32,
  emailOpened: 19,
  emailOpenedFromLastWeek: 18,
  emailReplied: 4,
  emailRepliedFromLastWeek: 4,
  emailInterested: 16,
  emailInterestedFromLastWeek: 13,
  totalCalls: 33,
  callConnected: 10,
  callConnectedFromLastWeek: 5,
  callPositive: 5,
  callPositiveFromLastWeek: 3,
  callAverageDuration: 143,
  callAverageDurationFromLastWeek: 259,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [statistics, setStatistics] = useState(tempStatistics);

  return (
    <>
      <NavTitle>
        <Link href={ROUTE_DASHBOARD}>Dashboard</Link>
      </NavTitle>
      <div className="p-4 flex flex-1 flex-col gap-4 bg-gray-100 overflow-auto">
        <div className="w-full flex flex-col xl:flex-row gap-4">
          <div className="w-full p-5 flex flex-col justify-between rounded-lg bg-white shadow-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-sky-200">
                  <EnvelopeIcon className="size-3.5 stroke-sky-950" />
                </div>
                <span className="text-lg font-semibold">
                  {statistics.emailDelivered} email delivered
                </span>
              </div>
              <span className="text-xs text-gray-400">Week-to-date</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-3 divide-y sm:divide-y-0 sm:divide-x">
              <div className="flex flex-col gap-1 grow">
                <span className="text-sm">
                  {statistics.emailOpened} email opened
                </span>
                <div className="flex justify-between items-center gap-6">
                  <span className="text-3xl">
                    {statistics.totalEmails
                      ? (
                          (statistics.emailOpened / statistics.totalEmails) *
                          100
                        ).toFixed(2)
                      : 0}
                    %
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-center rounded-md bg-green-200">
                      {statistics.totalEmails
                        ? (
                            (statistics.emailOpenedFromLastWeek /
                              statistics.totalEmails) *
                            100
                          ).toFixed(2)
                        : 0}
                      %
                    </span>
                    <span className="text-xs text-gray-400">
                      from last week
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 grow pt-2 sm:pt-0 sm:pl-2">
                <span className="text-sm">
                  {statistics.emailReplied} email replied
                </span>
                <div className="flex justify-between items-center gap-6">
                  <span className="text-3xl">
                    {statistics.totalEmails
                      ? (
                          (statistics.emailReplied / statistics.totalEmails) *
                          100
                        ).toFixed(2)
                      : 0}
                    %
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-center rounded-md bg-green-200">
                      {statistics.totalEmails
                        ? (
                            (statistics.emailRepliedFromLastWeek /
                              statistics.totalEmails) *
                            100
                          ).toFixed(2)
                        : 0}
                      %
                    </span>
                    <span className="text-xs text-gray-400">
                      from last week
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 grow pt-2 sm:pt-0 sm:pl-2">
                <span className="text-sm">
                  {statistics.emailInterested} email interested
                </span>
                <div className="flex justify-between items-center gap-6">
                  <span className="text-3xl">
                    {statistics.totalEmails
                      ? (
                          (statistics.emailInterested /
                            statistics.totalEmails) *
                          100
                        ).toFixed(2)
                      : 0}
                    %
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-center rounded-md bg-green-200">
                      {statistics.totalEmails
                        ? (
                            (statistics.emailInterestedFromLastWeek /
                              statistics.totalEmails) *
                            100
                          ).toFixed(2)
                        : 0}
                      %
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
                <span className="text-lg font-semibold">
                  {statistics.totalCalls} calls dialed
                </span>
              </div>
              <span className="text-xs text-gray-400">Week-to-date</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-3 divide-y sm:divide-y-0 sm:divide-x">
              <div className="flex flex-col gap-1 grow">
                <span className="text-sm">
                  {statistics.callConnected} calls connected
                </span>
                <div className="flex justify-between items-center gap-6">
                  <span className="text-3xl">
                    {statistics.totalCalls
                      ? (
                          (statistics.callConnected / statistics.totalEmails) *
                          100
                        ).toFixed(2)
                      : 0}
                    %
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-center rounded-md bg-green-200">
                      {statistics.totalCalls
                        ? (
                            (statistics.callConnectedFromLastWeek /
                              statistics.totalEmails) *
                            100
                          ).toFixed(2)
                        : 0}
                      %
                    </span>
                    <span className="text-xs text-gray-400">
                      from last week
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 grow pt-2 sm:pt-0 sm:pl-2">
                <span className="text-sm">
                  {statistics.callPositive} positive calls
                </span>
                <div className="flex justify-between items-center gap-6">
                  <span className="text-3xl">
                    {statistics.totalCalls
                      ? (
                          (statistics.callPositive / statistics.totalEmails) *
                          100
                        ).toFixed(2)
                      : 0}
                    %
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-center rounded-md bg-green-200">
                      {statistics.totalCalls
                        ? (
                            (statistics.callPositiveFromLastWeek /
                              statistics.totalEmails) *
                            100
                          ).toFixed(2)
                        : 0}
                      %
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
                  <span className="text-3xl">
                    {statistics.callAverageDuration}s
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-center rounded-md bg-green-200">
                      {statistics.callAverageDurationFromLastWeek}s
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
        <div className="p-5 flex flex-1 flex-col gap-3 rounded-lg bg-white shadow-md overflow-auto min-h-[768px]">
          <span className="text-lg font-semibold">Workspace</span>
          <div className="w-full flex items-center gap-2 border-b">
            <Link
              href="/dashboard/mailings"
              className={classNames(
                "text-sm hover:bg-gray-100",
                pathname === "/dashboard/mailings"
                  ? "border-b-2 border-blue-500"
                  : ""
              )}
            >
              <span
                className={classNames(
                  "p-2 flex flex-row items-center gap-2 border-b border-transparent",
                  pathname === "/dashboard/emails"
                    ? "font-semibold border-black"
                    : ""
                )}
              >
                <EnvelopeIcon className="w-3.5 h-3.5" />
                Mailings
              </span>
            </Link>
            <Link
              href="/dashboard/tasks"
              className={classNames(
                "text-sm hover:bg-gray-100",
                pathname === "/dashboard/tasks"
                  ? "border-b-2 border-blue-500"
                  : ""
              )}
            >
              <span
                className={classNames(
                  "p-2 flex flex-row items-center gap-2 border-b border-transparent",
                  pathname === "/dashboard/tasks"
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
              className={classNames(
                "text-sm hover:bg-gray-100",
                pathname === "/dashboard/alerts"
                  ? "border-b-2 border-blue-500"
                  : ""
              )}
            >
              <span
                className={classNames(
                  "p-2 flex flex-row items-center gap-2 border-b border-transparent",
                  pathname === "/dashboard/alerts"
                    ? "font-semibold border-black"
                    : ""
                )}
              >
                <BellAlertIcon className="w-3.5 h-3.5" />
                Alerts
              </span>
            </Link>
          </div>
          <div className="flex flex-1 flex-col gap-3 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
