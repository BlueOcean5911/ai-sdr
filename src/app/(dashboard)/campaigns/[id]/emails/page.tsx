"use client";

import { Suspense, useState } from "react";
import { EmailSelectionProvider } from "@/contexts/EmailSelectionContext";
import { EmailFilterProvider } from "@/contexts/FilterEmailContext";
import Emails from "@/views/emails";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <div className="relative flex flex-1 bg-gray-100 overflow-auto">
        <div className="overflow-auto flex-1 flex flex-col">
          <EmailFilterProvider>
            <EmailSelectionProvider>
              <Suspense>
                <Emails campaignId={id} />
              </Suspense>
            </EmailSelectionProvider>
          </EmailFilterProvider>
        </div>
      </div>
    </>
  );
}
