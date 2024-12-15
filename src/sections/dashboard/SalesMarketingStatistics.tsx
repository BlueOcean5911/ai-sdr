import {
  getSalesMarketingStatistics,
  initialStateSalesMarketingStatistics,
  SalesMarketingStatisticsProps,
} from "@/services/analyticsService";
import { handleError, runService } from "@/utils/service_utils";
import {
  BellAlertIcon,
  CheckIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const SalesMarketingStatistics = () => {
  const [statistics, setStatistics] = useState<SalesMarketingStatisticsProps>(
    initialStateSalesMarketingStatistics
  );

  useEffect(() => {
    runService(
      undefined,
      getSalesMarketingStatistics,
      (data) => {
        setStatistics(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  }, []);

  return (
    <div className="w-full flex flex-col xl:flex-row gap-4">
      <div className="w-full p-5 flex flex-col justify-between rounded-lg bg-white shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex justify-center items-center rounded-full bg-sky-200">
              <EnvelopeIcon className="size-3.5 stroke-sky-950" />
            </div>
            <span className="text-lg font-semibold">
              {statistics.emailDelivered} email delivered
            </span>
          </div>
          <span className="text-xs text-gray-400">Week-to-date</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3 divide-y sm:divide-y-0 sm:divide-x">
          <div className="flex flex-col gap-1 grow">
            <span className="text-sm">
              {statistics.emailOpened} email opened
            </span>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="text-3xl">
                {statistics.totalEmails
                  ? (
                      (statistics.emailOpened / statistics.totalEmails) *
                      100
                    ).toFixed(2)
                  : 0}
                %
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-center rounded-md bg-green-200">
                  {statistics.totalEmails
                    ? (
                        (statistics.emailOpenedFromLastWeek /
                          statistics.totalEmails) *
                        100
                      ).toFixed(2)
                    : 0}
                  %
                </span>
                <span className="text-xs text-gray-400">from last week</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 grow pt-2 sm:pt-0 sm:pl-2">
            <span className="text-sm">
              {statistics.emailReplied} email replied
            </span>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="text-3xl">
                {statistics.totalEmails
                  ? (
                      (statistics.emailReplied / statistics.totalEmails) *
                      100
                    ).toFixed(2)
                  : 0}
                %
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-center rounded-md bg-green-200">
                  {statistics.totalEmails
                    ? (
                        (statistics.emailRepliedFromLastWeek /
                          statistics.totalEmails) *
                        100
                      ).toFixed(2)
                    : 0}
                  %
                </span>
                <span className="text-xs text-gray-400">from last week</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 grow pt-2 sm:pt-0 sm:pl-2">
            <span className="text-sm">
              {statistics.emailInterested} email interested
            </span>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="text-3xl">
                {statistics.totalEmails
                  ? (
                      (statistics.emailInterested / statistics.totalEmails) *
                      100
                    ).toFixed(2)
                  : 0}
                %
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-center rounded-md bg-green-200">
                  {statistics.totalEmails
                    ? (
                        (statistics.emailInterestedFromLastWeek /
                          statistics.totalEmails) *
                        100
                      ).toFixed(2)
                    : 0}
                  %
                </span>
                <span className="text-xs text-gray-400">from last week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-5 flex flex-col justify-between rounded-lg bg-white shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex justify-center items-center rounded-full bg-pink-200">
              <PhoneIcon className="size-3.5 stroke-pink-950" />
            </div>
            <span className="text-lg font-semibold">
              {statistics.totalCalls} calls dialed
            </span>
          </div>
          <span className="text-xs text-gray-400">Week-to-date</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3 divide-y sm:divide-y-0 sm:divide-x">
          <div className="flex flex-col gap-1 grow">
            <span className="text-sm">
              {statistics.callConnected} calls connected
            </span>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="text-3xl">
                {statistics.totalCalls
                  ? (
                      (statistics.callConnected / statistics.totalEmails) *
                      100
                    ).toFixed(2)
                  : 0}
                %
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-center rounded-md bg-green-200">
                  {statistics.totalCalls
                    ? (
                        (statistics.callConnectedFromLastWeek /
                          statistics.totalEmails) *
                        100
                      ).toFixed(2)
                    : 0}
                  %
                </span>
                <span className="text-xs text-gray-400">from last week</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 grow pt-2 sm:pt-0 sm:pl-2">
            <span className="text-sm">
              {statistics.callPositive} positive calls
            </span>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="text-3xl">
                {statistics.totalCalls
                  ? (
                      (statistics.callPositive / statistics.totalEmails) *
                      100
                    ).toFixed(2)
                  : 0}
                %
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-center rounded-md bg-green-200">
                  {statistics.totalCalls
                    ? (
                        (statistics.callPositiveFromLastWeek /
                          statistics.totalEmails) *
                        100
                      ).toFixed(2)
                    : 0}
                  %
                </span>
                <span className="text-xs text-gray-400">from last week</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 grow pt-2 sm:pt-0 sm:pl-2">
            <span className="text-sm">Average duration</span>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="text-3xl">
                {statistics.callAverageDuration}s
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-center rounded-md bg-green-200">
                  {statistics.callAverageDurationFromLastWeek}s
                </span>
                <span className="text-xs text-gray-400">from last week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesMarketingStatistics;
