"use client";

import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
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
        <div className="h-4 w-full" />
      </div>
    </>
  );
}
