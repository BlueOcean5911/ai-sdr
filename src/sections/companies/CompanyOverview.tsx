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
import { IoIosLink } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";

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
          <a href={company?.website}>
            <IoIosLink className="w-6 h-6 p-1 rounded-md border" />
          </a>
          <a href={company?.linkedin}>
            <FaLinkedinIn className="w-6 h-6 p-1 rounded-md border" />
          </a>
        </div>
        <div className="px-5 py-1 text-sm">
          {company?.industry} * {company?.city} {company?.state} *{" "}
          {company?.size} employees * {company?.annualRevenue}
        </div>
        <div className="p-4 flex flex-1 flex-col md:flex-row gap-3 bg-gray-100">
          <div className="flex flex-col gap-3">
            <div className="w-full p-3 flex flex-col gap-3 rounded-md border bg-white">
              <div className="flex flex-row justify-between items-center">
                <span className="font-semibold">Contact information</span>
              </div>
              <div className="flex flex-row items-center text-sm">
                <span className="w-1/3">Phone</span>
                <div className="w-2/3 flex flex-row items-center gap-2">
                  <span className="p-2 flex justify-center items-center rounded-full bg-gray-200">
                    <PhoneIcon className="w-3 h-3" />
                  </span>
                  <span className="flex-1">{company?.phone}</span>
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
              <div className="flex flex-row text-sm">
                <span className="w-1/3">Stage</span>
                <span className="p-1 rounded-md bg-gray-200">{company?.stage}</span>
              </div>
              <div className="flex flex-row text-sm">
                <span className="w-1/3">Location</span>
                <div className="w-2/3 flex flex-row items-center gap-2">
                  <span className="p-1 flex justify-center items-center rounded-full bg-gray-200">
                    <CiLocationOn className="w-5 h-5" />
                  </span>
                  {company?.streetAddress}, {company?.city}, {company?.state}
                  {", "}
                  {company?.country}, {company?.postalCode}
                </div>
              </div>
            </div>
            <div className="p-3 flex flex-col gap-3 rounded-md border bg-white">
              <div className="flex flex-row justify-between items-center">
                <span className="font-semibold">About</span>
              </div>
              <span className="text-sm">{company?.description}</span>
              <div className="flex flex-row text-sm">
                <span className="w-1/3">Keywords</span>
                <div className="w-2/3 space-x-2">
                  {company?.keywords?.split(",").map((item, idx) => (
                    <span
                      key={idx}
                      className="px-1 text-nowrap rounded-md bg-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <span className="w-1/3">Annual revenue</span>
                <span className="w-2/3">{company?.annualRevenue}</span>
              </div>
              <div className="flex flex-row text-sm">
                <span className="w-1/3">Founded</span>
                <span className="w-2/3">{company?.yearFounded}</span>
              </div>
              <div className="flex flex-row text-sm">
                <span className="w-1/3">Industry</span>
                <span className="w-2/3">{company?.industry}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyOverview;
