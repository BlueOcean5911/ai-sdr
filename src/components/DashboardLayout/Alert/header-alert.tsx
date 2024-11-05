import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellAlertIcon } from "@heroicons/react/24/outline";

import { handleError, runService } from "@/utils/service_utils";
import { AlertModel, getAlerts } from "@/services/alertService";
import { alertIcons } from "@/data/alert.data";

export default function HeaderAlert() {
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
      <Menu as="div" className="relative">
        <MenuButton className="-m-1.5 flex items-center p-1.5">
          <span className="sr-only">Open Alert</span>
          <BellAlertIcon className="h-6 w-6" aria-hidden="true" />
        </MenuButton>
        <MenuItems
          transition
          className="flex flex-col absolute right-0 z-50 mt-2.5 min-w-64 max-w-96 max-h-[600px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
            <h3>Alert</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {alerts.length > 0 ? (
              alerts.map((item, id) => (
                <MenuItem key={id}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm leading-6 border-b text-gray-900 data-[focus]:bg-blue-200"
                  >
                    <div className="flex items-center gap-4">
                      {item.type && item.type in alertIcons && (
                        <div className="flex-center w-10 h-10">
                          <div className="w-6 h-6 flex-center">
                            {alertIcons[item.type]}
                          </div>
                        </div>
                      )}
                      <div className="flex-1 overflow-hidden">
                        <p className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                          {item.title}
                        </p>
                        <p className="w-full text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                          {item.content} on {item.createdAt.split("T")[0]}
                        </p>
                      </div>
                    </div>
                  </Link>
                </MenuItem>
              ))
            ) : (
              <div className="p-6 flex flex-1 flex-col justify-center items-center text-center gap-2">
                <Image
                  src={"/assets/images/nodata.svg"}
                  alt={"nodata"}
                  width={120}
                  height={120}
                />
                <span>No new alerts</span>
                <span className="w-2/3 text-xs">
                  You'll see new alerts hear.
                </span>
              </div>
            )}
          </div>
        </MenuItems>
      </Menu>
    </>
  );
}
