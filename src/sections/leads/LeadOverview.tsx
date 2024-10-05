import { LeadModelWithCompanyModel } from "@/services/leadService";
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
import { LinkedinIcon, MessageCircleWarning, MoveDiagonal } from "lucide-react";
import Link from "next/link";
import { FaInfo, FaLinkedinIn } from "react-icons/fa";

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
        <div className="px-5 flex flex-row items-center gap-3">
          <span className="text-lg font-semibold">
            {lead?.firstName} {lead?.lastName}
          </span>
          <a href={lead?.linkedin}>
            <FaLinkedinIn className="w-6 h-6 p-1 rounded-md border" />
          </a>
        </div>
        <div className="px-5 py-2 text-sm">
          {lead?.title} at {lead?.company?.name} * {lead?.location}
        </div>
        <div className="p-4 flex flex-1 flex-col lg:flex-row gap-3 bg-gray-100 overflow-scroll transition-all duration-500">
          <div className="lg:w-1/2 xl:w-1/3 flex flex-col gap-3">
            <div className="w-full p-3 flex flex-col gap-3 rounded-md border bg-white">
              <div className="flex flex-row justify-between items-center">
                <span className="font-semibold">Contact information</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row justify-end items-center gap-2">
                  <div className="p-2 flex justify-center items-center rounded-full bg-gray-200">
                    <EnvelopeIcon className="w-3 h-3" />
                  </div>
                  <span className="text-sm">{lead?.email}</span>
                </div>
                {lead?.emailStatus === "verified" && (
                  <CheckBadgeIcon className="w-5 h-5 stroke-green-500" />
                )}
                {lead?.emailStatus === "questionable" && (
                  <QuestionMarkCircleIcon className="w-5 h-5 stroke-yellow-500" />
                )}
                {lead?.emailStatus === "invalid" && (
                  <MessageCircleWarning className="w-5 h-5 stroke-red-500" />
                )}
                {lead?.emailStatus === "noStatus" && (
                  <NoSymbolIcon className="w-5 h-5 stroke-gray-500" />
                )}
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row justify-end items-center gap-2">
                  <div className="p-2 flex justify-center items-center rounded-full bg-gray-200">
                    <PhoneIcon className="w-3 h-3" />
                  </div>
                  <span className="text-sm">{lead?.phone}</span>
                </div>
                {lead?.phoneStatus === "verified" && (
                  <CheckBadgeIcon className="w-5 h-5 stroke-green-500" />
                )}
                {lead?.phoneStatus === "questionable" && (
                  <QuestionMarkCircleIcon className="w-5 h-5 stroke-yellow-500" />
                )}
                {lead?.phoneStatus === "invalid" && (
                  <MessageCircleWarning className="w-5 h-5 stroke-red-500" />
                )}
                {lead?.phoneStatus === "noStatus" && (
                  <NoSymbolIcon className="w-5 h-5 stroke-gray-500" />
                )}
              </div>
            </div>
            <div className="w-full p-3 flex flex-col gap-3 rounded-md border bg-white">
              <div className="flex flex-row justify-between items-center">
                <span className="font-semibold">Personal Note1</span>
              </div>
              <div className="min-h-20 flex flex-row justify-between items-center">
                {lead?.personalNote1}
              </div>
            </div>
            <div className="w-full p-3 flex flex-col gap-3 rounded-md border bg-white">
              <div className="flex flex-row justify-between items-center">
                <span className="font-semibold">Personal Note2</span>
              </div>
              <div className="min-h-20 flex flex-row justify-between items-center">
                {lead?.personalNote2}
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 xl:w-2/3 flex flex-col gap-3">
            <div className="p-3 flex flex-col gap-3 rounded-md border bg-white">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-2">
                  <span className="font-semibold">{lead?.company?.name}</span>
                  <a href={lead?.company?.linkedin}>
                    <FaLinkedinIn className="w-6 h-6 p-1 rounded-md border" />
                  </a>
                </div>
              </div>
              <div className="flex flex-row items-center gap-6 text-sm">
                {lead?.company?.industry} * {lead?.company?.streetAddress} *{" "}
                {lead?.company?.size} employees
              </div>
              <div className="flex flex-row items-start gap-2">
                <div className="p-2 flex justify-start items-start rounded-full bg-gray-200">
                  <FaInfo className="w-3 h-3" />
                </div>
                <span className="text-sm">{lead?.company?.description}</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-2">
                  <div className="p-2 flex justify-center items-center rounded-full bg-gray-200">
                    <PhoneIcon className="w-3 h-3" />
                  </div>
                  <span className="text-sm">{lead?.company?.phone}</span>
                </div>
                {lead?.company?.phoneStatus === "verified" && (
                  <CheckBadgeIcon className="w-5 h-5 stroke-green-500" />
                )}
                {lead?.company?.phoneStatus === "questionable" && (
                  <QuestionMarkCircleIcon className="w-5 h-5 stroke-yellow-500" />
                )}
                {lead?.company?.phoneStatus === "invalid" && (
                  <MessageCircleWarning className="w-5 h-5 stroke-red-500" />
                )}
                {lead?.company?.phoneStatus === "noStatus" && (
                  <NoSymbolIcon className="w-5 h-5 stroke-gray-500" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadOverview;
