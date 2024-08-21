"use client";

import Pagination from "@/components/Pagination/Pagination";
import Upload from "@/components/upload";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

const excels = [
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M910",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
];

export default function Page({}: {}) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
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
            <div className="flex flex-4 gap-4">
              <Upload text="Add CSV File" />
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-end px-16">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={10000}
            pageSize={10}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
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
                        File Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Creator
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {excels.map((excel, id) => (
                      <tr
                        key={id}
                        className="even:bg-olive-green-100 hover:bg-gray-100 "
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 rounded-l-md">
                          {excel.id}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                          {excel.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {excel.goal}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {excel.creator}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {excel.createdDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {excel.status}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3 rounded-r-md">
                          <Popover>
                            <PopoverButton className="block text-sm/6 font-semibold text-gray-900 focus:outline-none">
                              <EllipsisHorizontalCircleIcon className="w-5 h-5" />
                            </PopoverButton>
                            <PopoverPanel
                              transition
                              anchor="left"
                              className="divide-x rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:translate-x-2 translate-y-1/2 data-[closed]:opacity-0 shadow-md text-gray-900"
                            >
                              <div className="p-3">
                                <div className="rounded-md p-1 px-2 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                                  Active
                                </div>
                                <div className="rounded-md p-1 px-2 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                                  Disable
                                </div>
                                <div className="rounded-md p-1 px-2 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                                  <Link href={`/integration/excel/${excel.id}`}>
                                    Manage
                                  </Link>
                                </div>
                                <div className="rounded-md p-1 px-2 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                                  Delete
                                </div>
                              </div>
                            </PopoverPanel>
                          </Popover>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
