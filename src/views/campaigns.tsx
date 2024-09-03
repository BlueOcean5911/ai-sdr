"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  EllipsisHorizontalCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Pagination from "@/components/extends/Pagination/Pagination";

const defaultCampaigns = [
  {
    id: "M909-1",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-2",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-3",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-4",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-5",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-6",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-7",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-8",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-9",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-10",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-11",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-12",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-13",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-14",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-15",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-16",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-17",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-18",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
];

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState(defaultCampaigns);
  const router = useRouter();

  const handleStatusChange = (id: string, status: number) => {
    setCampaigns(
      campaigns.map((campaign) => {
        if (campaign.id === id) {
          // Return a new object with the updated status
          return { ...campaign, status };
        }
        return campaign; // Return the unchanged campaign
      })
    );
  };

  const handleDeleteCampaign = (id: string) => {
    // TODO: Delete the cadence
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  const buildCampaign = () => {
    //  TODO: Create a new cadence with API and retrieve the new cadence ID
    const newCadenceId = "M909";
    router.push(`/campaigns/${newCadenceId}/create`);
  };

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
          <div className="flex flex-4 gap-4">
            <div className="btn-secondary flex-center gap-2 p-2">
              <EllipsisVerticalIcon className="w-4 h-4" />
              <span>Bulk Action</span>
            </div>
            <div
              className="btn-primary flex-center gap-2 p-2"
              onClick={() => buildCampaign()}
            >
              <PlusCircleIcon className="w-4 h-4 stroke-white" />
              Build Campaign
            </div>
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
                      Goal
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
                  {campaigns.map((campaign, id) => (
                    <tr
                      key={id}
                      className="even:bg-blue-100 hover:bg-gray-100 "
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 rounded-l-md">
                        {campaign.id}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {campaign.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.goal}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.creator}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.createdDate}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.status === 0 ? (
                          <span className="p-2 bg-green-200 rounded-md">
                            Active
                          </span>
                        ) : (
                          <span className="p-2 bg-red-200 rounded-md">
                            Disabled
                          </span>
                        )}
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
                              <div
                                className="rounded-md p-1 px-2 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                                onClick={() =>
                                  handleStatusChange(campaign.id, 0)
                                }
                              >
                                Active
                              </div>
                              <div
                                className="rounded-md p-1 px-2 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                                onClick={() =>
                                  handleStatusChange(campaign.id, 1)
                                }
                              >
                                Disable
                              </div>
                              <div className="rounded-md p-1 px-2 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                                <Link href={`/campaigns/${campaign.id}`}>
                                  Manage
                                </Link>
                              </div>
                              <div
                                className="rounded-md p-1 px-2 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                                onClick={() =>
                                  handleDeleteCampaign(campaign.id)
                                }
                              >
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
          totalCount={campaigns.length}
          onPageChange={(pageSize: number, currentPage: number) =>
            console.log(pageSize, currentPage)
          }
        />
      </div>
    </div>
  );
}
