"use client";

import CompanyTable from "@/sections/companies/CompanyTable";

import FilterCompany from "@/components/Filter/filterCompany";
import CompanyToolbar from "@/sections/companies/CompanyToolbar";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCompanyFilter } from "@/contexts/FilterCompanyContext";
import { Suspense } from "react";

export default function Companys() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { companyFilterConfig, setCompanyFilterConfig } = useCompanyFilter();

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
      {companyFilterConfig.isOpen && <FilterCompany />}
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
              <CompanyToolbar />
              <div className="flex-1 overflow-auto flex">
                <Suspense>
                  <CompanyTable />
                </Suspense>
              </div>
            </TabPanel>
            <TabPanel className="flex-1 flex flex-col overflow-auto">
              <CompanyToolbar />
              <div className="flex-1 overflow-auto flex">
                <Suspense>
                  <CompanyTable />
                </Suspense>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
