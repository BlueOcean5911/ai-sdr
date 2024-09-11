import React, { useState } from "react";
import { CadenceItemProps } from "@/types";
import ToggleButton from "@/components/extends/Button/ToggleButton";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { StarIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function CadenceItem(props: CadenceItemProps) {
  const [starred, setStarred] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full h-20 py-2 flex items-center border-b hover:bg-gray-300">
      <div className="px-4">
        <input className="shadow-none ring-0 focus:ring-0" type="checkbox" />
      </div>
      <div
        className="flex items-center flex-1 gap-2 cursor-pointer"
        onClick={() => router.push(`/cadences/${"cadence.id"}`)}
      >
        <div className="min-w-64 flex flex-1 flex-col gap-1.5">
          <div className="text-base font-semibold">Upcoming Reward</div>
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-blue-900">User Name</span>
            <span className="text-gray-300">*</span>
            <span>4 steps</span>
            <span className="text-gray-300">*</span>
            <span>-</span>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex text-xs px-2 border-x-2 border-dashed">
            <div className="w-min-15 px-2">
              <div>-</div>
              <div className="text-nowrap">Active</div>
            </div>
            <div className="w-min-15 px-2">
              <div>-</div>
              <div className="text-nowrap">Paused</div>
            </div>
            <div className="w-min-15 px-2">
              <div>-</div>
              <div className="text-nowrap">Not sent</div>
            </div>
            <div className="w-min-15 px-2">
              <div>-</div>
              <div className="text-nowrap">Bounced</div>
            </div>
            <div className="w-min-15 px-2">
              <div>-</div>
              <div className="text-nowrap">Spam Blocked</div>
            </div>
            <div className="w-min-15 px-2">
              <div>-</div>
              <div className="text-nowrap">Finished</div>
            </div>
          </div>
          <div className="flex text-xs px-2 border-x-2 border-dashed">
            <div className="w-min-15 px-2">
              <div>-</div>
              <div className="text-nowrap">Scheduled</div>
            </div>
            <div className="w-min-15 px-2">
              <div>-</div>
              <div className="text-nowrap">Delivered</div>
            </div>
            <div className="w-min-15 px-2">
              <div>-</div>
              <div className="text-nowrap">Reply</div>
            </div>
            <div className="w-min-15 px-2">
              <div>-</div>
              <div className="text-nowrap">Interested</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-36 px-4 flex justify-between items-center gap-2">
        <div className="w-8 h-5">
          <ToggleButton checked={true} handleChange={() => {}} />
        </div>
        <div className="">
          <StarIcon
            className={`w-5 h-5 cursor-pointer ${
              starred ? "fill-blue-900 stroke-blue-900" : "stroke-gray-500"
            }`}
            onClick={() => setStarred(!starred)}
          />
        </div>
        <Menu>
          <MenuButton className="">
            <div className="p-1 border rounded-md hover:bg-white">
              <EllipsisHorizontalIcon className="w-5 h-5 stroke-gray-500" />
            </div>
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="flex flex-col w-20 origin-top bg-white rounded-md shadow-md border border-white/5 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
          >
            <MenuItem>
              <button
                className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                onClick={() => setStarred(!starred)}
              >
                {starred ? "Unstar" : "Star"}
              </button>
            </MenuItem>
            <MenuItem>
              <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                Achieve
              </button>
            </MenuItem>
            <MenuItem>
              <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                Clone
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                onClick={() => router.push(`/cadences/${"cadence.id"}`)}
              >
                Edit
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
