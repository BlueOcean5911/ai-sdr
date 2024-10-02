"use client";

import Image from "next/image";
import { replyData } from "@/data/reply.data";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { getInitials } from "@/utils/format";
import { toast } from "react-toastify";

interface ReplyTypeColors {
  [key: string]: string;
}

const typeToColor: ReplyTypeColors = {
  willing_to_meet: "bg-green-500",
  follow_up_question: "bg-sky-500",
  referred_to_other_person: "bg-indigo-500",
  out_of_office: "bg-orange-500",
  not_the_right_person: "bg-red-500",
  not_interested: "bg-gray-500",
  unsubscribed: "bg-pink-500",
  uncategorized: "bg-slate-200",
};

const navs = [
  {
    color: "bg-green-500",
    content: "Willing to meet",
    count: 1,
  },
  {
    color: "bg-sky-500",
    content: "Follow-up question",
    count: 1,
  },
  {
    color: "bg-indigo-500",
    content: "Referred to other person",
    count: 1,
  },
  {
    color: "bg-orange-500",
    content: "Out of office",
    count: 1,
  },
  {
    color: "bg-red-500",
    content: "Not the right person",
    count: 0,
  },
  {
    color: "bg-gray-500",
    content: "Not interested",
    count: 0,
  },
  {
    color: "bg-pink-500",
    content: "Unsubscribed",
    count: 0,
  },
  {
    color: "bg-slate-200",
    content: "Uncategorized",
    count: 0,
  },
];

export default function Page() {
  return (
    <>
      <div className="flex flex-1 flex-row gap-2">
        <div className="w-80 px-4 py-6 flex flex-col gap-2 gap rounded-md border">
          <div className="flex flex-row items-center justify-between gap-2 text-sm hover:bg-gray-100 py-2 px-4 rounded-full hover:cursor-pointer">
            <span>All messages</span>
            <span className="text-xs">4</span>
          </div>
          <span className="text-sm">STATUS</span>
          <div className="flex flex-col">
            {navs.map((nav, idx) => (
              <div
                key={idx}
                className="flex flex-row items-center gap-2 text-sm hover:cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-full"
              >
                <span className={`w-2 h-2 rounded-full ${nav.color}`} />
                <span className="grow">{nav.content}</span>
                <span className="text-xs">{nav.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col rounded-md border">
          {replyData.length > 0 ? (
            replyData.map((reply, idx) => (
              <div
                key={idx}
                className="w-full p-4 flex flex-row items-center gap-4 border-b hover:bg-gray-200"
              >
                <div className="w-40 flex flex-col gap-1">
                  <span className="text-xs font-semibold">From:</span>
                  <span className="text-sm text-ellipsis overflow-hidden">
                    {reply.from}
                  </span>
                </div>
                <div className="flex flex-1 flex-row justify-between gap-2 items-center text-sm">
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <span className="font-semibold line-clamp-1">
                      {reply.subject}
                    </span>
                    <span className="text-xs line-clamp-1">
                      {reply.content}
                    </span>
                  </div>
                  <div className="w-20 flex flex-col justify-center items-center gap-1">
                    <div
                      className={`w-6 h-6 p-1 text-xs text-center rounded-full aspect-square ${
                        typeToColor[reply.type]
                      }`}
                    >
                      {getInitials(reply.type)}
                    </div>
                    <span className="text-xs text-nowrap">{reply.date}</span>
                  </div>
                </div>
                <Menu>
                  <MenuButton className="p-1 border rounded-md bg-white hover:border-blue-500">
                    <EllipsisHorizontalIcon className="w-5 h-5 stroke-gray-500" />
                  </MenuButton>
                  <MenuItems
                    anchor="bottom end"
                    className="flex flex-col w-40 origin-top-right bg-white rounded-md shadow-md border border-white/5 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
                  >
                    <MenuItem>
                      <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                        Send email to this thread
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                        onClick={() => {
                          toast.success("Successfully cadence finished!");
                        }}
                      >
                        Finish Cadence
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
      </div>
    </>
  );
}
