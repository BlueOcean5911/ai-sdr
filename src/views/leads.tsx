"use client";

import { LeadFilterProvider } from "@/contexts/FilterLeadContext";
import LeadTable from "@/sections/leads/LeadTable";

import FilterLead from "@/components/Filter/filter";

export default function Leads() {
  return (
    <div className="card p-4 flex flex-1">
      <LeadFilterProvider>
        <FilterLead />
        <LeadTable />
      </LeadFilterProvider>
    </div>
  );
}
