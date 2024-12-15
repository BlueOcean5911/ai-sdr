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
import {
  AlertModel,
  deleteAlert,
  getAlerts,
  updateAlert,
  UpdateAlertModel,
} from "@/services/alertService";
import { handleError, runService } from "@/utils/service_utils";

interface AlertContextType {
  loading: boolean;
  alerts: AlertModel[] | [];
  currentPage: number;
  pageSize: number;
  setAlerts: (alerts: AlertModel[]) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
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
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { isAuthenticated, token } = useAuth();

  const fetchAlerts = () => {
    setLoading(true);
    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    runService(
      {
        offset: offset,
        limit: limit,
      },
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
        }
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const handleUpdateAlert = (alertId: string, updateData: UpdateAlertModel) => {
    runService(
      { alertId, updateData },
      updateAlert,
      (data) => {
        if (data) {
          setAlerts(
            alerts.map((alert) =>
              alert.id === alertId
                ? { ...alert, isRead: updateData.isRead }
                : alert
            )
          );
        }
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

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

  const handleMarkAsRead = useCallback(
    (id: string | undefined) => {
      if (id) {
        handleUpdateAlert(id, { isRead: true });
      } else
        alerts.map((alert) => {
          if (alert.isSelected) handleUpdateAlert(alert.id, { isRead: true });
        });
    },
    [alerts]
  );

  const handleMarkAsUnread = useCallback(
    (id: string | undefined) => {
      if (id) {
        handleUpdateAlert(id, { isRead: false });
      } else
        alerts.map((alert) => {
          if (alert.isSelected) handleUpdateAlert(alert.id, { isRead: false });
        });
    },
    [alerts]
  );

  const handleDelete = useCallback((id: string | undefined) => {
    if (id) handleDeleteAlert(id);
    else
      alerts.map((alert) => {
        if (alert.isSelected) handleDeleteAlert(alert.id);
      });
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
        pageSize,
        currentPage,
        setAlerts,
        setCurrentPage,
        setPageSize,
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
