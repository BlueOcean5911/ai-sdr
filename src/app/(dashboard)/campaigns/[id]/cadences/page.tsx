"use client";

import { Suspense, useState } from "react";
import { ContactSelectionProvider } from "@/contexts/ContactSelectionContext";
import { ContactFilterProvider } from "@/contexts/FilterContactContext";
import Contacts from "@/views/contacts";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <div className="relative p-2 flex flex-1 bg-gray-100 overflow-auto">
        <div className="overflow-auto flex-1 flex flex-col">
          <ContactFilterProvider>
            <ContactSelectionProvider>
              <Suspense>
                <Contacts />
              </Suspense>
            </ContactSelectionProvider>
          </ContactFilterProvider>
        </div>
      </div>
    </>
  );
}
