"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { wsService } from "@/services/websocketService";
import { getRememberMe, getToken } from "@/services/authService";
import { AlertModel, deleteAlert, getAlerts } from "@/services/alertService";
import { handleError, runService } from "@/utils/service_utils";

interface AlertContextType {
  loading: boolean;
  alerts: AlertModel[] | [];
  setAlerts: (alerts: AlertModel[]) => void;
  handleDeleteAlert: (id: string) => void;
}

interface MessageType {
  type: string;
  data: any;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<AlertModel[]>([]);
  const router = useRouter();

  const token = getRememberMe() || getToken();

  const fetchAlerts = () => {
    setLoading(true);
    runService(
      undefined,
      getAlerts,
      (data) => {
        setAlerts(data);
        setLoading(false);
      },
      (status, error) => {
        handleError(status, error);
        setLoading(false);
      }
    );
  };

  const handleDeleteAlert = (alertId: string) => {
    runService(
      alertId,
      deleteAlert,
      () => {
        if (wsService.getStatus() === "disconnected") {
          setAlerts(alerts?.filter((alert) => alert.id !== alertId));
          toast.success("Alert deleted successfully!");
        }
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    fetchAlerts();
    wsService.connect();

    const createHandler = (message: MessageType) => {
      setAlerts((alerts) => [...(alerts || []), message.data]);
    };

    const updateHandler = (message: MessageType) => {
      setAlerts((alerts) =>
        alerts?.map((alert) =>
          alert.id === message.data.id ? message.data : alert
        )
      );
    };

    const deleteHandler = (message: MessageType) => {
      setAlerts((alerts) =>
        alerts?.filter((alert) => alert.id !== message.data.id)
      );
    };

    wsService.subscribe("CREATE_ALERT", createHandler);
    wsService.subscribe("UPDATE_ALERT", updateHandler);
    wsService.subscribe("DELETE_ALERT", deleteHandler);

    return () => {
      wsService.unsubscribe("CREATE_ALERT", createHandler);
      wsService.unsubscribe("UPDATE_ALERT", updateHandler);
      wsService.unsubscribe("DELETE_ALERT", deleteHandler);
    };
  }, [token, router]);

  return (
    <AlertContext.Provider
      value={{ loading, alerts, setAlerts, handleDeleteAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within a AlertContextProvider");
  }
  return context;
};
