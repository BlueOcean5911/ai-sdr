"use client";

import DialPad from "@/components/twilio/DialPad";
import CallBar from "@/components/twilio/PhoneDiaBar";
import { LoaderCircleIcon, PhoneCall } from "lucide-react";
import { useTwilioContext } from "@/contexts/TwilioContextV2";
import CallLog from "../calls/CallLog";
import { toast } from "react-toastify";

const PhoneDial = () => {
  const {
    device,
    deviceState,
    connections,
    callMapping,
    showDialPad,
    callLogCallSids,
    cleanCallMapping,
    setShowDialPad,
    handleDial,
  } = useTwilioContext();

  return (
    <>
      <div className="fixed flex flex-col gap-2 bottom-0 right-24 px-8 py-2 z-50">
        {connections.length > 0 &&
          connections.map((connection: any, index) => (
            <div key={index}>
              {callMapping[connection.parameters.CallSid] && (
                <CallBar
                  state={callMapping[connection.parameters.CallSid].state}
                  callInfo={callMapping[connection.parameters.CallSid]}
                  reject={() => connection.reject()}
                  accept={() => connection.accept()}
                  disconnect={() => connection.disconnect()}
                />
              )}
            </div>
          ))}
      </div>
      <div className="fixed bottom-0 left-0 px-8 py-2 z-40">
        {device && (
          <div
            className="relative flex items-center justify-center gap-2 rounded-full p-4 m-2 shadow-[0_0_15px_5px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_8px_rgba(0,0,0,0.25)] transition-shadow duration-300 cursor-pointer"
            onClick={() => {
              if (deviceState === "ready") {
                setShowDialPad(true);
              } else {
                toast.info("Voice Device is not ready");
              }
            }}
          >
            {device ? (
              deviceState === null ? (
                <LoaderCircleIcon className="h-8 w-8 font-bold stroke-blue-500" />
              ) : (
                <>
                  <PhoneCall className="h-8 w-8 font-bold stroke-blue-500" />
                  {deviceState === "ready" && (
                    <div className="absolute right-0 top-0 w-4 h-4 bg-blue-500 rounded-full" />
                  )}
                  {deviceState === "busy" && (
                    <div className="absolute right-0 top-0 w-4 h-4 bg-red-500 rounded-full" />
                  )}
                  {deviceState === "offline" && (
                    <div className="absolute right-0 top-0 w-4 h-4 bg-yellow-500 rounded-full" />
                  )}
                </>
              )
            ) : null}
          </div>
        )}
      </div>

      {showDialPad && (
        <DialPad
          onDial={(phoneNumber: string) => {
            handleDial(phoneNumber);
          }}
          onClose={() => setShowDialPad(false)}
        />
      )}

      {Array.from(callLogCallSids).map((callSid: string, index) => (
        <CallLog
          key={index}
          open={true}
          callSid={callSid}
          handleClose={() => {
            cleanCallMapping(callSid);
          }}
        />
      ))}
    </>
  );
};

export default PhoneDial;
