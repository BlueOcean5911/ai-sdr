import React from "react";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MoveDiagonal } from "lucide-react";
import { classNames } from "@/utils";

interface OverviewLayoutProps {
  show: boolean;
  handleClose: () => void;
  linkHref: string;
  children: React.ReactNode;
  width?: string;
}

const OverviewLayout: React.FC<OverviewLayoutProps> = ({
  show,
  handleClose,
  linkHref,
  children,
  width = "w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-2/3",
}) => {
  return (
    <div
      className={classNames(
        "absolute top-0 right-0 bottom-0 z-20 flex flex-col border-l bg-white overflow-hidden transition-all duration-500",
        width,
        show ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="px-3 py-2 flex items-center gap-2 border-b">
        <button
          className="p-1 flex justify-center items-center rounded-md hover:bg-gray-200"
          onClick={handleClose}
        >
          <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <Link
          href={linkHref}
          className="p-1 flex justify-center items-center rounded-md cursor-pointer hover:bg-gray-200"
        >
          <MoveDiagonal className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>
      </div>
      <div className="flex flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default OverviewLayout;
