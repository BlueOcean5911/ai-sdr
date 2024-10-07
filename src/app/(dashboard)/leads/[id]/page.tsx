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
import {
  BaseLeadModel,
  LeadModel,
  getLeadById,
  // updateLead,
} from "@/services/leadService";
import { CompanyModel, getCompanyById } from "@/services/companyService";
import { getTemplate } from "@/services/templatesService";
import { FaLinkedinIn } from "react-icons/fa";
import { LinkedinIcon, MessageCircleWarning } from "lucide-react";
import { FaInfo } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [starred, setStarred] = useState(false);
  const [active, setActive] = useState(false);
  const [lead, setLead] = useState<LeadModel>();
  const [company, setCompany] = useState<CompanyModel>();
  const router = useRouter();

  useEffect(() => {
    runService(
      { id: id },
      getLeadById,
      (data) => {
        setLead(data);
      },
      (error) => console.log(error)
    );
  }, []);

  useEffect(() => {
    lead?.companyId &&
      runService(
        { id: lead?.companyId },
        getCompanyById,
        (data) => {
          console.log(data);
          setCompany(data);
        },
        (error) => console.log(error)
      );
  }, [lead]);

  return (
    <>
      <div className="w-full flex flex-1 flex-col overflow-auto">
        <div className="px-5 py-2 flex items-center">
          <button
            className="p-1 text-sm rounded-md hover:bg-gray-100"
            onClick={() => router.push("/leads")}
          >
            Leads
          </button>
          <ChevronRightIcon className="w-3 h-3" />
          <button className="p-1 text-sm rounded-md hover:bg-gray-100">
            {lead?.firstName} {lead?.lastName}
          </button>
        </div>
        <div className="px-5 flex flex-row gap-3">
          <span className="text-lg font-semibold">
            {lead?.firstName} {lead?.lastName}
          </span>
          <FaLinkedinIn className="w-6 h-6 p-1 rounded-md border" />
        </div>
        <div className="px-5 flex flex-row justify-between gap-2">
          <div className="py-1 text-sm">
            {lead?.title} at {company?.name} * {lead?.city}, {lead?.state} *{" "}
            {lead?.annualRevenue}
          </div>
          <div className="flex flex-row justify-end gap-2">
            <button className="m-auto p-1 flex justify-center items-center gap-2 text-sm text-nowrap border rounded-md border-gray-300 hover:bg-gray-200">
              Add to list
            </button>
            <button className="m-auto p-1 flex justify-center items-center gap-2 text-sm text-nowrap border rounded-md text-white bg-blue-500 hover:bg-blue-400">
              Access email
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-1 flex-col md:flex-row gap-3 bg-gray-100 overflow-scroll">
          <div className="md:w-1/2 lg:w-1/3 flex flex-col gap-3">
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
                  <span className="text-sm">{lead?.primaryPhone}</span>
                </div>
                {lead?.primaryPhoneStatus === "verified" && (
                  <CheckBadgeIcon className="w-5 h-5 stroke-green-500" />
                )}
                {lead?.primaryPhoneStatus === "questionable" && (
                  <QuestionMarkCircleIcon className="w-5 h-5 stroke-yellow-500" />
                )}
                {lead?.primaryPhoneStatus === "invalid" && (
                  <MessageCircleWarning className="w-5 h-5 stroke-red-500" />
                )}
                {lead?.primaryPhoneStatus === "noStatus" && (
                  <NoSymbolIcon className="w-5 h-5 stroke-gray-500" />
                )}
              </div>
              <div className="flex flex-row text-sm">
                <span className="w-1/3">Location</span>
                <span className="w-2/3">
                  {lead?.city}, {lead?.state}, {lead?.country}
                </span>
              </div>
              <div className="flex flex-row text-sm">
                <span className="w-1/3">Annual revenue</span>
                <span className="w-2/3">{lead?.annualRevenue}</span>
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
          <div className="md:w-1/2 lg:w-2/3 flex flex-col gap-3">
            <div className="p-3 flex flex-col gap-3 rounded-md border bg-white">
              <div className="px-5 flex flex-row items-center gap-3">
                <span className="text-lg font-semibold">{company?.name}</span>
                <a href={company?.website}>
                  <IoIosLink className="w-6 h-6 p-1 rounded-md border" />
                </a>
                <a href={company?.linkedin}>
                  <FaLinkedinIn className="w-6 h-6 p-1 rounded-md border" />
                </a>
              </div>
              <div className="px-5 py-2 text-sm">
                {company?.industry} * {company?.city} * {company?.state} *{" "}
                {company?.size} employees
              </div>
              <div className="flex flex-row justify-start items-start gap-2">
                <div className="p-2 flex justify-start items-start rounded-full bg-gray-200">
                  <FaInfo className="w-3 h-3" />
                </div>
                <span className="text-sm">{company?.description}</span>
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
