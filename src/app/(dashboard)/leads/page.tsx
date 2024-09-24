"use client";
import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { LeadFilterProvider } from "@/contexts/FilterLeadContext";
import { LeadSelectionProvider } from "@/contexts/LeadSelectionContext";
import { ROUTE_LEADS } from "@/data/routes";
import Leads from "@/views/leads";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_LEADS}>Leads</Link>
      </NavTitle>
      <div className="relative p-2 flex flex-1 bg-gray-100 overflow-hidden">
        <div className="overflow-auto flex-1 flex flex-col">
          {/* <div className="overflow-auto">
            <div className="card h-[1000px]" />
          </div> */}
          <LeadFilterProvider>
            <LeadSelectionProvider>
              <Suspense>
                <Leads />
              </Suspense>
            </LeadSelectionProvider>
          </LeadFilterProvider>
        </div>
      </div>
    </>
  );
}
