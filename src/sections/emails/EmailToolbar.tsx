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
import { useEffect, useRef, useState } from "react";

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
  });

  const fetchStatistics = () => {
    runService(
      {
        cadenceId: cadenceId,
        fromUser: emailFilterConfig.fromUser,
        search: emailFilterConfig.search,
      },
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
  }, [emailFilterConfig]);

  return (
    <div className="w-full flex items-center gap-2 border-b border-gray-100 text-sm overflow-auto justify-between">
      <button
        className="btn-secondary"
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
      <div className="flex gap-2 overflow-auto">
        <Link href={`${path}`}>
          <div
            className={classNames(
              "min-w-20 min-w- py-1 flex flex-col text-xs text-center cursor-pointer text-blue-500 border-b",
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
              "w-20 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b",
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
              "w-20 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b",
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
              "w-20 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b",
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
        <Link href={`${path}?bounced=true`}>
          <div
            className={classNames(
              "w-20 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b",
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
        <Link href={`${path}?opened=true`}>
          <div
            className={classNames(
              "w-20 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b",
              currentParams["opened"]
                ? "border-b-blue-500  bg-gray-100"
                : "hover:bg-gray-100 hover:border-b-blue-500"
            )}
            onClick={() =>
              setEmailFilterConfig((prev) => ({
                ...prev,
                params: { opened: "true" },
              }))
            }
          >
            <span className="text-inherit">{statistics.openedCount}</span>
            <span className="text-inherit">Opened</span>
          </div>
        </Link>
        {/* <Link href={`${path}?clicked=true`}>
          <div
            className={classNames(
              "w-20 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b",
              currentParams["clicked"]
                ? "border-b-blue-500  bg-gray-100"
                : "hover:bg-gray-100 hover:border-b-blue-500"
            )}
            onClick={() =>
              setEmailFilterConfig((prev) => ({
                ...prev,
                params: { clicked: "true" },
              }))
            }
          >
            <span className="text-inherit">{statistics.clickedCount}</span>
            <span className="text-inherit">Clicked</span>
          </div>
        </Link> */}
        <Link href={`${path}?replied=true`}>
          <div
            className={classNames(
              "w-20 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b",
              currentParams["replied"]
                ? "border-b-blue-500  bg-gray-100"
                : "hover:bg-gray-100 hover:border-b-blue-500"
            )}
            onClick={() =>
              setEmailFilterConfig((prev) => ({
                ...prev,
                params: { replied: "true" },
              }))
            }
          >
            <span className="text-inherit">{statistics.repliedCount}</span>
            <span className="text-inherit">Replied</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EmailToolbar;
