"use client";

import DialPad from "@/components/twilio/DialPad";
import CallBar from "@/components/twilio/PhoneDiaBar";
import { PhoneCall } from "lucide-react";
import { useTwilioContext } from "@/contexts/TwilioContextV2";
import { useEffect } from "react";

const PhoneDial = () => {
  const {
    device,
    connections,
    callMapping,
    showDialPad,
    setShowDialPad,
    handleDial,
  } = useTwilioContext();

  useEffect(() => {
    console.log("connections================>", connections);
  }, [connections]);

  return (
    <>
      <div className="fixed flex flex-col gap-2 bottom-0 right-24 px-8 py-2 z-50">
        {connections.length > 0 &&
          connections.map((connection: any, index) => (
            <div key={index}>
              {callMapping[connection.parameters.CallSid] && (
                <CallBar
                  state={connection.status()}
                  callInfo={callMapping[connection.parameters.CallSid]}
                  reject={() => connection.reject()}
                  accept={() => connection.accept()}
                  disconnect={() => connection.disconnect()}
                />
              )}
            </div>
          ))}
      </div>
      <div className="fixed bottom-0 left-0 px-8 py-2 z-50">
        {device && (
          <div
            className="relative flex items-center justify-center gap-2 rounded-full p-4 m-2 shadow-[0_0_15px_5px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_8px_rgba(0,0,0,0.25)] transition-shadow duration-300 cursor-pointer"
            onClick={() => {
              setShowDialPad(true);
            }}
          >
            {device &&
              (device.status() === "ready" || device.status() === "busy") && (
                <div className="absolute right-0 top-0 w-4 h-4 bg-blue-500 rounded-full" />
              )}
            {device && device.status() === "offline" && (
              <div className="absolute right-0 top-0 w-4 h-4 bg-yellow-500 rounded-full" />
            )}
            <PhoneCall className="h-8 w-8 font-bold stroke-blue-500" />
          </div>
        )}
      </div>

      {showDialPad && (
        <DialPad onDial={handleDial} onClose={() => setShowDialPad(false)} />
      )}
    </>
  );
};

export default PhoneDial;
