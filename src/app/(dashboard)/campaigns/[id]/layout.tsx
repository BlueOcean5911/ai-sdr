"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_CAMPAIGNS } from "@/data/routes";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ToggleButton from "@/components/extends/Button/ToggleButton";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon, StarIcon } from "lucide-react";
import { classNames } from "@/utils";

const defaultCampaign = {
  id: "M909",
  name: "New Campaign",
  creator: "John Doe",
  createdDate: "2024/08/12",
  status: "Active",
  schema: "",
};

const navList = [
  { title: "Overview", endpoint: "" },
  { title: "Cadences", endpoint: "cadences" },
  { title: "Leads", endpoint: "leads" },
  { title: "Emails", endpoint: "emails" },
  { title: "Tasks", endpoint: "tasks" },
  { title: "Calls", endpoint: "calls" },
  { title: "Meetings", endpoint: "meetings" },
  { title: "Setting", endpoint: "setting" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [starred, setStarred] = useState(false);
  const [campaign, setCampaign] = useState(defaultCampaign);
  const router = useRouter();
  const pathname = usePathname();

  const endpoint =
    pathname.split("/").length > 3 ? pathname.split("/").at(3) : "";

  return (
    <>
      <NavTitle>
        <Link className="hover:underline" href={ROUTE_CAMPAIGNS}>
          Campaigns
        </Link>
        &nbsp;/&nbsp;
        {campaign.name}
      </NavTitle>
      <div className="flex flex-1 flex-col overflow-auto">
        <div className="w-full px-5 pt-2 flex items-center">
          <button
            className="p-1 text-sm rounded-md hover:bg-gray-100"
            onClick={() => router.push("/campaigns")}
          >
            Campaigns
          </button>
          <ChevronRightIcon className="w-3 h-3" />
          <button className="p-1 text-sm rounded-md hover:bg-gray-100">
            Campaign Title
          </button>
        </div>
        <div className="w-full h-12 px-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ToggleButton />
            <span className="text-xl">Campaign Title</span>
            <div
              className="p-1 cursor-pointer rounded-md hover:bg-gray-100"
              onClick={() => setStarred(!starred)}
            >
              <StarIcon
                className={`w-5 h-5 ${
                  starred ? "fill-blue-900 stroke-blue-900" : "stroke-gray-500"
                }`}
              />
            </div>
          </div>
          <div className="flex items-center">
            <button className="px-2 py-1 rounded-md bg-gray-300">
              Add XXX
            </button>
          </div>
        </div>
        <div className="w-full h-8 px-5 flex items-center gap-2">
          {navList.map((nav, index) => (
            <span
              key={index}
              className="flex flex-col rounded-md text-sm hover:bg-gray-100"
            >
              <span
                className={classNames(
                  "p-1.5 cursor-pointer border-b-2",
                  endpoint === nav.endpoint ? "font-semibold border-black" : ""
                )}
                onClick={() =>
                  router.push(`/campaigns/campaign.id/${nav.endpoint}`)
                }
              >
                {nav.title}
              </span>
            </span>
          ))}
        </div>
        <div className="flex flex-1 flex-col bg-gray-100 overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
}
