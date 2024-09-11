"use client";

import { Suspense, useEffect, useState } from "react";
import {
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ToggleButton from "@/components/extends/Button/ToggleButton";
import { useRouter } from "next/navigation";
import { ContactSelectionProvider } from "@/contexts/ContactSelectionContext";
import { ContactFilterProvider } from "@/contexts/FilterContactContext";
import Contacts from "@/views/contacts";
import { handleError, runService } from "@/utils/service_utils";
import {
  BaseCadenceModel,
  FetchCadenceModel,
  getCadenceById,
  updateCadence,
} from "@/services/cadenceService";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [starred, setStarred] = useState(false);
  const [active, setActive] = useState(false);
  const [cadence, setCadence] = useState<FetchCadenceModel>();
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

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    setStarred(cadence?.star ? true : false);
    setActive(cadence?.isActive ? true : false);
  }, [cadence]);

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
            {cadence?.name}
          </button>
          <ChevronRightIcon className="w-3 h-3" />
          <button className="p-1 text-sm rounded-md hover:bg-gray-100">
            Contacts
          </button>
        </div>
        <div className="w-full h-12 px-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ToggleButton
              checked={active}
              handleChange={() => handleUpdateActive}
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
            <button className="px-2 py-1 rounded-md text-white bg-blue-900">
              Add Contracts
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
              <span className="w-full border-b-2"></span>
            </span>
          </Link>
          <Link href={`/cadences/${cadence?.id}/contacts`}>
            <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
              <span
                className="p-1.5 cursor-pointer font-semibold"
                // onClick={() => router.push(`/cadences/${cadence?.id}/contacts`)}
              >
                Contacts
              </span>
              <span className="w-full border-b-2 border-black"></span>
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
        <div className="relative p-2 flex flex-1 bg-gray-100 overflow-auto">
          <div className="overflow-auto flex-1 flex flex-col">
            <ContactFilterProvider>
              <ContactSelectionProvider>
                <Suspense>
                  {/* <Contacts cadenceId={cadence?.id} /> */}
                </Suspense>
              </ContactSelectionProvider>
            </ContactFilterProvider>
          </div>
        </div>
      </div>
    </>
  );
}
