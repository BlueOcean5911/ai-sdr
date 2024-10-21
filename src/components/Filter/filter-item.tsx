"use client";
import { classNames } from "@/utils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const FilterItem = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="border-0 border-blue-100  rounded-md py-0.5">
        <div
          className="flex items-center px-2 py-2 bg-blue-100"
          onClick={() => setOpen(!open)}
        >
          {icon}
          <span className="ml-2 text-sm font-medium text-gray-900 flex-1">
            {title}
          </span>
          {/* collapse button */}
          <ChevronDownIcon
            className={classNames(
              open ? "transform rotate-180" : "",
              "w-4 h-4 transition-transform duration-200"
            )}
            onClick={() => setOpen(false)}
          />
        </div>

        {open && (
          <div className="px-2 py-2 bg-gray-0 border-y-2 border-blue-100 border-x-2">
            <div className="space-y-2 text-sm">{children}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterItem;
