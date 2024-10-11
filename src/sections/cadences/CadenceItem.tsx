import React, { useState } from "react";
import ToggleButton from "@/components/extends/Button/ToggleButton";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { StarIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import {
  BaseCadenceModel,
  FetchCadenceModel,
  updateCadence,
} from "@/services/cadenceService";
import { handleError, runService } from "@/utils/service_utils";
import Link from "next/link";

export default function CadenceItem({
  cadence,
}: {
  cadence: FetchCadenceModel;
}) {
  const [starred, setStarred] = useState(cadence.star);
  const [active, setActive] = useState(cadence.isActive);
  const router = useRouter();

  const handleUpdateCadence = (updatedCadence: BaseCadenceModel) => {
    runService(
      { cadenceId: cadence.id, updatedCadence },
      updateCadence,
      (data) => {
        cadence = data;
      },
      (status, error) => {
        console.log(status, error);
        handleError(status, error);
      }
    );
  };

  const handleUpdateStarred = () => {
    const updatedStarred: boolean = !starred;
    setStarred(updatedStarred);
    handleUpdateCadence({ star: updatedStarred });
  };

  const handleUpdateActive = () => {
    const updatedActive: boolean = !active;
    setActive(updatedActive);
    handleUpdateCadence({
      isActive: updatedActive,
    });
  };

  return (
    <div className="w-full h-20 py-2 flex items-center border-b hover:bg-gray-300">
      <div className="px-4">
        <input className="shadow-none ring-0 focus:ring-0" type="checkbox" />
      </div>
      {/* <Link
        className="flex items-center flex-1 gap-2 cursor-pointer"
        href={`/cadences/${cadence.id}`}
      > */}
      <div
        className="flex items-center flex-1 gap-2 cursor-pointer"
        onClick={() => router.push(`/cadences/${cadence.id}`)}
      >
        <div className="min-w-64 flex flex-1 flex-col gap-1.5">
          <Link href={`/cadences/${cadence.id}`}>
            <div className="text-base font-semibold hover:underline">
              {cadence.name}
            </div>
          </Link>
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-blue-900">
              {cadence?.owner?.firstName} {cadence?.owner?.lastName}
            </span>
            <span className="text-gray-300">*</span>
            <span>{cadence.stepsCount} steps</span>
            {/* <span className="text-gray-300">*</span>
            <span>-</span> */}
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex text-xs px-2 border-x-2 border-dashed">
            <div className="w-min-15 px-2">
              <div>{cadence.activeCount}</div>
              <div className="text-nowrap">Active</div>
            </div>
            <div className="w-min-15 px-2">
              <div>{cadence.pausedCount}</div>
              <div className="text-nowrap">Paused</div>
            </div>
            <div className="w-min-15 px-2">
              <div>{cadence.bouncedCount}</div>
              <div className="text-nowrap">Bounced</div>
            </div>
            <div className="w-min-15 px-2">
              <div>{cadence.finishedCount}</div>
              <div className="text-nowrap">Finished</div>
            </div>
            <div className="w-min-15 px-2">
              <div>{0}</div>
              <div className="text-nowrap">Succeeded</div>
            </div>
          </div>
        </div>
      </div>
      {/* </Link> */}
      <div className="w-36 px-4 flex justify-between items-center gap-2">
        <div className="w-8 h-5">
          <ToggleButton
            checked={active ? active : false}
            handleChange={() => handleUpdateActive()}
          />
        </div>
        <div className="">
          <StarIcon
            className={`w-5 h-5 cursor-pointer ${
              starred ? "fill-blue-900 stroke-blue-900" : "stroke-gray-500"
            }`}
            onClick={() => handleUpdateStarred()}
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
                onClick={() => router.push(`/cadences/${cadence.id}`)}
              >
                Manage
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
