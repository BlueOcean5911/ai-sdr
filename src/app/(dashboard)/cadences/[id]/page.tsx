"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
import { handleError, runService } from "@/utils/service_utils";
import {
  BaseCadenceModel,
  FetchCadenceModel,
  getCadenceById,
  updateCadence,
} from "@/services/cadenceService";
import {
  CadenceStepModel,
  getCadenceSteps,
  getCadenceStepsByCadenceId,
} from "@/services/cadenceStepService";

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
  const [active, setActive] = useState(false);
  const [cadence, setCadence] = useState<FetchCadenceModel>();
  const [cadenceSteps, setCadenceSteps] = useState<CadenceStepModel[]>([]);
  const router = useRouter();

  const handleUpdateCadence = (updatedCadence: BaseCadenceModel) => {
    runService(
      { cadenceId: cadence?.id, updatedCadence },
      updateCadence,
      (data) => {
        setCadence(data);
      },
      (status, error) => {
        console.log(status, error);
        handleError(status, error);
      }
    );
  };

  const handleUpdateActive = () => {
    const updatedActive: boolean = !active;
    setActive(updatedActive);
    handleUpdateCadence({
      isActive: updatedActive,
    });
  };

  const handleUpdateStarred = () => {
    const updatedStarred: boolean = !starred;
    setStarred(updatedStarred);
    handleUpdateCadence({ star: updatedStarred });
  };

  const fetchCadence = () => {
    runService(
      id,
      getCadenceById,
      (data) => {
        setCadence(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const fetchCadenceStepsByCadenceId = () => {
    runService(
      { cadenceId: id },
      getCadenceStepsByCadenceId,
      (data) => {
        console.log("cadence steps", data);
        setCadenceSteps(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchCadence();
    fetchCadenceStepsByCadenceId();
  }, []);

  useEffect(() => {
    setStarred(cadence?.star ? true : false);
    setActive(cadence?.isActive ? true : false);
  }, [cadence]);

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
            {cadence?.name}
          </button>
        </div>
        <div className="w-full h-12 px-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ToggleButton
              checked={active}
              handleChange={() => handleUpdateActive()}
            />
            <span className="text-xl">{cadence?.name}</span>
            <div
              className="p-1 cursor-pointer rounded-md hover:bg-gray-100"
              onClick={() => handleUpdateStarred()}
            >
              <StarIcon
                className={`w-5 h-5 ${
                  starred ? "fill-blue-900 stroke-blue-900" : "stroke-gray-500"
                }`}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* <Menu>
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
            </Menu> */}
            <button className="p-2 flex-center gap-2 rounded-md bg-blue-500 hover:bg-blue-400 cursor-pointer">
              <PlusCircleIcon className="w-4 h-4 stroke-white" />
              <span className="text-sm text-white">Add Contracts</span>
            </button>
          </div>
        </div>
        <div className="w-full h-8 px-5 flex items-center gap-2">
          <Link href={`/cadences/${cadence?.id}`}>
            <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
              <span
                className="p-1.5 cursor-pointer font-semibold"
                // onClick={() => router.push(`/cadences/${cadence?.id}`)}
              >
                Overview
              </span>
              <span className="w-full border-b-2 border-black"></span>
            </span>
          </Link>
          <Link href={`/cadences/${cadence?.id}/contacts`}>
            <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
              <span
                className="p-1.5 cursor-pointer"
                // onClick={() => router.push(`/cadences/${cadence?.id}/contacts`)}
              >
                Contacts
              </span>
              <span className="w-full border-b-2"></span>
            </span>
          </Link>
          <Link href={`/cadences/${cadence?.id}/emails`}>
            <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
              <span
                className="p-1.5 cursor-pointer"
                // onClick={() => router.push(`/cadences/${cadence?.id}/emails`)}
              >
                Emails
              </span>
              <span className="w-full border-b-2"></span>
            </span>
          </Link>
          <Link href={`/cadences/${cadence?.id}/settings`}>
            <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
              <span
                className="p-1.5 cursor-pointer"
                // onClick={() => router.push(`/cadences/${cadence?.id}/settings`)}
              >
                Settings
              </span>
              <span className="w-full border-b-2"></span>
            </span>
          </Link>
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
                <span>{cadence?.activeCount}</span>
                <span className="text-nowrap">Active</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>{cadence?.pausedCount}</span>
                <span className="text-nowrap">Paused</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>{cadence?.finishedCount}</span>
                <span className="text-nowrap">Finished</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>{cadence?.bouncedCount}</span>
                <span className="text-nowrap">Bounced</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>{cadence?.notSentCount}</span>
                <span className="text-nowrap">Not sent</span>
              </div>
            </div>
            <div className="flex items-center font-semibold">
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>{cadence?.scheduledCount}</span>
                <span className="text-nowrap">Scheduled</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>{cadence?.deliveredCount}</span>
                <span className="text-nowrap">Delivered</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>{cadence?.replyCount}</span>
                <span className="text-nowrap">Reply</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>{cadence?.interestedCount}</span>
                <span className="text-nowrap">Interested</span>
              </div>
              <div className="flex flex-col w-min-15 px-2 text-xs">
                <span>{cadence?.optOutCount}</span>
                <span className="text-nowrap">Opt out</span>
              </div>
            </div>
          </div>
          <div className="w-full p-4 flex flex-col gap-4">
            {cadenceSteps?.map((cadenceStep: CadenceStepModel) => (
              <CadenceStep cadenceStep={cadenceStep} />
            ))}
            <AddStep />
            <div className="h-4 w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
