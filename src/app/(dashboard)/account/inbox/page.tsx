"use client";

import {
  checkIfGmailConnected,
  connectWithGmail,
  disconnectWithGmail,
} from "@/services/mailboxesService";
import { runService } from "@/utils/service_utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { Inbox } from "lucide-react";

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
    <>
      <div className="p-4 flex flex-1 bg-gray-100 overflow-auto text-sm">
        <div className="flex flex-1 justify-center items-center bg-gray-100">
          <div className="card py-8 max-w-md w-full flex flex-col gap-5 border shadow-lg">
            <div className="change-password-header">
              <h1 className="text-lg">
                <span className="flex gap-2 items-center">
                  <Inbox className="w-6 h-6" />
                  Inbox
                </span>
              </h1>
              <hr />
            </div>
            <div className="p-4 pt-6 border rounded mt-4">
              <div className="flex-1 flex-center flex-col gap-4 min-h-80">
                {loading ? (
                  <Loading />
                ) : connected ? (
                  <>
                    <button
                      onClick={handleDisconnectWithGoogle}
                      className="btn-primary"
                    >
                      Disconnect with Gmail
                    </button>
                  </>
                ) : (
                  <button onClick={handleGoogleLogin} className="btn-primary">
                    Connect with Gmail
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
