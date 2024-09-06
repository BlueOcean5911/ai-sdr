"use client";
import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_CATENCES } from "@/data/routes";
import { EmailFilterProvider } from "@/contexts/FilterEmailContext";
import { EmailSelectionProvider } from "@/contexts/EmailSelectionContext";
import Emails from "@/views/emails";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_CATENCES}>Emails</Link>
      </NavTitle>
      <div className="relative p-2 flex flex-1 bg-gray-100 overflow-auto">
        <div className="overflow-auto flex-1 flex flex-col">
          <EmailFilterProvider>
            <EmailSelectionProvider>
              <Suspense>
                <Emails />
              </Suspense>
            </EmailSelectionProvider>
          </EmailFilterProvider>
        </div>
      </div>
    </>
  );
}
