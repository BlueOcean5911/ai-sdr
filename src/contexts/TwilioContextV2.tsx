/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { useAuth } from "@/contexts/AuthContext";
import { twilioApi } from "@/utils/api";
import { formatToE164 } from "@/utils/format";
import { PhoneNumber } from "libphonenumber-js";

interface TokenResponse {
  token: string;
  identify: string;
}

interface CallInfo {
  leadId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface CallMapping {
  [CallSid: string]: CallInfo;
}

interface TwilioContextType {
  device: any;
  callMapping: CallMapping;
  connections: any[];
  showDialPad: boolean;
  setCallMapping: (mapping: CallMapping) => void;
  handleDial: (phoneNumber: string) => void;
  setShowDialPad: (show: boolean) => void;
}

const TwilioContext = createContext<TwilioContextType | undefined>(undefined);

export function TwilioProvider({ children }: { children: ReactNode }) {
  const { me } = useAuth();

  const [device, setDevice] = useState<any>(null);
  const [connections, setConnections] = useState<any[] | []>([]);
  const [callMapping, setCallMapping] = useState<CallMapping>({});
  const [showDialPad, setShowDialPad] = useState<boolean>(false);
  const [activeConnections, setActiveConnections] = useState(new Set());

  useEffect(() => {
    initializeTwilio();
  }, [me]);

  const handleIncomingConnection = (connection: any) => {
    // Only process if this connection isn't already being handled
    if (
      !connections.some(
        (conn) => conn.parameters.CallSid === connection.parameters.CallSid
      )
    ) {
      setConnections((prev) => [...prev, connection]);
    }
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
        debug: true,
        allowIncomingWhileBusy: true,
        edge: ["ashburn", "dublin", "singapore"],
      });

      newDevice.on("ready", () => {});

      newDevice.on("error", (error) => {});

      newDevice.on("connect", (conn: any) => {});

      newDevice.on("disconnect", (conn: any) => {});

      newDevice.on("incoming", (connection: any) => {
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

        connection.on("reject", () => {
          setConnections((prev) =>
            prev.filter(
              (conn) => conn.parameters.CallSid !== conn.parameters.CallSid
            )
          );
          setCallMapping((prev) => {
            const newMapping = { ...prev };
            delete newMapping[connection.parameters.CallSid];
            return newMapping;
          });
        });

        connection.on("cancel", () => {
          setConnections((prev) =>
            prev.filter(
              (conn) => conn.parameters.CallSid !== conn.parameters.CallSid
            )
          );
          setCallMapping((prev) => {
            const newMapping = { ...prev };
            delete newMapping[connection.parameters.CallSid];
            return newMapping;
          });
        });

        connection.on("disconnect", async () => {
          const callSid = connection.parameters.CallSid;
          activeConnections.delete(callSid);
          setConnections((currentConnections) =>
            currentConnections.filter(
              (conn) => conn.parameters.CallSid !== callSid
            )
          );
          setCallMapping((prev) => {
            const newMapping = { ...prev };
            delete newMapping[connection.parameters.CallSid];
            return newMapping;
          });
        });

        //  add logic to fetch lead information with phone number
        setCallMapping((prev) => ({
          ...prev,
          [connection.parameters.CallSid]: {
            leadId: "123",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: connection.parameters.From,
          },
        }));
      });

      newDevice.on("offline", async (device: any) => {
        const accessToken = await refreshToken();
        if (accessToken) {
          device.setup(accessToken);
          setDevice(device);
        }
      });

      setDevice(newDevice);
    } catch (err) {}
  };

  const handleDial = (phoneNumber: string) => {
    // TODO: Add logic to get lead information with parameter
    if (!device || !phoneNumber) return;

    const formattedNumber = formatToE164(phoneNumber);
    if (!formattedNumber) {
      return;
    }

    setShowDialPad(false);

    const outgoingConnection = device.connect({ To: phoneNumber });
    setConnections((prev: any[]) => [...prev, outgoingConnection]);

    outgoingConnection.on("accept", () => {
      const CallSid = outgoingConnection.parameters.CallSid;
      // TODO: Add logic to get lead information
      setCallMapping((prev) => ({
        ...prev,
        [CallSid]: {
          leadId: "12345",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: phoneNumber,
        },
      }));
    });

    outgoingConnection.on("disconnect", async (conn: any) => {
      setConnections((prev) =>
        prev.filter(
          (connection) =>
            connection.parameters.CallSid !== conn.parameters.CallSid
        )
      );
    });

    outgoingConnection.on("closed", (conn: any) => {
      setConnections((prev) =>
        prev.filter(
          (connection) =>
            connection.parameters.CallSid !== conn.parameters.CallSid
        )
      );
    });

    outgoingConnection.on("cancel", (conn: any) => {
      setConnections((prev) =>
        prev.filter(
          (connection) =>
            connection.parameters.CallSid !== conn.parameters.CallSid
        )
      );
    });

    outgoingConnection.on("ringing", (conn: any) => {});
  };

  const refreshToken = async () => {
    try {
      if (me?.phone) {
        return;
      }
      const response = await twilioApi.get(`/token/${me?.phone}`);
      const data: TokenResponse = response.data;
      return data.token;
    } catch (err) {}
  };

  return (
    <TwilioContext.Provider
      value={{
        device,
        callMapping,
        connections,
        showDialPad,
        setCallMapping,
        handleDial,
        setShowDialPad,
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
