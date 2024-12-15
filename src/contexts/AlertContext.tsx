"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
// import { toast } from "react-toastify";

import { wsService } from "@/services/websocketService";
import { useAuth } from "@/contexts/AuthContext";
import { AlertModel, deleteAlert, getAlerts } from "@/services/alertService";
import { handleError, runService } from "@/utils/service_utils";

interface AlertContextType {
  loading: boolean;
  alerts: AlertModel[] | [];
  setAlerts: (alerts: AlertModel[]) => void;
  handleDelete: (id: string | undefined) => void;
  handleSelectAll: () => void;
  handleMarkAsRead: (id: string | undefined) => void;
  handleMarkAsUnread: (id: string | undefined) => void;
  handleToggleSelect: (id: string) => void;
  getSelectedCount: () => number;
  isSemiSelected: boolean;
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
  const [isSemiSelected, setIsSemiSelected] = useState(false);

  const { isAuthenticated, token } = useAuth();

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

  // const handleDeleteAlert = (alertId: string) => {
  //   runService(
  //     alertId,
  //     deleteAlert,
  //     () => {
  //       if (wsService.getStatus() === "disconnected") {
  //         setAlerts(alerts?.filter((alert) => alert.id !== alertId));
  //         toast.success("Alert deleted successfully!");
  //       }
  //     },
  //     (status, error) => {
  //       handleError(status, error);
  //     }
  //   );
  // };

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    fetchAlerts();
    wsService.connect(token);

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
  }, [isAuthenticated, token]);

  const handleSelectAll = useCallback(() => {
    setAlerts((prevAlerts) => {
      const allSelected = prevAlerts.every((alert) => alert.isSelected);
      return prevAlerts.map((alert) => ({
        ...alert,
        isSelected: !allSelected,
      }));
    });
  }, []);

  const handleMarkAsRead = useCallback((id: string | undefined) => {
    if (id)
      setAlerts((prevAlerts) =>
        prevAlerts.map((alert) =>
          alert.id === id
            ? { ...alert, isRead: true, isSelected: false }
            : alert
        )
      );
    else
      setAlerts((prevAlerts) =>
        prevAlerts.map((alert) =>
          alert.isSelected
            ? { ...alert, isRead: true, isSelected: false }
            : alert
        )
      );
  }, []);

  const handleMarkAsUnread = useCallback((id: string | undefined) => {
    if (id)
      setAlerts((prevAlerts) =>
        prevAlerts.map((alert) =>
          alert.id === id
            ? { ...alert, isRead: false, isSelected: false }
            : alert
        )
      );
    else
      setAlerts((prevAlerts) =>
        prevAlerts.map((alert) =>
          alert.isSelected
            ? { ...alert, isRead: false, isSelected: false }
            : alert
        )
      );
  }, []);

  const handleDelete = useCallback((id: string | undefined) => {
    if (id)
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    else
      setAlerts((prevAlerts) =>
        prevAlerts.filter((alert) => !alert.isSelected)
      );
  }, []);

  const handleToggleSelect = useCallback((id: string) => {
    setAlerts((prevAlerts) => {
      const newAlerts = prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, isSelected: !alert.isSelected } : alert
      );
      return newAlerts;
    });
  }, []);

  const getSelectedCount = useCallback(() => {
    const allSelected = alerts.every((alert) => alert.isSelected);
    const someSelected = alerts.some((alert) => alert.isSelected);
    setIsSemiSelected(!allSelected && someSelected);
    return alerts.filter((alert) => alert.isSelected).length;
  }, [alerts]);

  return (
    <AlertContext.Provider
      value={{
        loading,
        alerts,
        setAlerts,
        handleDelete,
        handleSelectAll,
        handleMarkAsRead,
        handleMarkAsUnread,
        handleToggleSelect,
        getSelectedCount,
        isSemiSelected,
      }}
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
