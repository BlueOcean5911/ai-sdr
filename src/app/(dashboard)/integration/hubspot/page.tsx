"use client";
import { oauthHubspot } from "@/services/integrationService";
import { handleError, runService } from "@/utils/service_utils";
import HubspotCompanyTable from "@/views/hubpsotCompanyTable";
import HubspotContactTable from "@/views/hubpsotContactTable";
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
    <div>
      <HubspotCompanyTable />
      <HubspotContactTable />
    </div>
  );
};

export default Page;
