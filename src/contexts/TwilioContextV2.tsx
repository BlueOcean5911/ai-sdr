/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";

import { useAuth } from "@/contexts/AuthContext";
import { twilioApi } from "@/utils/api";
import { formatToE164 } from "@/utils/format";
import { toast } from "react-toastify";
import { CALL_STATE, CallMapping } from "@/types/enums";
import { handleError, runService } from "@/utils/service_utils";
import { addCall } from "@/services/callService";
import { LeadModel } from "@/services/leadService";

interface TokenResponse {
  token: string;
  identify: string;
}

interface TwilioContextType {
  device: any;
  deviceState: string | null;
  callMapping: CallMapping;
  connections: any[];
  showDialPad: boolean;
  callLogCallSids: Set<string>;
  setCallMapping: (mapping: CallMapping) => void;
  handleDial: (
    phoneNumber: string,
    leadId?: string,
    lead?: LeadModel,
    taskId?: string
  ) => void;
  setShowDialPad: (show: boolean) => void;
  cleanCallMapping: (callSid: string) => void;
  handleLogCall: (
    callSid: string,
    callDispositionId: string,
    callPurposeId: string,
    note: string
  ) => void;
}

const TwilioContext = createContext<TwilioContextType | undefined>(undefined);

export function TwilioProvider({ children }: { children: ReactNode }) {
  const { me } = useAuth();
  const [device, setDevice] = useState<any>(null);
  const [deviceState, setDeviceState] = useState<string | null>(null);
  const [connections, setConnections] = useState<any[] | []>([]);
  const [callMapping, setCallMapping] = useState<CallMapping>({});
  const [showDialPad, setShowDialPad] = useState<boolean>(false);
  const [callLogCallSids] = useState(new Set<string>());
  const [activeConnections] = useState(new Set());
  const callMappingRef = useRef({});

  // Update ref whenever callMapping changes
  useEffect(() => {
    callMappingRef.current = callMapping;
  }, [callMapping]);

  useEffect(() => {
    initializeTwilio();
  }, [me]);

  const cleanCallLogCallSids = (callSid: string): void => {
    callLogCallSids.delete(callSid);
  };

  const cleanCallMapping = (callSid: string) => {
    setCallMapping((prev) => {
      const newMapping = { ...prev };
      delete newMapping[callSid];
      return newMapping;
    });
    cleanCallLogCallSids(callSid);
  };

  const cleanConnection = (callSid: string) => {
    activeConnections.delete(callSid);
    setConnections((currentConnections) =>
      currentConnections.filter((conn) => conn.parameters.CallSid !== callSid)
    );
  };

  const handleLogCall = (
    callSid: string,
    callDispositionId: string,
    callPurposeId: string,
    note: string
  ) => {
    const call = callMapping[callSid];
    call.callDispositionId = callDispositionId;
    call.callPurposeId = callPurposeId;
    call.note = note;
    delete call.lead;

    runService(
      call,
      addCall,
      (data) => {
        toast.success("Call data uploaded successfully");
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const handleOffline = (existedDevice: any) => {
    setDeviceState("offline");
    const accessToken = refreshToken();
    if (!accessToken) return;
    if (!existedDevice) {
      initializeTwilio();
    }
    try {
      existedDevice.setup(accessToken);
    } catch (error) {
      initializeTwilio();
    }
  };

  const handleIncomingCall = (connection: any) => {
    const callSid = connection.parameters.CallSid;
    let isCallAccepted = false;

    if (!activeConnections.has(callSid)) {
      activeConnections.add(callSid);

      setConnections((currentConnections) => {
        const uniqueConnections = currentConnections.filter(
          (conn) => conn.parameters.CallSid !== callSid
        );
        return [...uniqueConnections, connection];
      });
    }

    setCallMapping((prev) => ({
      ...prev,
      [connection.parameters.CallSid]: {
        fromPhoneNumber: connection.parameters.From,
        toPhoneNumber: connection.parameters.To,
        outbound: false,
        callSid: connection.parameters.CallSid,
        state: CALL_STATE.INCOMING,
      },
    }));

    // Handle accepted call
    connection.on("accept", () => {
      isCallAccepted = true;
      setCallMapping((prev) => ({
        ...prev,
        [callSid]: {
          ...prev[callSid],
          state: CALL_STATE.OPEN,
        },
      }));
    });
    // Handle missed/rejected call
    connection.on("cancel", () => {
      const currentMapping: CallMapping = callMappingRef.current;
      if (currentMapping[callSid]?.state === CALL_STATE.INCOMING) {
        if (!isCallAccepted) {
          if (callSid in currentMapping) {
            let call = {
              ...currentMapping[callSid],
              state: CALL_STATE.MISSED,
            };
            delete call.lead;

            runService(
              call,
              addCall,
              (data) => {
                toast.success("Call data uploaded successfully");
              },
              (status, error) => {
                handleError(status, error);
              }
            );
          }

          cleanConnection(connection.parameters.CallSid);
        }
      }
    });
    // Handle completed call
    connection.on("disconnect", () => {
      if (isCallAccepted) {
        setCallMapping((prev) => ({
          ...prev,
          [callSid]: {
            ...prev[callSid],
            state: CALL_STATE.COMPLETED,
          },
        }));

        callLogCallSids.add(callSid);
        cleanConnection(callSid);
      }
    });
  };

  const initializeTwilio = async () => {
    if (typeof window === "undefined") return;
    if (!me?.phone) {
      return;
    }

    const aivioPhoneNumber = me.phone;
    const { Device, Connection } = await import("twilio-client");
    try {
      const response = await twilioApi.get(`/token/${aivioPhoneNumber}`);

      const data: TokenResponse = response.data;
      const newDevice = new Device(data.token, {
        identity: `client:${aivioPhoneNumber}`,
        codecPreferences: [Connection.Codec.PCMU, Connection.Codec.Opus],
        fakeLocalDTMF: true,
        enableRingingState: true,
        enableIceRestart: true,
        debug: true,
        allowIncomingWhileBusy: true,
        edge: ["ashburn", "dublin", "singapore"],
      });

      newDevice.on("ready", () => {
        setDeviceState("ready");
      });
      newDevice.on("busy", () => {
        setDeviceState("busy");
      });
      newDevice.on("error", () => {
        device.destroy();
        initializeTwilio();
        setDeviceState(null);
      });
      newDevice.on("offline", handleOffline);
      newDevice.on("incoming", handleIncomingCall);

      setDevice(newDevice);
    } catch (err) {
      console.error(err);
    }
  };

  // handle outgoing calls
  const handleDial = (
    phoneNumber: string,
    leadId?: string,
    lead?: LeadModel,
    taskId?: string
  ) => {
    if (!device || !phoneNumber) return;
    const formattedNumber = formatToE164(phoneNumber);
    if (!formattedNumber) {
      toast.error("Invalid phone number");
      return;
    }

    // If dial pad is open, close it
    if (showDialPad) {
      setShowDialPad(false);
    }

    let outgoingConnection;
    try {
      outgoingConnection = device.connect({ To: phoneNumber });
    } catch (error) {
      toast.info("Your device is busy, please try again later");
      console.error("Error dialing:", error);
      return;
    }

    outgoingConnection.on("accept", () => {
      const callSid = outgoingConnection.parameters.CallSid;
      if (!activeConnections.has(callSid)) {
        activeConnections.add(callSid);

        setConnections((currentConnections) => {
          const uniqueConnections = currentConnections.filter(
            (conn) => conn.parameters.CallSid !== callSid
          );
          return [...uniqueConnections, outgoingConnection];
        });
      }

      setCallMapping((prev) => ({
        ...prev,
        [outgoingConnection.parameters.CallSid]: {
          lead: lead,
          leadId: leadId,
          taskId: taskId,
          fromPhoneNumber: me.phone,
          toPhoneNumber: phoneNumber,
          outbound: true,
          callSid: outgoingConnection.parameters.CallSid,
          state: CALL_STATE.OPEN,
        },
      }));
    });
    outgoingConnection.on("disconnect", (connection: any) => {
      const callSid = connection.parameters.CallSid;

      setCallMapping((prev) => ({
        ...prev,
        [callSid]: {
          ...prev[callSid],
          state: CALL_STATE.COMPLETED,
        },
      }));

      callLogCallSids.add(callSid);
      cleanConnection(callSid);
    });
  };

  const refreshToken = async () => {
    try {
      if (me?.phone) {
        return;
      }
      const response = await twilioApi.get(`/token/${me.phone}`);
      const data: TokenResponse = response.data;
      return data.token;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TwilioContext.Provider
      value={{
        device,
        deviceState,
        callMapping,
        connections,
        showDialPad,
        callLogCallSids,
        setCallMapping,
        handleDial,
        setShowDialPad,
        cleanCallMapping,
        handleLogCall,
      }}
    >
      {children}
    </TwilioContext.Provider>
  );
}

export function useTwilioContext() {
  const context = useContext(TwilioContext);
  if (context === undefined) {
    throw new Error("useTwilioContext must be used within a TwilioProvider");
  }
  return context;
}

// https://www.twilio.com/en-us/blog/routing-incoming-phone-calls-twilio-programmable-voice-python-django
// https://www.twilio.com/en-us/blog/make-receive-phone-calls-browser-twilio-programmable-voice-python-javascript
// https://www.twilio.com/docs/voice/sdks/javascript/v1/connection#accept-handler
