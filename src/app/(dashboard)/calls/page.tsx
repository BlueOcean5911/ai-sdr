"use client";
import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_CATENCES } from "@/data/routes";
import { CallFilterProvider } from "@/contexts/FilterCallContext";
import { CallSelectionProvider } from "@/contexts/CallSelectionContext";
import Calls from "@/views/calls";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_CATENCES}>Calls</Link>
      </NavTitle>
      <div className="relative p-2 flex flex-1 bg-gray-100 overflow-auto">
        <div className="overflow-auto flex-1 flex flex-col">
          <CallFilterProvider>
            <CallSelectionProvider>
              <Suspense>
                <Calls />
              </Suspense>
            </CallSelectionProvider>
          </CallFilterProvider>
        </div>
      </div>
    </>
  );
}
