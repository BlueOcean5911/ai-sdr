import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useEmailFilter } from "@/contexts/FilterEmailContext";
import {
  getMailingsStatistics,
  MailingsStatistics,
} from "@/services/mailingService";
import { classNames } from "@/utils";
import { handleError, runService } from "@/utils/service_utils";

const EmailToolbar = ({ cadenceId }: { cadenceId?: string }) => {
  const path = usePathname();
  const currentParams = Object.fromEntries(useSearchParams());
  const { emailFilterConfig, setEmailFilterConfig } = useEmailFilter();
  const [statistics, setStatistics] = useState<MailingsStatistics>({
    totalCount: 0,
    draftedCount: 0,
    scheduledCount: 0,
    deliveredCount: 0,
    bouncedCount: 0,
    openedCount: 0,
    repliedCount: 0,
    interestedCount: 0,
  });

  const fetchStatistics = () => {
    runService(
      {
        cadenceId,
        fromUser: emailFilterConfig.fromUser,
        search: emailFilterConfig.search,
        params: {},
      },
      getMailingsStatistics,
      setStatistics,
      (status, error) => {
        console.error(status, error);
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchStatistics();
  }, [emailFilterConfig]);

  const filterOptions = [
    { label: "Total", count: statistics.totalCount, params: {} },
    {
      label: "Drafted",
      count: statistics.draftedCount,
      params: { drafted: "true" },
    },
    {
      label: "Scheduled",
      count: statistics.scheduledCount,
      params: { scheduled: "true" },
    },
    {
      label: "Delivered",
      count: statistics.deliveredCount,
      params: { delivered: "true" },
    },
    {
      label: "Bounced",
      count: statistics.bouncedCount,
      params: { bounced: "true" },
    },
    {
      label: "Opened",
      count: statistics.openedCount,
      params: { opened: "true" },
    },
    {
      label: "Replied",
      count: statistics.repliedCount,
      params: { replied: "true" },
    },
    {
      label: "Interested",
      count: statistics.interestedCount,
      params: { interested: "true" },
    },
  ];

  return (
    <div className="w-full flex items-center gap-2 border-b border-gray-100 text-sm overflow-auto justify-between p-1">
      <button
        className="btn-secondary"
        onClick={() =>
          setEmailFilterConfig((prev) => ({ ...prev, isOpen: !prev.isOpen }))
        }
      >
        <AdjustmentsHorizontalIcon className="w-4 h-4" />
        <span>
          {emailFilterConfig.isOpen ? "Hide Filters" : "Show Filters"}
        </span>
      </button>
      <div className="flex gap-2 overflow-auto">
        {filterOptions.map(({ label, count, params }) => (
          <Link
            key={label}
            href={`${path}?${new URLSearchParams(
              params as Record<string, string>
            ).toString()}`}
          >
            <div
              className={classNames(
                "w-20 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b",
                currentParams[Object.keys(params)[0]]
                  ? "border-b-blue-500 bg-gray-100"
                  : "hover:bg-gray-100 hover:border-b-blue-500"
              )}
              onClick={() =>
                setEmailFilterConfig((prev) => ({
                  ...prev,
                  params: {
                    ...params,
                  } as Record<string, string>, // Ensure params is always a Record<string, string>
                }))
              }
            >
              <span className="text-inherit">{count}</span>
              <span className="text-inherit">{label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EmailToolbar;
