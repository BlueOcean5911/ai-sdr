// app/integration/hubspot/layout.tsx
"use client";

import {
  ROUTE_INTEGRATION_HUBSPOT_COMPANIES,
  ROUTE_INTEGRATION_HUBSPOT_CONTACTS,
} from "@/data/routes";
import { classNames } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <>
      <div className="p-4 bg-gray-100 h-full w-full">
        <div className="p-5 rounded-lg shadow-lg flex flex-col h-full bg-white">
          <div className="flex gap-2">
            <Link href={ROUTE_INTEGRATION_HUBSPOT_COMPANIES}>
              <div
                className={classNames(
                  "pb-1 px-3 text-sm/6 font-semibold focus:outline-none hover:text-blue-400",
                  path.endsWith(ROUTE_INTEGRATION_HUBSPOT_COMPANIES)
                    ? "text-blue-500 border-b-2 border-b-blue-500"
                    : ""
                )}
              >
                Companies
              </div>
            </Link>
            <Link href={ROUTE_INTEGRATION_HUBSPOT_CONTACTS}>
              <div
                className={classNames(
                  "pb-1 px-3 text-sm/6 font-semibold focus:outline-none hover:text-blue-400",
                  path.endsWith(ROUTE_INTEGRATION_HUBSPOT_CONTACTS)
                    ? "text-blue-500 border-b-2 border-b-blue-500"
                    : ""
                )}
              >
                Contacts
              </div>
            </Link>
          </div>
          <div className="py-2 flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
