import { useEmailFilter } from "@/contexts/FilterEmailContext";
import {
  getMailingsStatistics,
  MailingsStatistics,
} from "@/services/mailingService";
import { classNames } from "@/utils";
import { handleError, runService } from "@/utils/service_utils";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EmailToolbar = () => {
  const path = usePathname();
  const currentParams = Object.fromEntries(useSearchParams());
  const { emailFilterConfig, setEmailFilterConfig } = useEmailFilter();
  const [statistics, setStatistics] = useState<MailingsStatistics>({
    totalCount: 0,
    scheduledCount: 0,
    deliveredCount: 0,
    bouncedCount: 0,
    draftedCount: 0,
    notOpenedCount: 0,
    notSentCount: 0,
  });

  const fetchStatistics = () => {
    runService(
      undefined,
      getMailingsStatistics,
      (data) => {
        setStatistics(data);
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

  return (
    <div className="w-full flex items-center gap-2 border-b border-gray-100 text-sm overflow-auto">
      <button
        className="min-w-32 px-2 py-1.5 flex justify-center items-center gap-2 border-2 border-gray-300 rounded-md hover:bg-gray-200"
        onClick={() => {
          if (emailFilterConfig.isOpen) {
            setEmailFilterConfig({ ...emailFilterConfig, isOpen: false });
          } else {
            setEmailFilterConfig({ ...emailFilterConfig, isOpen: true });
          }
        }}
      >
        <AdjustmentsHorizontalIcon className="w-4 h-4" />
        {emailFilterConfig.isOpen ? (
          <span>Hide Filters</span>
        ) : (
          <span>Show Filters</span>
        )}
      </button>
      <Link href={`${path}`}>
        <div
          className={classNames(
            "w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer text-blue-500 border-b",
            Object.keys(currentParams).length === 0
              ? "border-b-blue-500  bg-gray-100"
              : "hover:bg-gray-100 hover:border-b-blue-500"
          )}
          onClick={() =>
            setEmailFilterConfig((prev) => ({
              ...prev,
              params: {},
            }))
          }
        >
          <span className="text-inherit">{statistics.totalCount}</span>
          <span className="text-inherit">Total</span>
        </div>
      </Link>
      <Link href={`${path}?drafted=true`}>
        <div
          className={classNames(
            "w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b",
            currentParams.drafted
              ? "border-b-blue-500  bg-gray-100"
              : "hover:bg-gray-100 hover:border-b-blue-500"
          )}
          onClick={() =>
            setEmailFilterConfig((prev) => ({
              ...prev,
              params: { drafted: "true" },
            }))
          }
        >
          <span className="text-inherit">{statistics.draftedCount}</span>
          <span className="text-inherit">Drafted</span>
        </div>
      </Link>
      <Link href={`${path}?scheduled=true`}>
        <div
          className={classNames(
            "w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b",
            currentParams.scheduled
              ? "border-b-blue-500  bg-gray-100"
              : "hover:bg-gray-100 hover:border-b-blue-500"
          )}
          onClick={() =>
            setEmailFilterConfig((prev) => ({
              ...prev,
              params: { scheduled: "true" },
            }))
          }
        >
          <span className="text-inherit">{statistics.scheduledCount}</span>
          <span className="text-inherit">Scheduled</span>
        </div>
      </Link>
      <Link href={`${path}?delivered=true`}>
        <div
          className={classNames(
            "w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b",
            currentParams.delivered
              ? "border-b-blue-500  bg-gray-100"
              : "hover:bg-gray-100 hover:border-b-blue-500"
          )}
          onClick={() =>
            setEmailFilterConfig((prev) => ({
              ...prev,
              params: { delivered: "true" },
            }))
          }
        >
          <span className="text-inherit">{statistics.deliveredCount}</span>
          <span className="text-inherit">Delivered</span>
        </div>
      </Link>
      <Link href={`${path}?not_opened=true`}>
        <div
          className={classNames(
            "w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b",
            currentParams["not_opened"]
              ? "border-b-blue-500  bg-gray-100"
              : "hover:bg-gray-100 hover:border-b-blue-500"
          )}
          onClick={() =>
            setEmailFilterConfig((prev) => ({
              ...prev,
              params: { not_opened: "true" },
            }))
          }
        >
          <span className="text-inherit">{statistics.notOpenedCount}</span>
          <span className="text-inherit">Not Opened</span>
        </div>
      </Link>
      <Link href={`${path}?bounced=true`}>
        <div
          className={classNames(
            "w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b",
            currentParams.bounced
              ? "border-b-blue-500  bg-gray-100"
              : "hover:bg-gray-100 hover:border-b-blue-500"
          )}
          onClick={() =>
            setEmailFilterConfig((prev) => ({
              ...prev,
              params: { bounced: "true" },
            }))
          }
        >
          <span className="text-inherit">{statistics.bouncedCount}</span>
          <span className="text-inherit">Bounced</span>
        </div>
      </Link>
      <Link href={`${path}?not_sent=true`}>
        <div
          className={classNames(
            "w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b",
            currentParams["not_sent"]
              ? "border-b-blue-500  bg-gray-100"
              : "hover:bg-gray-100 hover:border-b-blue-500"
          )}
          onClick={() =>
            setEmailFilterConfig((prev) => ({
              ...prev,
              params: { not_sent: "true" },
            }))
          }
        >
          <span className="text-inherit">{statistics.notSentCount}</span>
          <span className="text-inherit">Not Sent</span>
        </div>
      </Link>
    </div>
  );
};

export default EmailToolbar;
