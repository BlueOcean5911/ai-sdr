// views/Personas.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  EllipsisHorizontalCircleIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

import Pagination from "@/components/Pagination/Pagination";
import ManagePersona from "@/sections/persona/manage-persona";

const dataList = [
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
  {
    id: "M909",
    category: "Lindsay Walton",
    status: "Active",
    name: "Marketing Leaders",
    jobTitle: "CEO",
    keywords: "Marketing",
    createdDate: "2024/08/12",
    location: "Europe, America, Singapore",
    industrySize: "100-500",
    leadCount: 100,
  },
];

const Personas = () => {
  return (
    <>
      <div className=" flex flex-1 gap-4">
        <div className="flex flex-1">
          <div className="card p-4 flex flex-col flex-1">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <form
                  action="#"
                  method="GET"
                  className="relative hidden md:flex "
                >
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
                  <div className="btn-secondary flex-center gap-2 p-2">
                    <EllipsisVerticalIcon className="w-4 h-4" />
                    <span>Bulk Action</span>
                  </div>
                  <ManagePersona type="create" persona={null}>
                    <div className="btn-primary flex-center gap-2 p-2">
                      <PlusCircleIcon className="w-4 h-4 stroke-white" />
                      Create Persona
                    </div>
                  </ManagePersona>
                </div>
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
                            Personal Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Job Titles
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Industry & Keywords
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
                            Location
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Employees
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Lead Count
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Edit
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {dataList.map((data, id) => (
                          <tr
                            key={id}
                            className="even:bg-olive-green-100 hover:bg-gray-100 select-none"
                            // onClick={() => }
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 rounded-l-md">
                              {data.name}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                              {data.jobTitle}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {data.keywords}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {data.createdDate}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {data.location}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {data.industrySize}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {data.leadCount}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
                                    <ManagePersona type="edit" persona={data}>
                                      <div className="rounded-md p-1 px-2 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                                        <span className="hover:underline">
                                          Manage
                                        </span>
                                      </div>
                                    </ManagePersona>

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
            {/* Pagination */}
            <div className="flex justify-end px-16">
              <Pagination
                className="pagination-bar"
                totalCount={dataList.length}
                pageSize={10}
                onPageChange={(pageSize: number, currentPage: number) =>
                  console.log(pageSize, currentPage)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Personas;