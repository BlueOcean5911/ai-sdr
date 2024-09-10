"use client";

import { Suspense, useState } from "react";
import {
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  InformationCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ToggleButton from "@/components/extends/Button/ToggleButton";
import CadenceStep from "@/sections/cadences/CadenceStep";
import AddStep from "@/sections/cadences/AddStep";
import { useRouter } from "next/navigation";
import { EmailSelectionProvider } from "@/contexts/EmailSelectionContext";
import { EmailFilterProvider } from "@/contexts/FilterEmailContext";
import Emails from "@/views/emails";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [starred, setStarred] = useState(false);
  const router = useRouter();

  return (
    <>
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
          <ChevronRightIcon className="w-3 h-3" />
          <button className="p-1 text-sm rounded-md hover:bg-gray-100">
            Settings
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
                <div className="p-1 border rounded-md">
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
            <button className="px-2 py-1 rounded-md text-white bg-blue-900">
              Add Contracts
            </button>
          </div>
        </div>
        <div className="w-full h-8 px-5 flex items-center gap-2">
          <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
            <span
              className="p-1.5 cursor-pointer"
              onClick={() => router.push("/cadences/cadence.id")}
            >
              Overview
            </span>
            <span className="w-full border-b-2"></span>
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
              className="p-1.5 cursor-pointer font-semibold"
              onClick={() => router.push("/cadences/cadence.id/settings")}
            >
              Settings
            </span>
            <span className="w-full border-b-2 border-black"></span>
          </span>
        </div>
        <div className="p-2 flex flex-1 bg-gray-100 overflow-auto text-sm">
          <div className="flex flex-1 justify-center items-center rounded-md bg-white">
            <div className="p-8 max-w-lg w-full flex flex-col gap-5 rounded-md bg-gray-100">
              <div className="flex items-center">
                <label className="min-w-24" htmlFor="name">
                  Name:
                </label>
                <input id="name" type="text" className="input-primary" />
              </div>
              <div className="flex items-center">
                <label className="min-w-24" htmlFor="owner">
                  Owner:
                </label>
                <input id="owner" type="text" className="input-primary" />
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="w-full p-2 rounded-md text-white bg-blue-500 hover:bg-blue-400"
                  onClick={() => router.push("/cadences/campaign.id/")}
                >
                  Save
                </button>
                <button
                  className="w-full p-2 rounded-md bg-gray-300 hover:bg-gray-200"
                  onClick={() => router.push("/cadences/campaign.id/")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
