"use client";
import Pagination from "@/components/extends/Pagination/Pagination";
import { useEmailFilter } from "@/contexts/FilterEmailContext";
import FilterEmail from "@/components/Filter/filterEmail";
import EmailToolbar from "@/sections/emails/EmailToolbar";
import EmailItem from "@/sections/emails/EmailItem";
import { handleError, runService } from "@/utils/service_utils";
import { getMailings, MailingModel } from "@/services/mailingService";
import { useEffect, useState } from "react";

export default function Emails() {
  const { emailFilterConfig, setEmailFilterConfig } = useEmailFilter();
  const [mailings, setMailings] = useState<MailingModel[]>([]);
  // const [currentPage, setCurrentPage] = useState;

  const fetchMailings = () => {
    runService(
      { offset: 0, limit: 100 },
      getMailings,
      (data) => {
        console.log(data);
        setMailings(data);
      },
      (status, error) => {
        handleError(status, error);
        console.log(status, error);
      }
    );
  };

  useEffect(() => {
    fetchMailings();
  }, []);

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
