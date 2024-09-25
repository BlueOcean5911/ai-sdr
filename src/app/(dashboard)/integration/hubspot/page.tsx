"use client";
import { oauthHubspot } from "@/services/integrationService";
import { handleError, runService } from "@/utils/service_utils";
import { useSearchParams } from "next/navigation";

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

  if (code !== undefined && code !== null) {
    handleOAuthHubspot(code);
  }

  return <></>;
};

export default Page;
