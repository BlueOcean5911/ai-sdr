"use client";

import {
  checkIfGmailConnected,
  connectWithGmail,
  disconnectWithGmail,
} from "@/services/mailboxesService";
import { runService } from "@/utils/service_utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTE_ACCOUNT_INBOX_GMAIL } from "@/data/routes";
import Loading from "@/components/Loading";

const Page = () => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    runService(
      undefined,
      checkIfGmailConnected,
      (connected) => {
        if (connected) {
          setConnected(true);
        }
        setLoading(false);
      },
      (status, error) => {
        console.error(error);
      }
    );
  }, []);

  const handleGoogleLogin = () => {
    runService(
      undefined,
      connectWithGmail,
      (data) => {
        console.log("response", data);
        window.location.href = data.url;
      },
      (status, error) => {
        console.error(error);
      }
    );
  };

  const handleDisconnectWithGoogle = () => {
    setLoading(true);
    runService(
      undefined,
      disconnectWithGmail,
      (data) => {
        if (data.success) {
          setConnected(false);
          setLoading(false);
        }
      },
      (status, error) => {
        console.error(error);
      }
    );
  };
  return (
    <div className="flex-1 flex-center flex-col gap-4 bg-gray-100">
      {loading ? (
        <Loading />
      ) : connected ? (
        <>
          <button onClick={handleDisconnectWithGoogle} className="btn-primary">
            Disconnect with Gmail
          </button>
        </>
      ) : (
        <button onClick={handleGoogleLogin} className="btn-primary">
          Connect with Gmail
        </button>
      )}
    </div>
  );
};

export default Page;
