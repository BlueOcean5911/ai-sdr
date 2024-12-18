"use client";
import { AlertListHeader } from "@/components/alert/AlertListHeader";
import { AlertItem } from "@/components/alert/AlertItem";
import { useAlert } from "@/contexts/AlertContext";
import Pagination from "@/components/extends/Pagination/Pagination";
import AlertFilter from "@/components/alert/AlertFilter";

export default function Page() {
  const {
    loading,
    alerts,
    isFilterOpen,
    alertFilterConfig,
    setIsFilterOpen,
    setAlertFilterConfig,
    handleDelete,
    handleSelectAll,
    handleMarkAsRead,
    handleMarkAsUnread,
    handleToggleSelect,
    getSelectedCount,
    isSemiSelected,
  } = useAlert();

  const selectedCount = getSelectedCount();

  return (
    <div className="flex flex-1 gap-2 overflow-auto">
      {/* <AlertFilter /> */}
      <div className="flex flex-1 flex-col rounded-lg border shadow-lg bg-white overflow-auto">
        <AlertListHeader
          alerts={alerts}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          onSelectAll={handleSelectAll}
          onMarkAsRead={handleMarkAsRead}
          onMarkAsUnread={handleMarkAsUnread}
          onDelete={handleDelete}
          selectedCount={selectedCount}
          totalCount={alerts.length}
          isSemiSelected={isSemiSelected}
        />
        <div className="flex flex-1 flex-col overflow-auto">
          {loading ? (
            <div className="flex flex-1 justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : alerts.length > 0 ? (
            <div className="flex flex-1 flex-col overflow-auto">
              {alerts.map((alert) => (
                <AlertItem
                  key={alert.id}
                  alert={alert}
                  onDelete={handleDelete}
                  onToggleSelect={handleToggleSelect}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAsUnread={handleMarkAsUnread}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-1 flex-col justify-center items-center text-center gap-4 p-16">
              <h2 className="text-xl font-semibold text-gray-700">
                No new task alerts
              </h2>
              <p className="text-base text-gray-500">
                You're all caught up. New task alerts will appear here.
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-end px-16 border-t">
          <Pagination
            className="pagination-bar"
            totalCount={alerts.length}
            pageSize={alertFilterConfig.limit}
            onPageChange={(pageSize: number, currentPage: number) => {
              setAlertFilterConfig({
                ...alertFilterConfig,
                offset: pageSize * (currentPage - 1),
                limit: pageSize,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
