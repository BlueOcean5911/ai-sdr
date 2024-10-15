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
import { useRouter, useSearchParams } from "next/navigation";
import { handleError, runService } from "@/utils/service_utils";
import {
  BaseLeadModel,
  LeadModel,
  LeadModelWithCompanyModel,
  getLeadById,
  // updateLead,
} from "@/services/leadService";
import { CompanyModel, getCompanyById } from "@/services/companyService";
import { getTemplate } from "@/services/templatesService";
import { FaLinkedinIn } from "react-icons/fa";
import { LinkedinIcon, MessageCircleWarning } from "lucide-react";
import { FaInfo } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";
import EmailSendWindow from "@/sections/email/EmailSendWindow";
import { getDefaultLead } from "@/services/leadService";
import LeadView from "@/sections/leads/LeadView";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [starred, setStarred] = useState(false);
  const [active, setActive] = useState(false);
  const [lead, setLead] = useState<LeadModelWithCompanyModel>();
  const [company, setCompany] = useState<CompanyModel>();
  const [isOpenSendEmail, setIsOpenSendEmail] = useState(
    Object.fromEntries(useSearchParams())?.sendEmail ? true : false
  );
  const searchParams = useSearchParams();
  // const []
  const router = useRouter();

  useEffect(() => {
    runService(
      { id: id },
      getLeadById,
      (data) => {
        console.log("123123132", data);
        setLead(data);
      },
      (error) => console.log(error)
    );
  }, [id]);

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
        <LeadView lead={lead} />
      </div>
      {isOpenSendEmail && lead && (
        <>
          <EmailSendWindow
            close={() => setIsOpenSendEmail(false)}
            lead={lead}
          />
        </>
      )}
    </>
  );
}
