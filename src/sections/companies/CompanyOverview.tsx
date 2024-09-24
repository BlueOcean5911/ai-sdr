import { CompanyModel } from "@/services/companyService";
import { classNames } from "@/utils";
import {
  ArrowTrendingUpIcon,
  CheckBadgeIcon,
  EnvelopeIcon,
  NoSymbolIcon,
  PhoneIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MessageCircleWarning, MoveDiagonal } from "lucide-react";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";

const CompanyOverview = ({
  show,
  company,
  handleClose,
}: {
  show: boolean;
  company?: CompanyModel;
  handleClose: () => void;
}) => {
  return (
    <>
      <div
        className={classNames(
          "absolute top-0 bottom-0 z-20 w-1/2 flex flex-1 flex-col border-l bg-white overflow-scroll transition-all duration-500",
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
            href={`/companies/${company?.id}`}
            className="p-1 flex justify-center items-center rounded-md cursor-pointer hover:bg-gray-200"
          >
            <MoveDiagonal className="w-5 h-5" />
          </Link>
        </div>
        <div className="px-5 flex flex-row items-center gap-3">
          <span className="text-lg font-semibold">{company?.name}</span>
          <a href={company?.linkedin}>
            <FaLinkedinIn className="w-6 h-6 p-1 rounded-md border" />
          </a>
        </div>
        <div className="px-5 py-2 text-sm">
          {company?.industry} * {company?.location} * {company?.size} employees
        </div>
        <div className="p-4 flex flex-1 flex-col md:flex-row gap-3 bg-gray-100">
          <div className="flex flex-col gap-3">
            <div className="w-full p-3 flex flex-col gap-3 rounded-md border bg-white">
              <div className="flex flex-row justify-between items-center">
                <span className="font-semibold">Contact information</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row justify-end items-center gap-2">
                  <div className="p-2 flex justify-center items-center rounded-full bg-gray-200">
                    <PhoneIcon className="w-3 h-3" />
                  </div>
                  <span className="text-sm">{company?.phone}</span>
                </div>
                {company?.phoneStatus === "verified" && (
                  <CheckBadgeIcon className="w-5 h-5 stroke-green-500" />
                )}
                {company?.phoneStatus === "questionable" && (
                  <QuestionMarkCircleIcon className="w-5 h-5 stroke-yellow-500" />
                )}
                {company?.phoneStatus === "invalid" && (
                  <MessageCircleWarning className="w-5 h-5 stroke-red-500" />
                )}
                {company?.phoneStatus === "noStatus" && (
                  <NoSymbolIcon className="w-5 h-5 stroke-gray-500" />
                )}
              </div>
            </div>
            <div className="p-3 flex flex-col gap-3 rounded-md border bg-white">
              <div className="flex flex-row justify-between items-center">
                <span className="font-semibold">About</span>
              </div>
              <span className="text-sm">{company?.description}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyOverview;
