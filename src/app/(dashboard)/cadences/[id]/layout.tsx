"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { ChevronRightIcon, StarIcon } from "@heroicons/react/24/outline";

import { CadenceContextProvider, useCadence } from "@/contexts/CadenceContext";

import ToggleButton from "@/components/extends/Button/ToggleButton";
import TapItem from "@/components/extends/Tap/TapItem";

import { handleError, runService } from "@/utils/service_utils";
import {
  getCadenceById,
  updateCadence,
  UpdateCadenceModel,
} from "@/services/cadenceService";
import { LayoutGrid, MailIcon, SettingsIcon, User2 } from "lucide-react";

const CadenceLayout = ({ id }: { id: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { cadence, setCadence } = useCadence();

  const [starred, setStarred] = useState(false);
  const [active, setActive] = useState(false);

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

  useEffect(() => {
    fetchCadence();
  }, []);

  useEffect(() => {
    setStarred(cadence?.star ? true : false);
    setActive(cadence?.isActive ? true : false);
  }, [cadence]);

  const handleUpdateCadence = (updatedCadence: UpdateCadenceModel) => {
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

  // useEffect(() => {
  //   console.log(cadence);
  // }, [cadence]);

  return (
    <>
      <div className="w-full px-5 pt-2 flex items-center">
        <button
          className="p-1 text-sm rounded-md hover:bg-gray-100"
          onClick={() => router.push("/cadences")}
        >
          Cadences
        </button>
        <ChevronRightIcon className="w-3 h-3" />
        <Link href={`/cadences/${cadence?.id}`}>
          <button className="p-1 text-sm rounded-md hover:bg-gray-100">
            {cadence?.name}
          </button>
        </Link>

        {pathname === `/cadences/${cadence?.id}` && (
          <>
            <ChevronRightIcon className="w-3 h-3" />
            <button className="p-1 text-sm rounded-md hover:bg-gray-100">
              Overview
            </button>
          </>
        )}
        {pathname === `/cadences/${cadence?.id}/contacts` && (
          <>
            <ChevronRightIcon className="w-3 h-3" />
            <button className="p-1 text-sm rounded-md hover:bg-gray-100">
              Contacts
            </button>
          </>
        )}
        {pathname === `/cadences/${cadence?.id}/emails` && (
          <>
            <ChevronRightIcon className="w-3 h-3" />
            <button className="p-1 text-sm rounded-md hover:bg-gray-100">
              Emails
            </button>
          </>
        )}
        {pathname === `/cadences/${cadence?.id}/setting` && (
          <>
            <ChevronRightIcon className="w-3 h-3" />
            <button className="p-1 text-sm rounded-md hover:bg-gray-100">
              Setting
            </button>
          </>
        )}
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
      </div>
      <div className="w-full h-8 px-5 flex items-center gap-2">
        <TapItem
          key="overview"
          icon={<LayoutGrid className="w-4 h-4" />}
          content="Overview"
          link={`/cadences/${cadence?.id}`}
          active={pathname === `/cadences/${cadence?.id}`}
        />
        <TapItem
          key="contacts"
          icon={<User2 className="w-4 h-4" />}
          content="Contacts"
          link={`/cadences/${cadence?.id}/contacts`}
          active={pathname === `/cadences/${cadence?.id}/contacts`}
        />
        <TapItem
          key="emails"
          icon={<MailIcon className="w-4 h-4" />}
          content="Emails"
          link={`/cadences/${cadence?.id}/emails`}
          active={pathname === `/cadences/${cadence?.id}/emails`}
        />
        <TapItem
          key="setting"
          icon={<SettingsIcon className="w-4 h-4" />}
          content="Setting"
          link={`/cadences/${cadence?.id}/setting`}
          active={pathname === `/cadences/${cadence?.id}/setting`}
        />
      </div>
    </>
  );
};

const Layout = ({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) => {
  const { id } = params;

  return (
    <>
      <CadenceContextProvider>
        <CadenceLayout id={id} />
        {children}
        {}
      </CadenceContextProvider>
    </>
  );
};

export default Layout;
