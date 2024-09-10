"use client";

import Link from "next/link";
import { useState } from "react";

import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_CATENCES } from "@/data/routes";
import {
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  InformationCircleIcon,
  PlusCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ToggleButton from "@/components/extends/Button/ToggleButton";
import CadenceStep from "@/sections/cadences/CadenceStep";
import AddStep from "@/sections/cadences/AddStep";
import { useRouter } from "next/navigation";

const defaultCadence = {
  id: "M909",
  name: "New Cadence",
  creator: "John Doe",
  createdDate: "2024/08/12",
  status: "Active",
  schema: "",
};

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [starred, setStarred] = useState(false);
  const [cadence, setCadence] = useState(defaultCadence);
  const router = useRouter();

  return (
    <>
      {/* <NavTitle>
        <Link className="hover:underline" href={ROUTE_CATENCES}>
          Cadences
        </Link>
        &nbsp;/&nbsp;
        {cadence.name}
      </NavTitle> */}
      <div className="flex flex-1 flex-col overflow-auto">
        <div className="w-full px-5 pt-2 flex items-center">
          <button
            className="p-1 text-sm rounded-md hover:bg-gray-100"
            onClick={() => router.push("/cadences")}
          >
            Cadences
          </button>
          <ChevronRightIcon className="w-3 h-3" />
          <button className="p-1 text-sm rounded-md hover:bg-gray-100">
            Upcoming Renewal
          </button>
        </div>
        <div className="w-full h-12 px-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ToggleButton checked={true} handleChange={() => {}} />
            <span className="text-xl">Upcoming Renewal</span>
            <div
              className="p-1 cursor-pointer rounded-md hover:bg-gray-100"
              onClick={() => setStarred(!starred)}
            >
              <StarIcon
                className={`w-5 h-5 ${
                  starred ? "fill-blue-900 stroke-blue-900" : "stroke-gray-500"
                }`}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Menu>
              <MenuButton className="">
                <div className="px-2 py-1.5 flex justify-center items-center border-2 border-gray-300 rounded-md hover:bg-gray-200">
                  <EllipsisHorizontalIcon className="w-5 h-5 stroke-gray-500" />
                </div>
              </MenuButton>
              <MenuItems
                anchor="bottom end"
                className="flex flex-col w-24 origin-top bg-white rounded-md shadow-md border border-white/5 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
              >
                <MenuItem>
                  <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                    Add a Step
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                    Clone
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                    Archive
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
            <button className="p-2 flex-center gap-2 rounded-md bg-blue-500 hover:bg-blue-400 cursor-pointer">
              <PlusCircleIcon className="w-4 h-4 stroke-white" />
              <span className="text-sm text-white">Add Contracts</span>
            </button>
          </div>
        </div>
        <div className="w-full h-8 px-5 flex items-center gap-2">
          <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
            <span
              className="p-1.5 cursor-pointer font-semibold"
              onClick={() => router.push("/cadences/cadence.id")}
            >
              Overview
            </span>
            <span className="w-full border-b-2 border-black"></span>
          </span>
          <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
            <span
              className="p-1.5 cursor-pointer"
              onClick={() => router.push("/cadences/cadence.id/contacts")}
            >
              Contacts
            </span>
            <span className="w-full border-b-2"></span>
          </span>
          <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
            <span
              className="p-1.5 cursor-pointer"
              onClick={() => router.push("/cadences/cadence.id/emails")}
            >
              Emails
            </span>
            <span className="w-full border-b-2"></span>
          </span>
          <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
            <span
              className="p-1.5 cursor-pointer"
              onClick={() => router.push("/cadences/cadence.id/settings")}
            >
              Settings
            </span>
            <span className="w-full border-b-2"></span>
          </span>
        </div>
        <div className="flex flex-1 flex-col bg-gray-100 overflow-auto">
          <div className="w-full h-10 p-5 flex justify-between items-center border">
            <span className="text-sm font-semibold uppercase">Statistics</span>
            <span className="flex flex-row gap-2 items-center text-sm font-semibold uppercase">
              Email stats per individual contact
              <span>
                <InformationCircleIcon className="w-4 h-4" />
              </span>
            </span>
          </div>
          <div className="w-full h-14 px-5 flex justify-between items-center border bg-white">
            <div className="flex items-center font-semibold">
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>-</span>
                <span className="text-nowrap">Active</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>-</span>
                <span className="text-nowrap">Paused</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>-</span>
                <span className="text-nowrap">Finished</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>-</span>
                <span className="text-nowrap">Bounced</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>-</span>
                <span className="text-nowrap">Not sent</span>
              </div>
            </div>
            <div className="flex items-center font-semibold">
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>-</span>
                <span className="text-nowrap">Scheduled</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>-</span>
                <span className="text-nowrap">Delivered</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>-</span>
                <span className="text-nowrap">Reply</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>-</span>
                <span className="text-nowrap">Interested</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>-</span>
                <span className="text-nowrap">Opt out</span>
              </div>
            </div>
          </div>
          <div className="w-full p-4 flex flex-col gap-4">
            <CadenceStep />
            <CadenceStep />
            <CadenceStep />
            <CadenceStep />
            <AddStep />
            <div className="h-4 w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
