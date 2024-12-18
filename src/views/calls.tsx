"use client";
import { useEffect, useState } from "react";

import CallItem from "@/sections/calls/CallItem";
import CallToolbar from "@/sections/calls/CallToolbar";
import FilterCall from "@/components/Filter/filterCall";
import Loading from "@/components/Loading";
import SortableHeader from "@/components/ui/SortableHeader";
import Pagination from "@/components/extends/Pagination/Pagination";

import { handleError, runService } from "@/utils/service_utils";
import { useCallFilter } from "@/contexts/FilterCallContext";
import {
  CallProps,
  CallStatistics,
  deleteCall,
  getCalls,
  getCallStatistics,
  getCallTotalCount,
  updateCall,
} from "@/services/callService";
import CallLog, { CallSubmitProps } from "@/sections/calls/CallLogV2";
import { toast } from "react-toastify";

export default function Calls() {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState<CallProps | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { callFilterConfig, setCallFilterConfig } = useCallFilter();
  const [calls, setCalls] = useState<CallProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<CallStatistics>({});

  const fetchStatistics = () => {
    runService(
      undefined,
      getCallStatistics,
      (data) => {
        if (data) {
          setStatistics(data);
        }
      },
      (status, error) => {
        console.log(status, error);
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchStatistics();
  }, []);
  const handleEdit = (call: CallProps) => {
    setFocus(call);
    setOpen(true);
  };

  const handleEditCall = (values: CallSubmitProps) => {
    runService(
      {
        id: focus?.id,
        data: {
          leadId: values.leadId,
          callDispositionId: values.dispositionId,
          callPurposeId: values.purposeId,
          note: values.note,
        },
      },
      updateCall,
      (data) => {
        if (data) {
          refresh();
          toast.success("Call updated successfully");
        }
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const handleEditCallClose = () => {
    setFocus(null);
    setOpen(false);
  };

  const handleChangeSort = (label: string) => {
    console.log(label);
  };

  const handleDelete = (callId: string) => {
    runService(
      {
        id: callId,
      },
      deleteCall,
      (data) => {
        if (data) {
          refresh();
          toast.success("Call deleted successfully");
        }
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const fetchCalls = async () => {
    setLoading(true);
    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    await runService(
      {
        offset,
        limit,
        fromUser: callFilterConfig.fromUser,
        states: callFilterConfig.states,
        purposes: callFilterConfig.purposes,
        dispositions: callFilterConfig.dispositions,
      },
      getCalls,
      (data) => {
        setCalls(data);
      },
      (status, error) => {
        handleError(status, error);
        setLoading(false);
      }
    );
    setLoading(false);
  };

  const fetchCallTotalCount = () => {
    runService(
      {
        fromUser: callFilterConfig.fromUser,
        states: callFilterConfig.states,
        purposes: callFilterConfig.purposes,
        dispositions: callFilterConfig.dispositions,
      },
      getCallTotalCount,
      (data) => {
        setTotalCount(data?.count ? data?.count : 0);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const refresh = () => {
    fetchCalls();
    fetchCallTotalCount();
    fetchStatistics();
  };

  useEffect(() => {
    refresh();
  }, [callFilterConfig, currentPage, pageSize]);

  return (
    <div className="flex gap-4 p-4 flex-1 overflow-auto">
      {callFilterConfig.isOpen && <FilterCall />}
      <div className="card p-4 pt-7 flex-1 flex flex-col gap-2 overflow-auto shadow-lg min-w-[420px]">
        <div className="overflow-auto">
          <CallToolbar statistics={statistics} />
        </div>
        {/* Table */}
        <div className="flex flex-1 flex-col w-full align-middle border rounded-md overflow-auto">
          {loading ? (
            <Loading />
          ) : (
            <table className="w-full">
              <thead className="sticky top-0 z-10 bg-gray-50 shadow-md">
                <tr>
                  <th></th>
                  {[
                    "direction",
                    "contact",
                    "user",
                    "disposition",
                    "purpose",
                    "note",
                    "states",
                    "Date",
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
                {calls?.length > 0 ? (
                  calls.map((call: CallProps) => (
                    <CallItem
                      key={call.id}
                      call={call}
                      handleEdit={() => handleEdit(call)}
                      handleDelete={() => handleDelete(call.id)}
                    />
                  ))
                ) : (
                  <></>
                )}
                <tr></tr>
              </tbody>
            </table>
          )}
          {calls.length == 0 && (
            <div className="flex flex-1 justify-center items-center h-full">
              <p>No Calls Found</p>
            </div>
          )}
        </div>
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
      <CallLog
        open={open}
        leadId={focus?.leadId}
        depositionId={focus?.callDispositionId}
        purposeId={focus?.callPurposeId}
        note={focus?.note}
        onSubmit={handleEditCall}
        onClose={handleEditCallClose}
      />
    </div>
  );
}
