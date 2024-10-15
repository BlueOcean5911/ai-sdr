"use client";
import Pagination from "@/components/extends/Pagination/Pagination";
import { useCallFilter } from "@/contexts/FilterCallContext";
import FilterCall from "@/components/Filter/filterCall";
import CallToolbar from "@/sections/calls/CallToolbar";
import CallItem from "@/sections/calls/CallItem";
import { handleError, runService } from "@/utils/service_utils";
import { getCalls, getCallTotalCount, CallModel } from "@/services/callService";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { callData } from "@/data/call.data";

export default function Calls(
  { campaignId, cadenceId }: { campaignId?: string; cadenceId?: string } = {
    cadenceId: "",
    campaignId: "",
  }
) {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState<CallModel>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { callFilterConfig, setCallFilterConfig } = useCallFilter();
  const [calls, setCalls] = useState<CallModel[]>(callData);
  const currentParams = Object.fromEntries(useSearchParams());

  // const fetchCalls = (params: { [key: string]: string }) => {
  //   runService(
  //     {
  //       offset: 0,
  //       limit: 100,
  //       campaignId: campaignId,
  //       cadenceId: cadenceId,
  //       fromUser: callFilterConfig.fromUser,
  //       search: callFilterConfig.search,
  //       params,
  //     },
  //     getCalls,
  //     (data) => {
  //       setCalls(data);
  //     },
  //     (status, error) => {
  //       handleError(status, error);
  //       console.log(status, error);
  //     }
  //   );
  // };

  // const fetchCallTotalCount = (params: { [key: string]: string }) => {
  //   runService(
  //     {
  //       campaignId: campaignId,
  //       cadenceId: cadenceId,
  //       fromUser: callFilterConfig.fromUser,
  //       search: callFilterConfig.search,
  //       params,
  //     },
  //     getCallTotalCount,
  //     (data) => {
  //       console.log("Call total", data);
  //       setTotalCount(data?.count ? data?.count : 0);
  //     },
  //     (status, error) => {
  //       handleError(status, error);
  //       console.log(status, error);
  //     }
  //   );
  // };

  // useEffect(() => {
  //   fetchCallTotalCount(currentParams);
  //   fetchCalls(currentParams);
  // }, []);

  // useEffect(() => {
  //   fetchCallTotalCount(currentParams);
  //   fetchCalls(currentParams);
  // }, [callFilterConfig, currentPage, pageSize]);

  const handleCreate = () => {
    setFocus(undefined);
    setOpen(true);
  };

  const handleEdit = (call: CallModel) => {
    setFocus(call);
    setOpen(true);
  };

  const handleDelete = (taskId: string) => {
    setCalls(calls.filter((call) => call.id !== taskId));
  };

  return (
    <div className="flex gap-4 p-4 flex-1 overflow-auto">
      {callFilterConfig.isOpen && <FilterCall />}
      <div className="card p-4 pt-7 flex-1 flex flex-col gap-2 overflow-auto shadow-lg min-w-[420px]">
        <div className="overflow-auto">
          <CallToolbar />
        </div>

        {/* Table */}
        <div className="flex flex-1 flex-col w-full align-middle overflow-auto">
          <div className="w-full h-full border rounded-md overflow-auto">
            {calls.length > 0 ? (
              calls.map((call: CallModel) => (
                <CallItem
                  key={call.id}
                  call={call}
                  handleEdit={() => handleEdit(call)}
                  handleDelete={() => handleDelete(call.id)}
                />
              ))
            ) : (
              <div className="h-full flex flex-1 justify-center items-center">
                <p>No calls</p>
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
