"use client";

import { Suspense } from "react";
import Cadences from "@/views/cadences";
import { CadenceFilterProvider } from "@/contexts/FilterCadenceContext";
import { CadenceSelectionProvider } from "@/contexts/CadenceSelectionContext";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <div className="relative flex flex-1 bg-gray-100 overflow-auto">
        <div className="overflow-auto flex-1 flex flex-col">
          <CadenceFilterProvider>
            <CadenceSelectionProvider>
              <Suspense>
                <Cadences campaignId={id} />
              </Suspense>
            </CadenceSelectionProvider>
          </CadenceFilterProvider>
        </div>
      </div>
    </>
  );
}
