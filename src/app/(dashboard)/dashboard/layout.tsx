"use client";
import Link from "next/link";
import { classNames } from "@/utils";
import { usePathname } from "next/navigation";
import {
  BellAlertIcon,
  CheckIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_DASHBOARD } from "@/data/routes";
import SalesMarketingStatistics from "@/sections/dashboard/SalesMarketingStatistics";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <NavTitle>
        <Link href={ROUTE_DASHBOARD}>Dashboard</Link>
      </NavTitle>
      <div className="p-4 flex flex-1 flex-col gap-4 bg-gray-100 overflow-auto">
        <SalesMarketingStatistics />
        <div className="p-5 flex flex-1 flex-col rounded-lg bg-white shadow-md overflow-auto min-h-[496px]">
          <span className="text-lg font-semibold">Workspace</span>
          <div className="w-full flex items-center gap-2 border-b mb-2">
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
                Emails
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
          <div className="flex flex-1 flex-col overflow-auto">{children}</div>
        </div>
      </div>
    </>
  );
}
