import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Ensure this imports correctly
import { AlertModel } from "@/services/alertService";
import { Check, Trash, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AlertListHeaderProps {
  alerts: AlertModel[];
  onSelectAll: () => void;
  onMarkAsRead: (id: string | undefined) => void;
  onMarkAsUnread: (id: string | undefined) => void;
  onDelete: (id: string | undefined) => void;
  selectedCount: number;
  totalCount: number;
  isSemiSelected: boolean;
}

export function AlertListHeader({
  alerts,
  onSelectAll,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
  selectedCount,
  totalCount,
  isSemiSelected,
}: AlertListHeaderProps) {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [readAble, setReadable] = useState(false);
  const [unreadAble, setUnreadable] = useState(false);

  useEffect(() => {
    if (alerts && alerts.length > 0) {
      setReadable(alerts.some((alert) => alert.isSelected && !alert.isRead));
      setUnreadable(alerts.some((alert) => alert.isSelected && alert.isRead));
    } else {
      setReadable(false);
      setUnreadable(false);
    }
  }, [alerts]);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isSemiSelected;
    }
  }, [isSemiSelected]);

  return (
    <div className="w-full px-6 py-4 flex flex-row items-center gap-4 border-b bg-gray-100">
      <Checkbox
        id="select-all"
        // Change the prop name if necessary
        onChange={onSelectAll} // Use onChange or the correct prop name
        checked={selectedCount === totalCount && totalCount > 0}
        ref={checkboxRef}
      />
      <label
        htmlFor="select-all"
        className="w-20 text-gray-700 font-medium text-sm"
      >
        {selectedCount > 0 ? `${selectedCount} selected` : "Select All"}
      </label>
      <Button
        variant="outline"
        className="flex items-center"
        size="sm"
        onClick={() => onMarkAsRead(undefined)}
        disabled={!readAble}
      >
        <Check className="w-4 h-4 mr-2" />
        Mark as read
      </Button>
      <Button
        variant="outline"
        className="flex items-center"
        size="sm"
        onClick={() => onMarkAsUnread(undefined)}
        disabled={!unreadAble}
      >
        <Mail className="w-4 h-4 mr-2" />
        Mark as unread
      </Button>
      <Button
        variant="outline"
        className="flex items-center"
        size="sm"
        onClick={() => onDelete(undefined)}
        disabled={selectedCount === 0}
      >
        <Trash className="w-4 h-4 mr-2" />
        Delete
      </Button>
    </div>
  );
}
