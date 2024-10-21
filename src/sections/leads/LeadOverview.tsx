import { LeadModelWithCompanyModel } from "@/services/leadService";
import { classNames } from "@/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MoveDiagonal } from "lucide-react";
import Link from "next/link";
import LeadView from "./LeadView";

const LeadOverview = ({
  show,
  lead,
  handleClose,
}: {
  show: boolean;
  lead?: LeadModelWithCompanyModel;
  handleClose: () => void;
}) => {
  return (
    <>
      <div
        className={classNames(
          "absolute top-0 bottom-0 z-20 w-2/3 flex flex-1 flex-col border-l bg-white overflow-scroll transition-all duration-500",
          show ? "right-0" : "-right-full"
        )}
      >
        <div className="px-5 py-2 flex items-center gap-2">
          <div
            className="p-1 flex justify-center items-center rounded-md hover:bg-gray-200"
            onClick={handleClose}
          >
            <XMarkIcon className="w-5 h-5" />
          </div>
          <Link
            href={`/leads/${lead?.id}`}
            className="p-1 flex justify-center items-center rounded-md cursor-pointer hover:bg-gray-200"
          >
            <MoveDiagonal className="w-5 h-5" />
          </Link>
        </div>
        <LeadView lead={lead} />
      </div>
    </>
  );
};

export default LeadOverview;
