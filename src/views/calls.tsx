"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import CallDetail from "@/sections/calls/CallDetail";
import CallItem from "@/sections/calls/CallItem";
import CallToolbar from "@/sections/calls/CallToolbar";
import FilterCall from "@/components/Filter/filterCall";
import Loading from "@/components/Loading";
import SortableHeader from "@/components/ui/SortableHeader";
import Pagination from "@/components/extends/Pagination/Pagination";

import { handleError, runService } from "@/utils/service_utils";
import { useCallFilter } from "@/contexts/FilterCallContext";
import { CallModel, getCalls } from "@/services/callService";

import { callData } from "@/data/call.data";

export default function Calls(
  { campaignId, cadenceId }: { campaignId?: string; cadenceId?: string } = {
    cadenceId: "",
    campaignId: "",
  }
) {
  const [open, setOpen] = useState(true);
  const [focus, setFocus] = useState<CallModel>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { callFilterConfig, setCallFilterConfig } = useCallFilter();
  const [calls, setCalls] = useState<CallModel[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    setFocus(undefined);
    setOpen(true);
  };

  const handleEdit = (call: CallModel) => {
    setFocus(call);
    setOpen(true);
  };

  const handleChangeSort = (label: string) => {
    console.log(label);
  };

  const handleDelete = (callId: string) => {
    setCalls(calls.filter((call) => call.id !== callId));
  };

  return (
    <div className="flex gap-4 p-4 flex-1 overflow-auto">
      <CallDetail open={open} call={focus} handleClose={() => setOpen(false)} />
      {callFilterConfig.isOpen && <FilterCall />}
      <div className="card p-4 pt-7 flex-1 flex flex-col gap-2 overflow-auto shadow-lg min-w-[420px]">
        <div className="overflow-auto">
          <CallToolbar />
        </div>

        {/* Table */}
        <div className="flex flex-1 flex-col w-full align-middle border rounded-md overflow-auto">
          {loading ? (
            <Loading />
          ) : (
            <table className="flex-1 w-full">
              <thead className="sticky top-0 z-10 bg-gray-50 shadow-md">
                <tr>
                  <th></th>
                  {[
                    "spin",
                    "from",
                    "to",
                    "date",
                    "duration",
                    "status",
                    "price",
                    "unit",
                  ].map((value, index) => (
                    <th key={index}>
                      <SortableHeader
                        label={
                          value.charAt(0).toUpperCase() +
                          value.slice(1).replace(/([A-Z])/g, " $1")
                        }
                        value={value}
                        orderBy={callFilterConfig.orderBy}
                        isAscending={callFilterConfig.isAscending}
                        handleChangeSort={handleChangeSort}
                      />
                    </th>
                  ))}
                  <th className="py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {calls.length > 0 ? (
                  calls.map((call: CallModel) => (
                    <CallItem
                      key={call.sid}
                      call={call}
                      handleEdit={() => handleEdit(call)}
                      handleDelete={() => handleDelete(call.sid)}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="h-full flex justify-center items-center"
                    >
                      <p></p>
                    </td>
                  </tr>
                )}
                <tr></tr>
              </tbody>
            </table>
          )}
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
