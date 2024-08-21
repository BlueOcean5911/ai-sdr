"use client";

import Link from "next/link";
import { useState } from "react";

import NavTitle from "@/components/Nav/Title";
import { ROUTE_CAMPAIGNS, ROUTE_CATENCES } from "@/data/routes";
import Cadences from "@/views/cadences";
import ComingSoon from "@/components/coming-soon";

const defaultCampaign = {
  id: "M909",
  name: "New Campaign",
  creator: "John Doe",
  createdDate: "2024/08/12",
  status: "Active",
  schema: "",
};

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const [campaign, setCampaign] = useState(defaultCampaign);

  return (
    <>
      <NavTitle>
        <Link className="hover:underline" href={ROUTE_CAMPAIGNS}>
          Campaigns
        </Link>
        &nbsp;/&nbsp;
        {campaign.name}
      </NavTitle>
      <div className="relative py-10 px-8 flex-1 bg-gray-100 overflow-auto">
        <div className="min-h-full overflow-auto flex flex-col bg-gray-100">
          <div className="flex justify-between focus:outline-none focus:border-none">
            <input
              className="block flex-1 text-center text-2xl border-none outline-none bg-transparent focus:ring-0 focus:border-0 focus:outline-0"
              value={campaign.name}
              onChange={(e) =>
                setCampaign({ ...campaign, name: e.target.value })
              }
            />
            <div className="btn-group flex gap-4 p-2">
              <div className="btn-primary p-2 px-4">Save</div>
              <div className="btn-primary p-2 px-4">Publish</div>
            </div>
          </div>
          <div className="flex-1 flex-center">
            <ComingSoon />
          </div>
          {/* Add title and description */}
          {/* Add personas */}
          {/* Add cadences */}
        </div>
      </div>
    </>
  );
}
