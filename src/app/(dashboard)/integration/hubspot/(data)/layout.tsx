// app/integration/hubspot/layout.tsx
"use client";

import {
  ROUTE_INTEGRATION_HUBSPOT_COMPANIES,
  ROUTE_INTEGRATION_HUBSPOT_CONTACTS,
} from "@/data/routes";
import { classNames } from "@/utils";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { handleError, runService } from "@/utils/service_utils";
import { SuccessModel } from "@/types";
import { importFromHubspot } from "@/services/hubspotIntegrationService";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  const handleImportFromHubspot = () => {
    if (path.endsWith(ROUTE_INTEGRATION_HUBSPOT_COMPANIES)) {
      runService(
        {},
        importFromHubspot,
        (data: SuccessModel) => {
          if (data.success) {
            toast.success("Successfully imported!");
          }
        },
        (statusCode, error) => {
          handleError(statusCode, error);
        }
      );
    }
  };

  const handleSyncToHubspot = () => {
    toast.success("Successfully imported!");
  };

  return (
    <>
      <div className="p-4 bg-gray-100 h-full w-full">
        <div className="p-5 rounded-lg shadow-lg flex flex-col h-full bg-white">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Link href={ROUTE_INTEGRATION_HUBSPOT_COMPANIES}>
                <div
                  className={classNames(
                    "pb-1 px-3 text-sm/6 font-semibold focus:outline-none hover:text-blue-400",
                    path.endsWith(ROUTE_INTEGRATION_HUBSPOT_COMPANIES)
                      ? "text-blue-500 border-b-2 border-b-blue-500"
                      : ""
                  )}
                >
                  Companies
                </div>
              </Link>
              <Link href={ROUTE_INTEGRATION_HUBSPOT_CONTACTS}>
                <div
                  className={classNames(
                    "pb-1 px-3 text-sm/6 font-semibold focus:outline-none hover:text-blue-400",
                    path.endsWith(ROUTE_INTEGRATION_HUBSPOT_CONTACTS)
                      ? "text-blue-500 border-b-2 border-b-blue-500"
                      : ""
                  )}
                >
                  Contacts
                </div>
              </Link>
            </div>
            <div className="flex gap-2">
              <button
                className="btn-secondary"
                onClick={() => handleImportFromHubspot()}
              >
                Import
                <a
                  className="max-w-48"
                  data-tooltip-id="my-tooltip-hubspot-sync"
                  data-tooltip-html="<div class='my-tooltip-container'>Click to import data from HubSpot into our sales marketing platform for seamless integration and enhanced campaign management.<div>"
                >
                  <QuestionMarkCircleIcon className="w-4 h-4" />
                </a>
                <Tooltip id="my-tooltip-hubspot-sync" place="top-end" />
              </button>
              <button
                className="btn-primary"
                onClick={() => handleSyncToHubspot()}
              >
                Sync
                <a
                  className="max-w-48"
                  data-tooltip-id="my-tooltip-hubspot-sync"
                  data-tooltip-html="<div class='my-tooltip-container'>Sync your data with HubSpot. This updates your HubSpot account with the latest info from our platform, keeping your sales and marketing efforts aligned and up-to-date.<div>"
                >
                  <QuestionMarkCircleIcon className="w-4 h-4" />
                </a>
                <Tooltip id="my-tooltip-hubspot-sync" place="top-end" />
              </button>
            </div>
          </div>
          <div className="py-2 flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
