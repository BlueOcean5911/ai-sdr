"use client";

import { Suspense, useState } from "react";
import { LeadSelectionProvider } from "@/contexts/LeadSelectionContext";
import { LeadFilterProvider } from "@/contexts/FilterLeadContext";
import Leads from "@/views/leads";
import { ContactFilterProvider } from "@/contexts/FilterContactContext";
import { ContactSelectionProvider } from "@/contexts/ContactSelectionContext";
import Contacts from "@/views/contacts";
import CampaignContacts from "@/views/campaignContacts";
import CadenceContacts from "@/views/cadenceContacts";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log("campaign id", id);
  return (
    <>
      <div className="relative flex flex-1 bg-gray-100 overflow-auto">
        <div className="overflow-auto flex-1 flex flex-col">
          <ContactFilterProvider>
            <ContactSelectionProvider>
              <Suspense>
                <CadenceContacts campaignId={id} />
              </Suspense>
            </ContactSelectionProvider>
          </ContactFilterProvider>
        </div>
      </div>
    </>
  );
}
