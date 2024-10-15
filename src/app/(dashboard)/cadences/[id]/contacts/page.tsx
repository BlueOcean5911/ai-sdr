"use client";

import { Suspense, useEffect, useState } from "react";
import { ChevronRightIcon, StarIcon } from "@heroicons/react/24/outline";
import ToggleButton from "@/components/extends/Button/ToggleButton";
import { useRouter } from "next/navigation";
import { ContactSelectionProvider } from "@/contexts/ContactSelectionContext";
import { ContactFilterProvider } from "@/contexts/FilterContactContext";
import { handleError, runService } from "@/utils/service_utils";
import {
  BaseCadenceModel,
  FetchCadenceModel,
  getCadenceById,
  updateCadence,
} from "@/services/cadenceService";
import Link from "next/link";
import CadenceContacts from "@/views/cadenceContacts";
import { ROUTE_LEADS } from "@/data/routes";

export default function Page({ params }: { params: { id: string } }) {
  const { id: cadenceId } = params;
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
      cadenceId,
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
            <Link href={ROUTE_LEADS}>
              <div className="btn-primary">Add contacts</div>
            </Link>
          </div>
        </div>
        <div className="w-full h-8 px-5 flex items-center gap-2">
          <Link href={`/cadences/${cadence?.id}`}>
            <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
              <span className="p-1.5 cursor-pointer font-semibold">
                Overview
              </span>
              <span className="w-full border-b-2"></span>
            </span>
          </Link>
          <Link href={`/cadences/${cadence?.id}/contacts`}>
            <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
              <span className="p-1.5 cursor-pointer font-semibold">
                Contacts
              </span>
              <span className="w-full border-b-2 border-black"></span>
            </span>
          </Link>
          <Link href={`/cadences/${cadence?.id}/emails`}>
            <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
              <span className="p-1.5 cursor-pointer">Emails</span>
              <span className="w-full border-b-2"></span>
            </span>
          </Link>
        </div>
        <div className="relative flex flex-1 bg-gray-100 overflow-auto">
          <div className="overflow-auto flex-1 flex flex-col">
            <ContactFilterProvider>
              <ContactSelectionProvider>
                <Suspense>
                  <CadenceContacts cadenceId={cadenceId} />
                </Suspense>
              </ContactSelectionProvider>
            </ContactFilterProvider>
          </div>
        </div>
      </div>
    </>
  );
}
