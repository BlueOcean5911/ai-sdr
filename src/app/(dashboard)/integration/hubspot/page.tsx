"use client";
import SuccessAnimation from "@/components/Animation/SuccessAnimation";
import { ROUTE_INTEGRATION_HUBSPOT_COMPANIES } from "@/data/routes";
import { oauthHubspot } from "@/services/integrationService";
import { handleError, runService } from "@/utils/service_utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const handleOAuthHubspot = (code: string) => {
    runService(
      { code },
      oauthHubspot,
      (data) => {
        console.log(data);
      },
      (statusCode, error) => {
        handleError(statusCode, error);
      }
    );
  };

  const isInitialRender = React.useRef(true);

  React.useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (code !== undefined && code !== null) {
      handleOAuthHubspot(code);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <SuccessAnimation />
      <Link href={ROUTE_INTEGRATION_HUBSPOT_COMPANIES}>
        <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 min-w-48">
          Explore
        </button>
      </Link>
    </div>
  );
};

export default Page;
