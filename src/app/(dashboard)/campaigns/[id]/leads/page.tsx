"use client";

import { Suspense, useState } from "react";
import { LeadSelectionProvider } from "@/contexts/LeadSelectionContext";
import { LeadFilterProvider } from "@/contexts/FilterLeadContext";
import Leads from "@/views/leads";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <div className="relative p-2 flex flex-1 bg-gray-100 overflow-auto">
        <div className="overflow-auto flex-1 flex flex-col">
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
