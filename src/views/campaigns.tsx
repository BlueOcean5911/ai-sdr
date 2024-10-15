"use client";
import { useEffect, useState } from "react";

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
import { handleError, runService } from "@/utils/service_utils";
import {
  CampaignModelWithCreatorAndOwner,
  deleteCampaign,
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
  const [campaigns, setCampaigns] = useState<
    CampaignModelWithCreatorAndOwner[]
  >([]);

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

  const handleDeleteCampaign = (id: string | undefined) => {
    runService(
      { id },
      deleteCampaign,
      () => {
        fetchTotalCount();
        fetchCampaigns();
      },
      (status, error) => {
        console.log(status, error);
      }
    );
  };

  const buildCampaign = () => {
    setCreate(true);
  };

  return (
    <div className="card p-4 flex flex-col flex-1 overflow-auto">
      <div className="inline-block w-full py-2 align-middle">
        <div className="flex justify-between items-center">
          <div />
          <div className="flex gap-4">
            <div className="btn-secondary">
              <EllipsisVerticalIcon className="w-4 h-4" />
              <span className="text-sm">Bulk Action</span>
            </div>
            <div className="btn-primary" onClick={() => buildCampaign()}>
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
                Descirption
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
                Owner
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white overflow-auto">
            {campaigns.map((campaign: CampaignModelWithCreatorAndOwner, id) => (
              <tr
                key={id}
                id="cadence-item"
                className="even:bg-blue-50 hover:bg-gray-300"
              >
                <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                  <Link
                    href={`/campaigns/${campaign.id}`}
                    className="cursor-pointer hover:underline hover:text-blue-900"
                  >
                    {campaign.title}
                  </Link>
                </td>
                <td className="whitespace-nowrap max-w-32 overflow-hidden text-ellipsis px-3 py-4 text-sm text-gray-500">
                  {campaign.description}
                </td>
                <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                  {campaign.creator.firstName} {campaign.creator.lastName}
                </td>
                <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                  {formatDate(campaign.createdAt)}
                </td>
                <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                  {campaign.owner.firstName} {campaign.owner.lastName}
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
                      <div className="px-2 py-4 min-w-32">
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
                        <Link href={`/campaigns/${campaign.id}`}>
                          <div className="rounded-md p-1 px-2 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                            Manage
                          </div>
                        </Link>
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
