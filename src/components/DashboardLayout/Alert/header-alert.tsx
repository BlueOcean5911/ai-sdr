import { useRouter } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellAlertIcon } from "@heroicons/react/24/outline";

import { useAlert } from "@/contexts/AlertContext";
import { alertIcons } from "@/data/alert.data";
import { getRelativeTime } from "@/utils/format";
import { Bell, Check } from "lucide-react";
import Link from "next/link";
import { ROUTE_ALERTS } from "@/data/routes";

export default function HeaderAlert() {
  const { unreadAlerts, handleMarkAsRead } = useAlert();

  const router = useRouter();

  return (
    <>
      <Menu as="div" className="relative">
        <MenuButton className="-m-1.5 flex items-center p-1.5">
          <span className="sr-only">Open Alert</span>
          <div className="relative">
            <BellAlertIcon className="h-6 w-6" aria-hidden="true" />
            {unreadAlerts.length > 0 && (
              <span className="absolute -top-1 1right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-medium text-white bg-red-600 rounded-full">
                {unreadAlerts.length}
              </span>
            )}
          </div>
        </MenuButton>
        <MenuItems
          transition
          className="flex flex-col absolute right-0 z-50 mt-2.5 min-w-96 max-w-96 max-h-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Alerts</h2>
            </div>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="flex-1 overflow-y-auto">
              {unreadAlerts.length > 0 ? (
                unreadAlerts.map((item, id) => (
                  <MenuItem key={id}>
                    <div
                      className="block px-3 py-2 text-sm leading-6 border-b text-gray-900 data-[focus]:bg-blue-50 data-[focus]:cursor-pointer"
                      onClick={() => {
                        handleMarkAsRead(item.id);
                        router.push(item.href);
                      }}
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
                            {item.dmler?.firstName} {item.dmler?.lastName} {""}
                            {item.content} {item.receptient?.firstName}{" "}
                            {item.receptient?.lastName}{" "}
                            {getRelativeTime(item.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </MenuItem>
                ))
              ) : (
                <>
                  <div className="px-6 py-12 flex flex-col items-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-fade-in">
                        <Check className="w-10 h-10 text-green-500" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                        <span className="text-xs font-medium text-white">
                          0
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No new alerts
                    </h3>
                    <p className="text-sm text-gray-500 text-center max-w-[200px]">
                      You'll see new alerts here when they arrive
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="px-8 py-4 bg-gray-50 flex justify-end gap-3 border-t">
              <Link
                href={ROUTE_ALERTS}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 rounded-lg"
              >
                View All
              </Link>
            </div>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
}
