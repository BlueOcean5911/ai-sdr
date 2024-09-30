"use client";
import { useEffect, useState } from "react";
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
import CreateCampaign from "@/sections/campaigns/CreateCampaign";
import Pagination from "@/components/extends/Pagination/Pagination";
import ToggleButton from "@/components/extends/Button/ToggleButton";
import { handleError, runService } from "@/utils/service_utils";
import {
  CampaignModel,
  CampaignModelWithCreator,
  getCampaigns,
  getCampaignTotalCount,
} from "@/services/campaignService";
import { formatDate } from "@/utils/format";
import { CountModel } from "@/types";

export default function Campaigns() {
  const [create, setCreate] = useState(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [campaigns, setCampaigns] = useState<CampaignModelWithCreator[]>([]);

  const fetchCampaigns = () => {
    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    runService(
      { offset, limit },
      getCampaigns,
      (data) => {
        setCampaigns(data);
      },
      (status, error) => {
        console.log(status, error);
      }
    );
  };

  const fetchTotalCount = (targeted: boolean = false) => {
    runService(
      { targeted },
      getCampaignTotalCount,
      (data: CountModel) => {
        setTotalCount(data?.count ? data?.count : 0);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchTotalCount();
    fetchCampaigns();
  }, [pageSize, currentPage]);

  const handleStatusChange = (
    id: string | undefined,
    value: boolean | undefined
  ) => {
    setCampaigns(
      campaigns.map((campaign: CampaignModelWithCreator) => {
        if (campaign.id === id) {
          return { ...campaign, isActive: value };
        }
        return campaign;
      })
    );
  };

  const handleDeleteCampaign = (id: string | undefined) => {
    // TODO: Delete the cadence
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  const buildCampaign = () => {
    setCreate(true);
  };

  return (
    <div className="card p-4 flex flex-col flex-1 overflow-auto">
      <div className="inline-block w-full py-2 align-middle">
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
            <div className="min-w-32 px-2 py-1.5 flex justify-center items-center gap-2 border-2 border-gray-300 rounded-md hover:bg-gray-200">
              <EllipsisVerticalIcon className="w-4 h-4" />
              <span className="text-sm">Bulk Action</span>
            </div>
            <div
              className="p-2 flex-center gap-2 rounded-md bg-blue-500 hover:bg-blue-400 cursor-pointer"
              onClick={() => buildCampaign()}
            >
              <PlusCircleIcon className="w-4 h-4 stroke-white" />
              <span className="text-sm text-white">Build Campaign</span>
            </div>
          </div>
        </div>
      </div>
      {create && (
        <CreateCampaign
          close={() => setCreate(false)}
          click={() => {
            fetchTotalCount;
            fetchCampaigns();
          }}
        />
      )}
      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full divide-y divide-gray-300 text-nowrap overflow-auto">
          <thead className="bg-white sticky top-0 z-10">
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
              {/* <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Closed Date
              </th> */}
              {/* <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Active
              </th> */}
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white overflow-auto">
            {campaigns.map((campaign: CampaignModelWithCreator, id) => (
              <tr
                key={id}
                id="cadence-item"
                className="even:bg-blue-50 hover:bg-gray-300"
              >
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                  <Link
                    href={`/campaigns/${campaign.id}`}
                    className="cursor-pointer hover:underline hover:text-blue-900"
                  >
                    {campaign.title}
                  </Link>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {campaign.amount}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {campaign.description}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 uppercase">
                  {campaign.status}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {campaign.creator.firstName} {campaign.creator.lastName}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {formatDate(campaign.createdAt)}
                </td>
                {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {campaign.closedDate}
                </td> */}
                {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <ToggleButton checked={false} handleChange={() => {}} />
                </td> */}

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
                        {/* <div
                          className="rounded-md p-1 px-2 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleStatusChange(campaign?.id, true)}
                        >
                          Active
                        </div>
                        <div
                          className="rounded-md p-1 px-2 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleStatusChange(campaign.id, false)}
                        >
                          Disable
                        </div> */}
                        <div className="rounded-md p-1 px-2 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                          <Link href={`/campaigns/${campaign.id}`}>Manage</Link>
                        </div>
                        <div
                          className="rounded-md p-1 px-2 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleDeleteCampaign(campaign?.id)}
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
      {/* Pagination */}
      <div className="flex justify-end px-16">
        <Pagination
          className="pagination-bar"
          totalCount={totalCount}
          onPageChange={(pageSize: number, currentPage: number) => {
            setPageSize(pageSize);
            setCurrentPage(currentPage);
          }}
        />
      </div>
    </div>
  );
}
