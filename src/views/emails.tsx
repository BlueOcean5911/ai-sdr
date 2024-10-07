"use client";
import Pagination from "@/components/extends/Pagination/Pagination";
import { useEmailFilter } from "@/contexts/FilterEmailContext";
import FilterEmail from "@/components/Filter/filterEmail";
import EmailToolbar from "@/sections/emails/EmailToolbar";
import EmailItem from "@/sections/emails/EmailItem";
import { handleError, runService } from "@/utils/service_utils";
import {
  getMailings,
  getMailingTotalCount,
  MailingModel,
} from "@/services/mailingService";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Emails(
  { campaignId, cadenceId }: { campaignId?: string; cadenceId?: string } = {
    cadenceId: "",
    campaignId: "",
  }
) {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
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

  const fetchMailingTotalCount = (params: { [key: string]: string }) => {
    runService(
      {
        campaignId: campaignId,
        cadenceId: cadenceId,
        fromUser: emailFilterConfig.fromUser,
        search: emailFilterConfig.search,
        params,
      },
      getMailingTotalCount,
      (data) => {
        console.log("Mailing total", data);
        setTotalCount(data?.count ? data?.count : 0);
      },
      (status, error) => {
        handleError(status, error);
        console.log(status, error);
      }
    );
  };

  useEffect(() => {
    fetchMailingTotalCount(currentParams);
    fetchMailings(currentParams);
  }, []);

  useEffect(() => {
    fetchMailingTotalCount(emailFilterConfig.params);
    fetchMailings(emailFilterConfig.params);
  }, [emailFilterConfig, currentPage, pageSize]);

  return (
    <div className="flex gap-4 p-4 flex-1 overflow-auto">
      {emailFilterConfig.isOpen && <FilterEmail />}
      <div className="card p-4 pt-7 flex-1 flex flex-col overflow-auto shadow-lg">
        <div className="overflow-auto">
          <EmailToolbar />
        </div>

        {/* Table */}
        <div className="flex flex-1 flex-col w-full py-2 align-middle overflow-auto">
          <div className="w-full h-full border rounded-md overflow-auto">
            {mailings.length > 0 ? (
              mailings.map((mailing: MailingModel) => (
                <EmailItem key={mailing.id} mailing={mailing} />
              ))
            ) : (
              <div className="h-full flex flex-1 justify-center items-center">
                <p>No mailings</p>
              </div>
            )}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-end">
          <Pagination
            className="pagination-bar"
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={(pageSize: number, currentPage: number) => {
              setPageSize(pageSize);
              setCurrentPage(currentPage);
            }}
          />
        </div>
      </div>
    </div>
  );
}
