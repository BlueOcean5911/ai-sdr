"use client";

import Link from "next/link";
import { useState } from "react";

import NavTitle from "@/components/Nav/Title";
import { ROUTE_CATENCES } from "@/data/routes";
import Cadences from "@/views/cadences";
import ComingSoon from "@/components/coming-soon";
import ManageCadence from "@/sections/cadences/manage-cadence";

const defaultCadence = {
  id: "M909",
  name: "New Cadence",
  creator: "John Doe",
  createdDate: "2024/08/12",
  status: "Active",
  schema: "",
};

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const [cadence, setCadence] = useState(defaultCadence);

  return (
    <>
      <NavTitle>
        <Link className="hover:underline" href={ROUTE_CATENCES}>
          Cadences
        </Link>
        &nbsp;/&nbsp;
        {cadence.name}
      </NavTitle>
      <div className="relative py-10 px-8 flex-1 bg-gray-100 overflow-auto">
        <div className="min-h-full overflow-auto flex flex-col bg-gray-100">
          <div className="flex justify-between focus:outline-none focus:border-none">
            <input
              className="block flex-1 text-center text-2xl border-none outline-none bg-transparent focus:ring-0 focus:border-0 focus:outline-0"
              value={cadence.name}
              onChange={(e) => setCadence({ ...cadence, name: e.target.value })}
            />
          </div>
          <ManageCadence />
        </div>
      </div>
    </>
  );
}
