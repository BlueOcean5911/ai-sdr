"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

import { alertIcons } from "@/data/alert.data";
import { handleError, runService } from "@/utils/service_utils";
import { AlertModel, getAlerts } from "@/services/alertService";

export default function Page() {
  const [alerts, setAlerts] = useState<AlertModel[]>([]);

  const fetchAlerts = () => {
    runService(
      undefined,
      getAlerts,
      (data) => {
        console.log("alerts: ", data);
        setAlerts(data);
      },
      (status, error) => {
        handleError(status, error);
        console.log(status, error);
      }
    );
  };

  useEffect(() => {
    fetchAlerts();
  }, []);
  return (
    <>
      <div className="flex flex-1 flex-col rounded-md border">
        {alerts.length > 0 ? (
          alerts.map((alert, idx) => (
            <div
              key={idx}
              className="w-full p-4 flex flex-row items-center gap-4 border-b hover:bg-gray-200"
            >
              <div className="w-16">
                {alert.type && alert.type in alertIcons && (
                  <div className="flex-center w-10 h-10">
                    <div className="w-8 h-8 flex-center">
                      {alertIcons[alert.type]}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-row justify-between gap-2 items-center">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{alert.title}</span>
                  <span className="text-sm">{alert.content}</span>
                </div>
                <div className="w-20 flex flex-col justify-center items-center gap-1">
                  <span className="text-xs text-nowrap">
                    {alert.createdAt.split("T")[0]}
                  </span>
                </div>
              </div>
              <Menu>
                <MenuButton className="p-1 border rounded-md bg-white hover:border-blue-500">
                  <EllipsisHorizontalIcon className="w-5 h-5 stroke-gray-500" />
                </MenuButton>
                <MenuItems
                  anchor="bottom end"
                  className="flex flex-col w-16 origin-top-right bg-white rounded-md shadow-md border border-white/5 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
                >
                  <MenuItem>
                    <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                      Delete
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          ))
        ) : (
          <div className="flex flex-1 flex-col justify-center items-center text-center gap-2">
            <Image
              src={"/assets/images/nodata.svg"}
              alt={"nodata"}
              width={120}
              height={120}
            />
            <span>No new alerts</span>
            <span className="w-1/2 text-xs">You'll see new alerts hear.</span>
          </div>
        )}
      </div>
    </>
  );
}
