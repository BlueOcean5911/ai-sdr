"use client";
import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_CATENCES } from "@/data/routes";
import { CadenceFilterProvider } from "@/contexts/FilterCadenceContext";
import { CadenceSelectionProvider } from "@/contexts/CadenceSelectionContext";
import Cadences from "@/views/cadences";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_CATENCES}>Cadences</Link>
      </NavTitle>
      <div className="relative p-2 flex flex-1 bg-gray-100 overflow-auto">
        <div className="overflow-auto flex-1 flex flex-col">
          <CadenceFilterProvider>
            <CadenceSelectionProvider>
              <Suspense>
                <Cadences />
              </Suspense>
            </CadenceSelectionProvider>
          </CadenceFilterProvider>
        </div>
      </div>
    </>
  );
}
