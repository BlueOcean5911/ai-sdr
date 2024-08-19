import { Button } from "@headlessui/react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { AcademicCapIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

export default function ToolCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <div className="min-w-48 card">
        <AcademicCapIcon className="w-12 h-12 m-2" />
        <h3>{title}</h3>
        <div className="line-clamp-2 overflow-hidden text-gray-150 my-4">
          {description}
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="py-2 px-4 rounded-full shadow-md flex-center gap-2 cursor-pointer hover:shadow-lg">
            <span>Connect</span>
            <CloudArrowUpIcon className="w-4 h-4" />
          </div>
          <div className="flex-center gap-2 cursor-pointer hover:underline">
            <span>Integration details </span>
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </>
  );
}
