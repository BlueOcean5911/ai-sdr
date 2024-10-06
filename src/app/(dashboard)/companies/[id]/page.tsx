"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowTrendingUpIcon,
  CheckBadgeIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  NoSymbolIcon,
  PhoneIcon,
  PlusCircleIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import ToggleButton from "@/components/extends/Button/ToggleButton";
import { useRouter } from "next/navigation";
import { handleError, runService } from "@/utils/service_utils";
import { getTemplate } from "@/services/templatesService";
import { FaLinkedinIn } from "react-icons/fa";
import { LinkedinIcon, MessageCircleWarning } from "lucide-react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { CompanyModel, getCompanyById } from "@/services/companyService";
import { IoIosLink } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [starred, setStarred] = useState(false);
  const [active, setActive] = useState(false);
  const [company, setCompany] = useState<CompanyModel>();
  const router = useRouter();

  useEffect(() => {
    runService(
      { id: id },
      getCompanyById,
      (data) => {
        setCompany(data);
      },
      (error) => console.log(error)
    );
  }, []);

  return (
    <>
      <div className="w-full flex flex-1 flex-col overflow-auto">
        <div className="px-5 py-2 flex items-center">
          <button
            className="p-1 text-sm rounded-md hover:bg-gray-100"
            onClick={() => router.push("/companies")}
          >
            Companies
          </button>
          <ChevronRightIcon className="w-3 h-3" />
          <button className="p-1 text-sm rounded-md hover:bg-gray-100">
            {company?.name}
          </button>
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
        <div className="px-5 flex flex-row justify-between gap-2">
          <div className="flex flex-row items-center gap-6 text-sm">
            {company?.industry} * {company?.city} {company?.state} *{" "}
            {company?.size} employees * {company?.annualRevenue}
          </div>
          <div className="flex flex-row justify-end gap-2">
            <button className="m-auto p-1 flex justify-center items-center gap-2 text-sm text-nowrap border rounded-md border-gray-300 hover:bg-gray-200">
              Add to list
            </button>
            <button className="m-auto p-1 flex justify-center items-center gap-2 text-sm text-nowrap border rounded-md text-white bg-blue-500 hover:bg-blue-400">
              Actions
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-1 flex-col gap-3 bg-gray-100 overflow-scroll">
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
                <span className="p-1 rounded-md bg-gray-200">
                  {company?.stage}
                </span>
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
}
