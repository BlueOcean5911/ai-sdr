"use client";
import Pagination from "@/components/extends/Pagination/Pagination";
import { useEmailFilter } from "@/contexts/FilterEmailContext";
import FilterEmail from "@/components/Filter/filterEmail";
import EmailToolbar from "@/sections/emails/EmailToolbar";
import EmailItem from "@/sections/emails/EmailItem";
import { handleError, runService } from "@/utils/service_utils";
import { getMailings, MailingModel } from "@/services/mailingService";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Emails(
  { campaignId, cadenceId }: { campaignId?: string; cadenceId?: string } = {
    cadenceId: "",
    campaignId: "",
  }
) {
  const { emailFilterConfig, setEmailFilterConfig } = useEmailFilter();
  const [mailings, setMailings] = useState<MailingModel[]>([]);
  const currentParams = Object.fromEntries(useSearchParams());

  const fetchMailings = (params: { [key: string]: string }) => {
    runService(
      {
        offset: 0,
        limit: 100,
        campaignId: campaignId,
        cadenceId: cadenceId,
        fromUser: emailFilterConfig.fromUser,
        search: emailFilterConfig.search,
        params,
      },
      getMailings,
      (data) => {
        setMailings(data);
      },
      (status, error) => {
        handleError(status, error);
        console.log(status, error);
      }
    );
  };

  useEffect(() => {
    fetchMailings(currentParams);
  }, []);

  useEffect(() => {
    fetchMailings(emailFilterConfig.params);
  }, [emailFilterConfig]);

  return (
    <div className="flex gap-2 flex-1 overflow-auto">
      {emailFilterConfig.isOpen && <FilterEmail />}
      <div className="card flex-1 flex flex-col overflow-auto">
        <div className="px-6 overflow-auto">
          <EmailToolbar />
        </div>

        {/* Table */}
        <div className="flex flex-1 flex-col w-full py-2 align-middle sm:px-4 lg:px-6 overflow-auto">
          <div className="w-full h-full border rounded-md overflow-auto">
            {mailings.length > 0 ? (
              mailings.map((mailing: MailingModel) => (
                <EmailItem key={mailing.id} mailing={mailing} />
              ))
            ) : (
              <p>No mailings</p>
            )}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-end">
          <Pagination
            className="pagination-bar"
            totalCount={0}
            onPageChange={
              (pageSize: number, currentPage: number) =>
                console.log(pageSize, currentPage)
              // handlePageChange(pageSize, currentPage)
            }
          />
        </div>
      </div>
    </div>
  );
}
