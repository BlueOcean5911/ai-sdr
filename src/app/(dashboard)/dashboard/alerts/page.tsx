"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

import { alertIcons } from "@/data/alert.data";
import { handleError, runService } from "@/utils/service_utils";
import { AlertModel, deleteAlert, getAlerts } from "@/services/alertService";
import { getRelativeTime } from "@/utils/format";
import Loading from "@/components/Loading";

export default function Page() {
  const [alerts, setAlerts] = useState<AlertModel[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAlerts = () => {
    setLoading(true);
    runService(
      undefined,
      getAlerts,
      (data) => {
        console.log("alerts: ", data);
        setAlerts(data);
        setLoading(false);
      },
      (status, error) => {
        handleError(status, error);
        console.log(status, error);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleDelete = (id: string) => {
    runService(
      id,
      deleteAlert,
      (data) => {
        if (data.success) {
          toast.success("Delete alert successfully!");
          setAlerts(alerts.filter((item) => item.id !== id));
        }
      },
      (status, error) => {
        handleError(status, error);
        console.log(status, error);
        toast.error("Something went wrong!");
      }
    );
  };
  return (
    <>
      <div className="flex flex-1 flex-col rounded-md border">
        {loading ? (
          <Loading />
        ) : alerts.length > 0 ? (
          alerts.map((alert, idx) => (
            <div
              key={idx}
              className="w-full p-4 flex flex-row items-center gap-4 border-b even:bg-blue-50 hover:bg-gray-200"
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
              <Link
                href={alert.href}
                className="flex flex-1 flex-row justify-between gap-2 items-center cursor-pointer"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{alert.title}</span>
                  <span className="text-sm">
                    {alert.dmler.firstName} {alert.dmler.lastName}{" "}
                    {alert.content} {alert.receptient.firstName}{" "}
                    {alert.receptient.lastName}
                  </span>
                </div>
                <div className="w-20 flex flex-col justify-center items-center gap-1">
                  <span className="text-xs text-nowrap">
                    {getRelativeTime(alert.createdAt)}
                  </span>
                </div>
              </Link>
              <Menu>
                <MenuButton className="p-1 border rounded-md bg-white hover:border-blue-500">
                  <EllipsisHorizontalIcon className="w-5 h-5 stroke-gray-500" />
                </MenuButton>
                <MenuItems
                  anchor="bottom end"
                  className="flex flex-col w-16 origin-top-right bg-white rounded-md shadow-md border border-white/5 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
                >
                  <MenuItem>
                    <button
                      className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                      onClick={() => handleDelete(alert.id)}
                    >
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
