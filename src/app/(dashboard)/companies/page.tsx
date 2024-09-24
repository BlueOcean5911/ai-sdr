"use client";
import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { CompanyFilterProvider } from "@/contexts/FilterCompanyContext";
import { CompanySelectionProvider } from "@/contexts/CompanySelectionContext";
import { ROUTE_COMPANIES } from "@/data/routes";
import Companies from "@/views/companies";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_COMPANIES}>Companies</Link>
      </NavTitle>
      <div className="relative p-2 flex flex-1 bg-gray-100 overflow-hidden">
        <div className="overflow-auto flex-1 flex flex-col">
          <CompanyFilterProvider>
            <CompanySelectionProvider>
              <Suspense>
                <Companies />
              </Suspense>
            </CompanySelectionProvider>
          </CompanyFilterProvider>
        </div>
      </div>
    </>
  );
}
