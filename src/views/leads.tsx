"use client";

import LeadTable from "@/sections/leads/LeadTable";

import FilterLead from "@/components/Filter/filter";
import LeadToolbar from "@/sections/leads/LeadToolbar";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useLeadFilter } from "@/contexts/FilterLeadContext";
import { Suspense } from "react";

export default function Leads() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { leadFilterConfig, setLeadFilterConfig } = useLeadFilter();

  const handleSavedView = () => {
    // Get the current query parameters
    const currentParams = Object.fromEntries(searchParams.entries());

    // Check if the parameter exists
    if (!currentParams.prospectedByCurrentTeam) {
      // Add the new query parameter
      const newParams = new URLSearchParams(searchParams);
      newParams.set("prospectedByCurrentTeam", "yes");

      // Update the URL
      router.push(`${pathname}?${newParams.toString()}`);
    }
  };

  const handleTotalView = () => {
    // Get the current query parameters
    const currentParams = Object.fromEntries(searchParams.entries());

    // Check if the parameter exists
    if (currentParams.prospectedByCurrentTeam) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("prospectedByCurrentTeam");
      router.push(`${pathname}?${newParams.toString()}`);
    }
  };

  return (
    <div className="flex gap-2 overflow-auto flex-1">
      {leadFilterConfig.isOpen && <FilterLead />}
      <div className="card flex-1 flex flex-col overflow-auto">
        <TabGroup className="flex-1 flex flex-col overflow-auto">
          <TabList className="border-b-2 border-gray-100 flex gap-2 overflow-auto">
            <Tab
              className="pb-1 px-3 text-sm/6 font-semibold text-gray-900  focus:outline-none data-[hover]:text-blue-500 [hover]:text-blue-200 data-[selected]:text-blue-500 data-[selected]:border-b-blue-500 border-b-2"
              onClick={() => handleTotalView()}
            >
              Total
            </Tab>
            <Tab
              className="pb-1 px-3 text-sm/6 font-semibold text-gray-900  focus:outline-none data-[hover]:text-blue-500 [hover]:text-blue-200 data-[selected]:text-blue-500 data-[selected]:border-b-blue-500 border-b-2"
              onClick={() => handleSavedView()}
            >
              Saved
            </Tab>
          </TabList>
          <TabPanels className="flex-1 flex flex-col overflow-auto">
            <TabPanel className="flex-1 flex flex-col overflow-auto">
              <LeadToolbar />
              <div className="flex-1 overflow-auto flex">
                <Suspense>
                  <LeadTable />
                </Suspense>
              </div>
            </TabPanel>
            <TabPanel className="flex-1 flex flex-col overflow-auto">
              <LeadToolbar />
              <div className="flex-1 overflow-auto flex">
                <Suspense>
                  <LeadTable />
                </Suspense>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
