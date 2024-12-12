"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import Pagination from "@/components/extends/Pagination/Pagination";
import FilterEmail from "@/components/Filter/filterEmail";
import EmailToolbar from "@/sections/emails/EmailToolbar";
import EmailItem from "@/sections/emails/EmailItem";
import SortableHeader from "@/components/ui/SortableHeader";
import Loading from "@/components/Loading";

import {
  deleteManualMailing,
  deleteMailingInCadence,
  skipMailingInCadence,
  getMailings,
  getMailingTotalCount,
  MailingModel,
  sendMailing,
  updateMailing,
  markMailingAsInterested,
} from "@/services/mailingService";
import { useEmailFilter } from "@/contexts/FilterEmailContext";
import { handleError, runService } from "@/utils/service_utils";
import { updateLead } from "@/services/leadService";
import { LEAD_STAGE } from "@/types/enums";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<MailingModel>();

  const fetchMailings = (params: { [key: string]: string }) => {
    setLoading(true);
    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    runService(
      {
        offset: offset,
        limit: limit,
        campaignId: campaignId,
        cadenceId: cadenceId,
        fromUser: emailFilterConfig.fromUser,
        search: emailFilterConfig.search,
        params,
      },
      getMailings,
      (data) => {
        setMailings(data);
        setLoading(false);
      },
      (status, error) => {
        handleError(status, error);
        console.log(status, error);
        setLoading(false);
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
        setTotalCount(data?.count ? data?.count : 0);
      },
      (status, error) => {
        handleError(status, error);
        console.log(status, error);
      }
    );
  };

  useEffect(() => {
    fetchMailingTotalCount(emailFilterConfig.params);
    fetchMailings(emailFilterConfig.params);
  }, [emailFilterConfig, currentPage, pageSize]);

  const handleChangeSort = (label: string) => {
    console.log(label);
    if (emailFilterConfig.orderBy === label)
      setEmailFilterConfig((config) => {
        return {
          ...config,
          isAscending: !config.isAscending,
        };
      });
    else
      setEmailFilterConfig((config) => {
        return {
          ...config,
          orderBy: label,
          isAscending: true,
        };
      });
  };

  const handleSendMailing = (mailingId: string, cadenceStateId?: string) => {
    runService(
      {
        id: mailingId,
        cadenceStateId: cadenceStateId,
      },
      sendMailing,
      (data) => {
        fetchMailings(emailFilterConfig.params);
      },
      (status, error) => {
        handleError(status, error);
        console.log(status, error);
      }
    );
  };

  const handleDeleteManualMailing = (mailingId: string) => {
    runService(
      mailingId,
      deleteManualMailing,
      (data) => {
        fetchMailings(emailFilterConfig.params);
        if (data.success) {
          toast.success("Mailing deleted successfully");
        }
      },
      (status, error) => {
        handleError(status, error);
        console.log(status, error);
      }
    );
  };

  const handleDeleteMailingInCadence = (mailingId: string) => {
    runService(
      mailingId,
      deleteMailingInCadence,
      (data) => {
        fetchMailings(emailFilterConfig.params);
        if (data.success) {
          toast.success("Mailing deleted successfully");
        }
      },
      (status, error) => {
        handleError(status, error);
        console.log(status, error);
      }
    );
  };

  const handleSkipMailingInCadence = (mailingId: string) => {
    runService(
      mailingId,
      skipMailingInCadence,
      (data) => {
        fetchMailings(emailFilterConfig.params);
        if (data.success) {
          toast.success("Mailing deleted successfully");
        }
      },
      (status, error) => {
        handleError(status, error);
        console.log(status, error);
      }
    );
  };

  const handleMarkAsInterested = (mailingId: string) => {
    runService(
      { id: mailingId },
      markMailingAsInterested,
      (data) => {
        fetchMailings(emailFilterConfig.params);
        toast.success("Mailing updated successfully");
      },
      (status, error) => {
        console.log(status, error);
        toast.error(error);
      }
    );
  };

  return (
    <div className="flex gap-4 p-4 flex-1 overflow-auto">
      {emailFilterConfig.isOpen && <FilterEmail />}
      <div className="card p-4 pt-7 flex-1 flex flex-col gap-2 overflow-auto shadow-lg min-w-[420px]">
        <div className="overflow-auto">
          <EmailToolbar cadenceId={cadenceId} />
        </div>

        {/* Table */}
        <div className="flex flex-1 flex-col w-full align-middle border rounded-md overflow-auto">
          {loading ? (
            <Loading />
          ) : mailings.length > 0 ? (
            <table className="flex-1 w-full">
              <thead className="sticky top-0 z-10 bg-gray-50 shadow-md">
                <tr className="text-nowrap">
                  <th></th>
                  <th className="min-w-32">
                    <SortableHeader
                      label="to"
                      value="to"
                      orderBy={emailFilterConfig.orderBy}
                      isAscending={emailFilterConfig.isAscending}
                      handleChangeSort={handleChangeSort}
                    />
                  </th>
                  <th className="min-w-96">
                    <SortableHeader
                      label="title"
                      value="title"
                      orderBy={emailFilterConfig.orderBy}
                      isAscending={emailFilterConfig.isAscending}
                      handleChangeSort={handleChangeSort}
                    />
                  </th>
                  <th className="min-w-32 py-3 text-left text-xs uppercase text-gray-500">
                    From
                  </th>
                  <th className="min-w-32">
                    <SortableHeader
                      label="state"
                      value="state"
                      orderBy={emailFilterConfig.orderBy}
                      isAscending={emailFilterConfig.isAscending}
                      handleChangeSort={handleChangeSort}
                    />
                  </th>
                  <th className="min-w-32">
                    <SortableHeader
                      label="updated"
                      value="cretedAt"
                      orderBy={emailFilterConfig.orderBy}
                      isAscending={emailFilterConfig.isAscending}
                      handleChangeSort={handleChangeSort}
                    />
                  </th>
                  <th className="py-3 text-left text-xs uppercase text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {mailings.map((mailing: MailingModel) => (
                  <EmailItem
                    key={mailing.id}
                    mailing={mailing}
                    sendMailing={handleSendMailing}
                    skipMailingInCadence={handleSkipMailingInCadence}
                    deleteManualMailing={handleDeleteManualMailing}
                    deleteMailingInCadence={handleDeleteMailingInCadence}
                    markAsInterested={handleMarkAsInterested}
                  />
                ))}
                <tr></tr>
              </tbody>
            </table>
          ) : (
            <div className="h-full flex flex-1 justify-center items-center">
              <p className="text-gray-900 text-sm">No mailings</p>
            </div>
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
