"use client";

import { Suspense } from "react";
import { EmailSelectionProvider } from "@/contexts/EmailSelectionContext";
import { EmailFilterProvider } from "@/contexts/FilterEmailContext";
import Emails from "@/views/emails";
import { useCadence } from "@/contexts/CadenceContext";

export default function Page() {
  const { cadence } = useCadence();

  return (
    <>
      <div className="flex flex-1 flex-col overflow-auto">
        <div className="relative flex flex-1 bg-gray-100 overflow-auto">
          <div className="overflow-auto flex-1 flex flex-col">
            <EmailFilterProvider>
              <EmailSelectionProvider>
                <Suspense>
                  <Emails cadenceId={cadence.id} />
                </Suspense>
              </EmailSelectionProvider>
            </EmailFilterProvider>
          </div>
        </div>
      </div>
    </>
  );
}
