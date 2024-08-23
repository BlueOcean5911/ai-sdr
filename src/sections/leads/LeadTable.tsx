import CheckBox from "@/components/CheckBox";
import Pagination from "@/components/Pagination/Pagination";
import { useLeadFilter } from "@/contexts/FilterLeadContext";
import { contain } from "@/utils/string";
import { useEffect, useState } from "react";

const defaultLeads = [
  {
    id: "M909",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Hubspot",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Hubspot",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Hubspot",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Hubspot",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Salesforce",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Salesforce",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Salesforce",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Salesforce",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    title: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
];

const LeadTable = () => {
  const [leads, setLeads] = useState(defaultLeads);
  const { leadFilterConfig } = useLeadFilter();

  useEffect(() => {
    const filteredLeads = defaultLeads.filter((lead: any) => {
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

  return (
    <>
      <div className="flex-1 flex flex-col gap-2">
        {/* Table */}
        <div className="px-4 sm:px-6 lg:px-8 flex-1">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                      >
                        <div className="flex gap-2">
                          <CheckBox id="All Selection" content="" /> ID
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
                    {leads.map((lead: any, id: number) => (
                      <tr
                        key={id}
                        className="even:bg-olive-green-100 hover:bg-gray-100 "
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 rounded-l-md">
                          <div className="flex gap-2">
                            <CheckBox id={"id" + id} content="" /> {lead.id}
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
            </div>
          </div>
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
