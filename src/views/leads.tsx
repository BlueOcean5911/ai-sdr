"use client";

import Pagination from "@/components/Pagination/Pagination";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  EllipsisHorizontalCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { useState } from "react";

const leads = [
  {
    id: "M909",
    name: "Lindsay Walton",
    role: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Hubspot",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    role: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Hubspot",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    role: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Hubspot",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    role: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Hubspot",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    role: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    role: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    role: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    role: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Salesforce",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    role: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Salesforce",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    role: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Salesforce",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    role: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "Salesforce",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    role: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    role: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    role: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    role: "CEO",
    companyName: "Microsoft Corporation",
    phone: "555-555-5555",
    currentLocation: "Texas",
    origin: "CSV",
  },
];

export default function Leads() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="card p-4 flex flex-col flex-1">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <form action="#" method="GET" className="relative hidden md:flex ">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            />
            <input
              id="search-field"
              name="search"
              type="search"
              placeholder="Search..."
              className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            />
          </form>
        </div>
      </div>
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
                      ID
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
                      Role
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
                  {leads.map((lead, id) => (
                    <tr
                      key={id}
                      className="even:bg-olive-green-100 hover:bg-gray-100 "
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 rounded-l-md">
                        {lead.id}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {lead.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {lead.role}
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
  );
}
