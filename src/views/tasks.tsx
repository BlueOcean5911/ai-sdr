"use client";
import Image from "next/image";
import Pagination from "@/components/extends/Pagination/Pagination";
import { useTaskFilter } from "@/contexts/FilterTaskContext";
import FilterTask from "@/components/Filter/filterTask";
// import TaskToolbar from "@/sections/tasks/TaskToolbar";
// import TaskItem from "@/sections/tasks/TaskItem";
import { handleError, runService } from "@/utils/service_utils";
import {
  getMailings,
  getMailingTotalCount,
  MailingModel,
} from "@/services/mailingService";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Tasks(
  { campaignId, cadenceId }: { campaignId?: string; cadenceId?: string } = {
    cadenceId: "",
    campaignId: "",
  }
) {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { taskFilterConfig, setTaskFilterConfig } = useTaskFilter();
  const [mailings, setMailings] = useState<MailingModel[]>([]);
  const currentParams = Object.fromEntries(useSearchParams());

  const fetchMailings = (params: { [key: string]: string }) => {
    runService(
      {
        offset: 0,
        limit: 100,
        campaignId: campaignId,
        cadenceId: cadenceId,
        fromUser: taskFilterConfig.fromUser,
        search: taskFilterConfig.search,
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
        fromUser: taskFilterConfig.fromUser,
        search: taskFilterConfig.search,
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
    fetchMailingTotalCount(currentParams);
    fetchMailings(currentParams);
  }, [taskFilterConfig, currentPage, pageSize]);

  return (
    <div className="flex gap-3 flex-1">
      {taskFilterConfig.isOpen && <FilterTask />}
      <div className="flex-1 flex flex-col">
        {/* <div className="px-6"><TaskToolbar /></div> */}

        {/* Table */}
        <div className="flex flex-1 flex-col w-full">
          <div className="w-full h-full flex items-center border rounded-md">
            {/* {mailings.length > 0 ? (
              mailings.map((mailing: MailingModel) => (
                <TaskItem key={mailing.id} mailing={mailing} />
              ))
            ) : ( */}
            <div className="flex flex-1 flex-col justify-center items-center text-center gap-2">
              <Image
                src={"/assets/images/nodata.svg"}
                alt={"nodata"}
                width={120}
                height={120}
              />
              <span>No new messages</span>
              <span className="w-1/2 text-xs">
                You'll see new task message here whenever they come in.
              </span>
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
