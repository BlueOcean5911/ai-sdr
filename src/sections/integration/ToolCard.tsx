import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function ToolCard({
  icon,
  title,
  description,
  buttonName,
  onClick: handleClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonName: string;
  onClick: () => void;
}) {
  return (
    <div className="min-w-48 card flex flex-col">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex-1 line-clamp-2 overflow-hidden text-gray-500 my-4">
        {description}
      </div>
      <div className="flex justify-between items-center gap-4">
        <div
          className="py-2 px-4 rounded-full shadow-md flex-center gap-2 cursor-pointer hover:shadow-lg"
          onClick={handleClick}
        >
          <span>{buttonName}</span>
          <CloudArrowUpIcon className="w-4 h-4" />
        </div>
        <div className="flex-center gap-2 cursor-pointer hover:underline">
          <span>Integration details</span>
          <ArrowRightIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
