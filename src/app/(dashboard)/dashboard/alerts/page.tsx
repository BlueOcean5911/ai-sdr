import Image from "next/image";
import { alertIcons } from "@/data/alert.data";
import { headerAlertList } from "@/data/alert.data";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <>
      <div className="flex flex-1 flex-col rounded-md border">
        {headerAlertList.length > 0 ? (
          headerAlertList.map((alert, idx) => (
            <div
              key={idx}
              className="w-full p-4 flex flex-row items-center gap-4 border-b hover:bg-gray-200"
            >
              <div className="w-16">
                {alert.id && alert.id in alertIcons && (
                  <div className="flex-center w-10 h-10">
                    <div className="w-6 h-6 flex-center">
                      {alertIcons[alert.id]}
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
                  <span className="text-xs text-nowrap">{alert.date}</span>
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
            <span>No new messages</span>
            <span className="w-1/2 text-xs">
              You'll see new email message here whenever they come in.
            </span>
          </div>
        )}
      </div>
    </>
  );
}
