import { classNames } from "@/utils";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
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
      <div className="border-2 border-gray-100 rounded-md">
        <div
          className="flex items-center px-4 py-2 bg-gray-50"
          onClick={() => setOpen(!open)}
        >
          {icon}
          <span className="ml-2 text-sm font-medium text-gray-900 flex-1">
            {title}
          </span>
          {/* collapse button */}
          <ChevronUpIcon
            className={classNames(
              open ? "transform rotate-180" : "",
              "w-4 h-4 transition-transform duration-200"
            )}
            onClick={() => setOpen(false)}
          />
        </div>

        {open && (
          <div className="px-4 py-2 bg-gray-50 border-t-2 border-gray-100">
            <div className="space-y-2">{children}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterItem;
