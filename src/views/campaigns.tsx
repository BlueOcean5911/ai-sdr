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
    id: "1",
    title: "Project Alpha",
    amount: 1500.0,
    description: "Initial funding for Project Alpha.",
    creator: "Alice Johnson",
    createdDate: "2024-01-15",
    status: 1,
  },
  {
    id: "2",
    title: "Marketing Campaign",
    amount: 3000.0,
    description: "Budget for the upcoming marketing campaign.",
    creator: "Bob Smith",
    createdDate: "2024-02-10",
    status: 0,
  },
  {
    id: "3",
    title: "Website Redesign",
    amount: 2500.0,
    description: "Redesign of the company website.",
    creator: "Charlie Brown",
    createdDate: "2024-02-25",
    status: 1,
  },
  {
    id: "4",
    title: "Research Grant",
    amount: 5000.0,
    description: "Funding for research on renewable energy.",
    creator: "Diana Prince",
    createdDate: "2024-03-01",
    status: 1,
  },
  {
    id: "5",
    title: "Software Development",
    amount: 7000.0,
    description: "Development of a new software application.",
    creator: "Ethan Hunt",
    createdDate: "2024-03-15",
    status: 1,
  },
  {
    id: "6",
    title: "Office Supplies",
    amount: 500.0,
    description: "Purchase of office supplies for the team.",
    creator: "Fiona Gallagher",
    createdDate: "2024-03-20",
    status: 0,
  },
  {
    id: "7",
    title: "Team Building Event",
    amount: 1200.0,
    description: "Budget for the annual team building event.",
    creator: "George Lucas",
    createdDate: "2024-04-05",
    status: 1,
  },
  {
    id: "8",
    title: "New Equipment",
    amount: 3500.0,
    description: "Purchase of new equipment for the office.",
    creator: "Hannah Montana",
    createdDate: "2024-04-10",
    status: 1,
  },
  {
    id: "9",
    title: "Training Program",
    amount: 2000.0,
    description: "Budget for employee training programs.",
    creator: "Ian Malcolm",
    createdDate: "2024-04-15",
    status: 0,
  },
  {
    id: "10",
    title: "Product Launch",
    amount: 4000.0,
    description: "Funding for the upcoming product launch.",
    creator: "Jack Sparrow",
    createdDate: "2024-05-01",
    status: 1,
  },
  {
    id: "11",
    title: "Consulting Fees",
    amount: 3000.0,
    description: "Fees for consulting services.",
    creator: "Karen Walker",
    createdDate: "2024-05-10",
    status: 0,
  },
  {
    id: "12",
    title: "Event Sponsorship",
    amount: 2500.0,
    description: "Sponsorship for a local event.",
    creator: "Leo DiCaprio",
    createdDate: "2024-05-15",
    status: 1,
  },
  {
    id: "13",
    title: "Office Renovation",
    amount: 8000.0,
    description: "Renovation of the office space.",
    creator: "Mia Wallace",
    createdDate: "2024-06-01",
    status: 1,
  },
  {
    id: "14",
    title: "Travel Expenses",
    amount: 1500.0,
    description: "Travel expenses for the conference.",
    creator: "Nina Simone",
    createdDate: "2024-06-05",
    status: 0,
  },
  {
    id: "15",
    title: "Charity Donation",
    amount: 1000.0,
    description: "Donation to a local charity.",
    creator: "Oscar Wilde",
    createdDate: "2024-06-10",
    status: 1,
  },
  {
    id: "16",
    title: "IT Support",
    amount: 2000.0,
    description: "Monthly IT support fees.",
    creator: "Peter Parker",
    createdDate: "2024-06-15",
    status: 1,
  },
  {
    id: "17",
    title: "Social Media Ads",
    amount: 1800.0,
    description: "Budget for social media advertising.",
    creator: "Quinn Fabray",
    createdDate: "2024-07-01",
    status: 0,
  },
  {
    id: "18",
    title: "Legal Fees",
    amount: 3000.0,
    description: "Legal fees for contract review.",
    creator: "Rick Grimes",
    createdDate: "2024-07-10",
    status: 1,
  },
  {
    id: "19",
    title: "New Hire Onboarding",
    amount: 1200.0,
    description: "Expenses for onboarding new hires.",
    creator: "Sarah Connor",
    createdDate: "2024-07-15",
    status: 1,
  },
  {
    id: "20",
    title: "Product Development",
    amount: 6000.0,
    description: "Funding for product development.",
    creator: "Tony Stark",
    createdDate: "2024-08-01",
    status: 0,
  },
  {
    id: "21",
    title: "Website Hosting",
    amount: 800.0,
    description: "Annual website hosting fees.",
    creator: "Uma Thurman",
    createdDate: "2024-08-05",
    status: 1,
  },
  {
    id: "22",
    title: "Market Research",
    amount: 2500.0,
    description: "Budget for market research.",
    creator: "Vin Diesel",
    createdDate: "2024-08-10",
    status: 1,
  },
  {
    id: "23",
    title: "Customer Feedback Survey",
    amount: 700.0,
    description: "Cost of conducting customer surveys.",
    creator: "Will Smith",
    createdDate: "2024-08-15",
    status: 0,
  },
  {
    id: "24",
    title: "Annual Report",
    amount: 1500.0,
    description: "Cost of preparing the annual report.",
    creator: "Xena Warrior",
    createdDate: "2024-09-01",
    status: 1,
  },
  {
    id: "25",
    title: "Health Insurance",
    amount: 3000.0,
    description: "Monthly health insurance premium.",
    creator: "Yoda",
    createdDate: "2024-09-05",
    status: 1,
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
          <div className="flex gap-4">
            <div className="p-1 flex-center gap-2 rounded-md bg-gray-300 cursor-pointer">
              <EllipsisVerticalIcon className="w-4 h-4" />
              <span className="text-sm">Bulk Action</span>
            </div>
            <div
              className="p-1 flex-center gap-2 rounded-md bg-blue-500 cursor-pointer"
              onClick={() => buildCampaign()}
            >
              <PlusCircleIcon className="w-4 h-4 stroke-white" />
              <span className="text-sm text-white">Build Campaign</span>
            </div>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="px-4 sm:px-6 lg:px-8 flex-1">
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 text-nowrap">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Descirption
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Current Status
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
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {campaign.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.amount}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.status}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.creator}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.createdDate}
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
