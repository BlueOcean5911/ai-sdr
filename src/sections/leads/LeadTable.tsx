import CheckBox from "@/components/extends/CheckBox";
import { useLeadFilter } from "@/contexts/FilterLeadContext";
import { useLeadSelection } from "@/contexts/LeadSelectionContext";
import { contain } from "@/utils/string";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/extends/Pagination/Pagination";
import { LeadProps } from "@/types";

const LeadTable = () => {
  const { leadFilterConfig } = useLeadFilter();
  const {
    totalLeads,
    setTotalLeads,
    savedLeads,
    setSavedLeads,
    selectedLeads,
    setSelectedLeads,
  } = useLeadSelection();

  const [leads, setLeads] = useState<LeadProps[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log("here", totalLeads);
    setLeads([...totalLeads]);
  }, [totalLeads]);

  useEffect(() => {
    console.log("leads", leads);
  }, [leads]);

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams);
    if (currentParams.prospectedByCurrentTeam) {
      setLeads(savedLeads);
    } else {
      setLeads(totalLeads);
    }
  }, [searchParams]);

  useEffect(() => {
    const filteredLeads = leads.filter((lead: any) => {
      if (
        leadFilterConfig.title &&
        !contain(lead.title, leadFilterConfig.title)
      ) {
        return false;
      }
      if (
        leadFilterConfig.company &&
        !contain(lead.companyName, leadFilterConfig.company)
      ) {
        return false;
      }
      if (
        leadFilterConfig.location &&
        !contain(lead.currentLocation, leadFilterConfig.location)
      ) {
        return false;
      }
      return true;
    });
    setLeads(filteredLeads);
  }, [leadFilterConfig]);

  const handleAllSelected = (id: any, checked: boolean) => {
    if (checked) {
      setSelectedLeads(leads.map((lead: any) => lead));
    } else {
      setSelectedLeads([]);
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="min-w-full overflow-auto">
            <thead className="bg-white sticky top-0 z-10">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  <div className="flex gap-2">
                    <CheckBox
                      id="All Selection"
                      content=""
                      checked={allSelected}
                      onChange={(id, checked) => {
                        handleAllSelected(id, checked);
                        setAllSelected(!allSelected);
                      }}
                    />{" "}
                    ID
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Current Location
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  From
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {leads.map((lead: any) => (
                <tr
                  key={lead.id}
                  className="even:bg-olive-green-100 hover:bg-gray-100 "
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 rounded-l-md">
                    <div className="flex gap-2">
                      <CheckBox
                        id={lead.id}
                        content=""
                        value={lead}
                        checked={selectedLeads.find(
                          (itemLead: any) => itemLead.id === lead.id
                        )}
                        onChange={(changedLead, checked) => {
                          if (!checked) {
                            setSelectedLeads(
                              selectedLeads.filter(
                                (lead: any) => changedLead.id !== lead.id
                              )
                            );
                          } else {
                            console.log(checked);
                            setSelectedLeads([...selectedLeads, changedLead]);
                          }
                        }}
                      />{" "}
                      {lead.id}
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                    {lead.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {lead.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {lead.companyName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {lead.phone}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {lead.currentLocation}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {lead.origin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end px-16">
          <Pagination
            className="pagination-bar"
            totalCount={leads.length}
            pageSize={10}
            onPageChange={(pageSize: number, currentPage: number) =>
              console.log(pageSize, currentPage)
            }
          />
        </div>
      </div>
    </>
  );
};

export default LeadTable;
