"use client";

import { Suspense } from "react";
import { ContactSelectionProvider } from "@/contexts/ContactSelectionContext";
import { ContactFilterProvider } from "@/contexts/FilterContactContext";
import CadenceContacts from "@/views/cadenceContacts";
import { useCadence } from "@/contexts/CadenceContext";

export default function Page() {
  const { cadence } = useCadence();

  return (
    <>
      <div className="flex flex-1 flex-col overflow-auto">
        <div className="relative flex flex-1 bg-gray-100 overflow-auto">
          <div className="overflow-auto flex-1 flex flex-col">
            <ContactFilterProvider>
              <ContactSelectionProvider>
                <Suspense>
                  <CadenceContacts cadenceId={cadence?.id} />
                </Suspense>
              </ContactSelectionProvider>
            </ContactFilterProvider>
          </div>
        </div>
      </div>
    </>
  );
}
