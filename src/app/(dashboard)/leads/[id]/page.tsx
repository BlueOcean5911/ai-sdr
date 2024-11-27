"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { runService } from "@/utils/service_utils";
import {
  LeadModelWithCompanyModel,
  getLeadById,
  // updateLead,
} from "@/services/leadService";
import LeadView from "@/sections/leads/LeadView";

const EmailSendWindow = dynamic(() => import("@/sections/email/EmailSendWindow"), {
  ssr: false,
});

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [lead, setLead] = useState<LeadModelWithCompanyModel>();
  const [isOpenSendEmail, setIsOpenSendEmail] = useState(
    Object.fromEntries(useSearchParams())?.sendEmail ? true : false
  );
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
  }, [id]);

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
