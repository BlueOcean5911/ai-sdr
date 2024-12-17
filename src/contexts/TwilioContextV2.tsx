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

  useEffect(() => {
    console.log("CONNECTIONS", connections);
    console.log("callMapping", callMapping);
  }, [connections, callMapping]);

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

  const handlePendingCall = (conn: any) => {
    const callSid = conn.parameters.CallSid;
    setCallMapping((prev) => {
      // If CallSid exists, preserve existing data and only update the state
      if (prev[callSid]) {
        return {
          ...prev,
          [callSid]: {
            ...prev[callSid],
            state: CALL_STATE.OPEN,
          },
        };
      }
      return { ...prev };
    });
  };

  const handleCancelCall = (connection: any) => {
    const callSid = connection.parameters.CallSid;
    // remove the connection from the activeConnections set and connections
    cleanConnection(callSid);

    setCallMapping((prev) => {
      // If CallSid exists, preserve existing data and only update the state
      if (prev[callSid]) {
        return {
          ...prev,
          [callSid]: {
            ...prev[callSid],
            state: CALL_STATE.CANCELLED,
          },
        };
      }
      return { ...prev };
    });
  };

  const handleRejectCall = (connection: any) => {
    const callSid = connection.parameters.CallSid;
    // remove the connection from the activeConnections set and connections
    cleanConnection(callSid);

    setCallMapping((prev) => {
      // If CallSid exists, preserve existing data and only update the state
      if (prev[callSid]) {
        return {
          ...prev,
          [callSid]: {
            ...prev[callSid],
            state: CALL_STATE.REJECTED,
          },
        };
      }
      return { ...prev };
    });
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
    console.log("call: ", call);

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
    existedDevice.setup(accessToken);
  };

  const handleIncomingCall = (connection: any) => {
    const callSid = connection.parameters.CallSid;
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

    connection.on("pending", handlePendingCall);
    connection.on("canceled", handleCancelCall);
    connection.on("rejected", handleRejectCall);
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
    console.log("here================", lead, leadId, taskId);
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
      console.log("accept===========>");
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
      console.log("here================123", leadId, lead, taskId);
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
      console.log(err);
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

// Connection States:

// - "pending" // Initial state when call is being established
// - "ringing" // Call is ringing on recipient's end
// - "open" // Active call connection
// - "closed" // Call has ended normally
// - "failed" // Call failed to connect
// - "busy" // Recipient's line was busy
// - "canceled" // Call was canceled before connecting
// - "rejected" // Recipient rejected the call

// Connection Events:

// connection.on("accept") // Call was accepted
// connection.on("cancel") // Call was canceled
// connection.on("disconnect") // Call ended (normal termination)
// connection.on("reject") // Call was rejected
// connection.on("error") // Error occurred during call
// connection.on("mute") // Call was muted
// connection.on("unmute") // Call was unmuted
// connection.on("volume") // Volume changed
// connection.on("warning") // Warning event occurred
// connection.on("warning-cleared") // Warning was cleared

// inbound calls

// States:
// - "pending" // Incoming call notification
// - "ringing" // Your device is ringing
// - "open" // You accepted the call
// - "closed" // You ended the call
// - "rejected" // You rejected the call
// - "canceled" // Caller hung up before you answered

// Events:
// connection.on("incoming") // New incoming call
// connection.on("accept") // You accepted call
// connection.on("reject") // You rejected call
// connection.on("cancel") // Caller canceled
// connection.on("disconnect") // Call ended

// outbound calls

// States:
// - "pending" // Call initializing
// - "ringing" // Recipient's phone ringing
// - "open" // Recipient answered
// - "closed" // Call completed normally
// - "failed" // Call failed to connect
// - "busy" // Recipient line busy
// - "canceled" // You canceled before answer

// Events:
// connection.on("accept") // Recipient answered
// connection.on("reject") // Recipient rejected
// connection.on("disconnect") // Call ended
// connection.on("busy") // Line busy
// connection.on("error") // Connection error
