import React from "react";
import { CadenceStepProps } from "@/types";
import ToggleButton from "@/components/extends/Button/ToggleButton";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
  EnvelopeIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { CadenceStepModel } from "@/services/cadenceStepService";

export default function CadenceStep({
  cadenceStep,
}: {
  cadenceStep: CadenceStepModel;
}) {
  const router = useRouter();

  return (
    <div className="w-full h-min-40 flex flex-col bg-white rounded-md shadow-md">
      <div className="w-full h-12 flex text-nowrap">
        <div className="w-12 flex justify-center items-center border-r">
          <span className="px-2 text-xl">{cadenceStep.order}</span>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <div className="w-50 px-4 flex justify-between items-center gap-4">
            <div className="w-8 h-8 bg-slate-100 flex justify-center items-center rounded-full">
              <EnvelopeIcon className="w-4 h-4" />
            </div>
            <span className="font-semibold">{cadenceStep.name}</span>
          </div>
          <div className="flex items-center overflow-hidden">
            <div className="flex w-15 px-1 text-xs">
              {cadenceStep.activeCount} Active
            </div>
            <div className="flex w-15 px-1 text-xs">
              {cadenceStep.pausedCount} Paused
            </div>
            <div className="flex w-15 px-1 text-xs">
              {cadenceStep.notSentCount} Not sent
            </div>
            <div className="flex w-15 px-1 text-xs">
              {cadenceStep.bouncedCount} Bounced
            </div>
            <div className="flex w-15 px-1 text-xs">
              {cadenceStep.finishedCount} Finished
            </div>
          </div>
        </div>
        <div className="flex px-2 gap-2 justify-end items-center">
          <div className="justify-end text-xs">Deliver email in 30 minutes</div>
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
                  Edit
                </button>
              </MenuItem>
              <MenuItem>
                <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                  Clone
                </button>
              </MenuItem>
              <MenuItem>
                <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                  Move Up
                </button>
              </MenuItem>
              <MenuItem>
                <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                  Move Down
                </button>
              </MenuItem>
              <MenuItem>
                <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                  Delete
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
          <button>
            <Bars2Icon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="w-full min-h-20 px-4 py-1.5 flex border-y hover:bg-gray-100 cursor-pointer">
        <div className="flex flex-1 px-2 items-center overflow-auto">
          <div className="min-w-10 flex justify-center">
            <ToggleButton checked={true} handleChange={() => {}} />
          </div>
          <div className="min-w-40 px-4 flex">New Thread</div>
          <div className="min-w-60 px-4 flex flex-1 flex-col gap-1">
            <div className="text-base font-semibold">
              {cadenceStep.template?.subject}
            </div>
            <div className="text-sm line-clamp-2">
              {cadenceStep.template?.bodyText}
            </div>
          </div>
          <div className="flex items-center overflow-hidden">
            <div className="flex flex-col w-min-15 px-1 text-xs">
              <span>{cadenceStep.scheduledCount}</span>
              <span className="text-nowrap">Scheduled</span>
            </div>
            <div className="flex flex-col w-min-15 px-1 text-xs">
              <span>{cadenceStep.deliveredCount}</span>
              <span className="text-nowrap">Delivered</span>
            </div>
            <div className="flex flex-col w-min-15 px-1 text-xs">
              <span>{cadenceStep.bouncedCount}</span>
              <span className="text-nowrap">Bounced</span>
            </div>
            {/* <div className="flex flex-col w-min-15 px-1 text-xs">
              <span>-</span>
              <span className="text-nowrap">Spam Blocked</span>
            </div> */}
            <div className="flex flex-col w-min-15 px-1 text-xs">
              <span>{cadenceStep.replyCount}</span>
              <span className="text-nowrap">Reply</span>
            </div>
            <div className="flex flex-col w-min-15 px-1 text-xs">
              <span>{cadenceStep.interestedCount}</span>
              <span className="text-nowrap">Interested</span>
            </div>
            <div className="flex flex-col w-min-15 px-1 text-xs">
              <span>{cadenceStep.optOutCount}</span>
              <span className="text-nowrap">Opt out</span>
            </div>
          </div>
        </div>
        <div className="w-8 flex items-center">
          <Menu>
            <MenuButton className="">
              <div className="p-1 border rounded-md">
                <EllipsisHorizontalIcon className="w-5 h-5 stroke-gray-500" />
              </div>
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              className="flex flex-col w-16 origin-top bg-white rounded-md shadow-md border border-white/5 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
            >
              <MenuItem>
                <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                  Edit
                </button>
              </MenuItem>
              <MenuItem>
                <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                  Clone
                </button>
              </MenuItem>
              <MenuItem>
                <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                  Delete
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
      <div className="w-full h-10 px-4 flex items-center">
        {/* <button className="w-28 h-8 px-2 border rounded-md text-sm font-semibold hover:bg-gray-100">
          Add A/B Test
        </button> */}
      </div>
    </div>
  );
}
