"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { ChevronRightIcon, StarIcon } from "@heroicons/react/24/outline";
import ToggleButton from "@/components/extends/Button/ToggleButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BaseCadenceModel,
  FetchCadenceModel,
  getCadenceById,
  updateCadence,
} from "@/services/cadenceService";
import { getUsers, UserModel } from "@/services/userService";
import { handleError, runService } from "@/utils/service_utils";
import Select from "@/components/extends/Select/default";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [starred, setStarred] = useState(false);
  const [active, setActive] = useState(false);
  const [cadence, setCadence] = useState<FetchCadenceModel>();
  const [userOptions, setUserOptions] = useState<any[]>([]);
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

  const fetchUsers = () => {
    runService(
      undefined,
      getUsers,
      (users: any[]) => {
        const tempUserOptions = users.map((user) => {
          return {
            name: user.firstName + " " + user.lastName,
            value: user.id,
          };
        });
        setUserOptions(tempUserOptions);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  // const userOptions = useMemo(() => {
  //   let options = users
  //     ? users.map((user) => {
  //         return {
  //           name: user.firstName + " " + user.lastName,
  //           value: user.id,
  //         };
  //       })
  //     : [];
  //   return options;
  // }, [users]);

  const handleSaveCadence = () => {
    handleUpdateCadence({
      name: cadence?.name,
      ownerId: cadence?.ownerId,
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
            Settings
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
        </div>
        <div className="w-full h-8 px-5 flex items-center gap-2">
          <Link href={`/cadences/${cadence?.id}`}>
            <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
              <span
                className="p-1.5 cursor-pointer"
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
          {/* <Link href={`/cadences/${cadence?.id}/settings`}>
            <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
              <span
                className="p-1.5 cursor-pointer font-semibold"
                // onClick={() => router.push(`/cadences/${cadence?.id}/settings`)}
              >
                Settings
              </span>
              <span className="w-full border-b-2 border-black"></span>
            </span>
          </Link> */}
        </div>
        <div className="p-4 flex flex-1 bg-gray-100 overflow-auto text-sm">
          <div className="card flex flex-1 justify-center items-center bg-white">
            <div className="p-8 max-w-lg w-full flex flex-col gap-5 rounded-md bg-gray-100">
              <div className="flex items-center">
                <label className="min-w-24" htmlFor="name">
                  Name:
                </label>
                <input
                  id="name"
                  type="text"
                  className="input-primary"
                  value={cadence?.name}
                  onChange={(e) => {
                    setCadence((prev) => ({
                      ...prev,
                      name: e.target?.value ? e.target?.value : "",
                    }));
                  }}
                />
              </div>
              <div className="flex items-center">
                <label className="min-w-24" htmlFor="owner">
                  Owner:
                </label>
                <Select
                  data={userOptions}
                  defaultValue={
                    userOptions.filter(
                      (user) => user.value === cadence?.ownerId
                    )[0]
                  }
                ></Select>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="w-full p-2 rounded-md text-white bg-blue-500 hover:bg-blue-400"
                  onClick={() => handleSaveCadence()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
