import { useEffect, useState } from "react";
import {
  ListBulletIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { useAlert } from "@/contexts/AlertContext";

export default function AlertFilter() {
  const { alertFilterConfig, setAlertFilterConfig } = useAlert();

  return (
    <div className="card pt-6 px-2 w-64 h-full flex flex-col rounded-xl bg-white">
      <h3 className="p-2 border-b border-gray-100">Search</h3>
      <div className="flex-1 flex flex-col gap-2 p-2 border rounded overflow-auto">
        <form action="#" method="GET" className="flex px-3 pt-2 items-center">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none h-5 w-5 text-gray-400"
          />
          <input
            id="search-field"
            name="search"
            type="search"
            placeholder="Search..."
            value={alertFilterConfig.search}
            onChange={(e) => {
              setAlertFilterConfig({
                ...alertFilterConfig,
                search: e.target.value,
              });
            }}
            className="flex w-full border-0 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
          />
        </form>
      </div>
    </div>
  );
}
