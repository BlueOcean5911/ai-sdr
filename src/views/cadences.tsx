"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

import Pagination from "@/components/extends/Pagination/Pagination";
import { useCadenceFilter } from "@/contexts/FilterCadenceContext";
import FilterCadence from "@/components/Filter/filterCadence";
import CadenceToolbar from "@/sections/cadences/CadenceToolbar";
import CheckBox from "@/components/extends/CheckBox";
import ToggleButton from "@/components/extends/Button/ToggleButton";
import CadenceItem from "@/sections/cadences/CadenceItem";

const defaultCampaigns = [
  {
    id: "M909-1",
    name: "Cadence 1",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-2",
    name: "Cadence 2",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-3",
    name: "Cadence 3",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-4",
    name: "Cadence 4",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-5",
    name: "Cadence 5",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-6",
    name: "Cadence 6",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-7",
    name: "Cadence 7",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-8",
    name: "Cadence 8",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-9",
    name: "Cadence 9",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-10",
    name: "Cadence 10",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-11",
    name: "Cadence 11",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-12",
    name: "Cadence 12",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-13",
    name: "Cadence 13",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-14",
    name: "Cadence 14",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-15",
    name: "Cadence 15",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-16",
    name: "Cadence 16",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-17",
    name: "Cadence 17",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
  {
    id: "M909-18",
    name: "Cadence 18",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: 0,
  },
];

export default function Cadences() {
  const { cadenceFilterConfig, setCadenceFilterConfig } = useCadenceFilter();
  const [cadences, setCadences] = useState(defaultCampaigns);
  const router = useRouter();

  const buildCadence = () => {
    //  TODO: Create a new cadence with API and retrieve the new cadence ID
    const newCadenceId = "M909";
    router.push(`/cadences/${newCadenceId}`);
  };

  const handleStatusChange = (id: string, status: number) => {
    setCadences(
      cadences.map((cadence) => {
        if (cadence.id === id) {
          // Return a new object with the updated status
          return { ...cadence, status };
        }
        return cadence; // Return the unchanged cadence
      })
    );
  };

  const handleDeleteCadence = (id: string) => {
    // TODO: Delete the cadence
    setCadences(cadences.filter((cadence) => cadence.id !== id));
  };

  const handlePageChange = (pageSize: number, currentPage: number) => {
    // TODO: Implement pagination logic
  };

  return (
    <div className="flex gap-2 flex-1 overflow-auto">
      {cadenceFilterConfig.isOpen && <FilterCadence />}
      <div className="card flex-1 flex flex-col overflow-auto">
        <div className="px-6 overflow-auto">
          <CadenceToolbar />
        </div>

        {/* Table */}
        <div className="flex flex-1 flex-col w-full py-2 align-middle sm:px-4 lg:px-6 overflow-auto">
          <div className="w-full h-full border rounded-md overflow-auto">
            <CadenceItem />
            <CadenceItem />
            <CadenceItem />
            <CadenceItem />
            <CadenceItem />
            <CadenceItem />
            <CadenceItem />
            <CadenceItem />
            <CadenceItem />
            <CadenceItem />
            <CadenceItem />
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-end">
          <Pagination
            className="pagination-bar"
            totalCount={cadences.length}
            onPageChange={(pageSize: number, currentPage: number) =>
              handlePageChange(pageSize, currentPage)
            }
          />
        </div>
      </div>
    </div>
  );
}
