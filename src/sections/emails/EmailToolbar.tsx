import { useEmailFilter } from "@/contexts/FilterEmailContext";
import {
  getMailingsStatistics,
  MailingsStatistics,
} from "@/services/mailingService";
import { handleError, runService } from "@/utils/service_utils";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const EmailToolbar = () => {
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
      <div className="w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer text-blue-500 border-b bg-gray-100 border-b-blue-500">
        <span className="text-inherit">{statistics.totalCount}</span>
        <span className="text-inherit">Total</span>
      </div>
      <div className="w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b hover:bg-gray-100 hover:border-b-blue-500">
        <span className="text-inherit">{statistics.draftedCount}</span>
        <span className="text-inherit">Drafted</span>
      </div>
      <div className="w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b hover:bg-gray-100 hover:border-b-blue-500">
        <span className="text-inherit">{statistics.scheduledCount}</span>
        <span className="text-inherit">Scheduled</span>
      </div>
      <div className="w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b hover:bg-gray-100 hover:border-b-blue-500">
        <span className="text-inherit">{statistics.deliveredCount}</span>
        <span className="text-inherit">Delivered</span>
      </div>
      <div className="w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b hover:bg-gray-100 hover:border-b-blue-500">
        <span className="text-inherit">{statistics.notOpenedCount}</span>
        <span className="text-inherit">Not Opened</span>
      </div>
      <div className="w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b hover:bg-gray-100 hover:border-b-blue-500">
        <span className="text-inherit">{statistics.bouncedCount}</span>
        <span className="text-inherit">Bounced</span>
      </div>

      <div className="w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b hover:bg-gray-100 hover:border-b-blue-500">
        <span className="text-inherit">{statistics.notSentCount}</span>
        <span className="text-inherit">Not Sent</span>
      </div>
    </div>
  );
};

export default EmailToolbar;
