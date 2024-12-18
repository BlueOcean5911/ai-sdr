"use client";

import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_ALERTS } from "@/data/routes";
import AlertPage from "@/views/alert";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_ALERTS}>Alerts</Link>
      </NavTitle>
      <div className="relative flex flex-1 bg-gray-100 overflow-auto">
        <div className="overflow-auto flex-1 flex flex-col p-4">
          <Suspense>
            <AlertPage />
          </Suspense>
        </div>
      </div>
    </>
  );
}
