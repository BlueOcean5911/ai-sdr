import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Circle, Check, Trash, Mail, ArrowRight, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { AlertModel } from "@/services/alertService";
import { getInitials, getRelativeTime } from "@/utils/format";
import { classNames } from "@/utils";
import Link from "next/link";

interface AlertItemProps {
  alert: AlertModel;
  onDelete: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
}

export const AlertItem: React.FC<AlertItemProps> = ({
  alert,
  onDelete,
  onToggleSelect,
  onMarkAsRead,
  onMarkAsUnread,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const getActionColor = (type: string) => {
    switch (type) {
      case "TASK_CREATE":
        return "text-green-600";
      case "TASK_UPDATE":
        return "text-blue-600";
      case "TASK_DELETE":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const isSamePerson = alert.dmler?.id === alert.receptient?.id;
  return (
    <div
      className={classNames(
        "w-full px-1.5 py-4 flex flex-row justify-between items-center gap-2 border-l-2 border-b hover:bg-blue-50 transition-colors duration-200",
        alert.isRead ? "bg-gray-50" : "bg-white",
        alert.isSelected ? "!border-l-blue-600" : "!border-l-white"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-row items-center gap-2 flex-shrink-0">
        <Circle
          className={`w-2 h-2 ${
            alert.isRead
              ? "!stroke-none !fill-none"
              : "!stroke-blue-600 !fill-blue-600"
          } fill-current flex-shrink-0`}
        />
        <Checkbox
          id={`alert-${alert.id}`}
          checked={alert.isSelected}
          onChange={() => onToggleSelect(alert.id)}
          className="flex-shrink-0"
        />
        <div className="flex items-center gap-2 flex-shrink-0">
          <TooltipProvider>
            <Tooltip
              content={`${isSamePerson ? "Doer/Owner" : "Doer"}: ${
                alert.dmler.firstName + " " + alert.dmler.lastName
              }`}
            >
              <TooltipTrigger>
                <div className="p-2 text-sm font-medium text-center rounded-full text-white bg-blue-700 flex items-center justify-center flex-shrink-0">
                  {getInitials(
                    alert.dmler.firstName + " " + alert.dmler.lastName
                  )}
                </div>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
          {!isSamePerson && (
            <>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <TooltipProvider>
                <Tooltip
                  content={`Owner: ${
                    alert.dmler.firstName + " " + alert.dmler.lastName
                  }`}
                >
                  <TooltipTrigger>
                    <div className="p-2 text-sm font-medium text-center rounded-full text-white bg-gray-700 flex items-center justify-center flex-shrink-0">
                      {getInitials(
                        alert.receptient.firstName +
                          " " +
                          alert.receptient.lastName
                      )}
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-xs ${getActionColor(alert.type)}`}>
              {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
            </span>
            {/* <span className="text-sm text-gray-500">Task ID: {alert.id}</span> */}
            {isSamePerson && (
              <TooltipProvider>
                <Tooltip content="Doer/Owner">
                  <TooltipTrigger>
                    <User className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <Link
            href={alert.href}
            className={`font-semibold text-sm truncate hover:underline ${
              alert.isRead ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {alert.title}
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {isHovered ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className="p-2"
              onClick={() => {
                if (!alert.isRead) onMarkAsRead(alert.id);
                router.push(alert.href);
              }}
            >
              <ArrowRight className="w-4 h-4" />
              {/* <span className="sr-only">View Task</span> */}
            </Button>
            {alert.isRead ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMarkAsUnread(alert.id)}
                className="p-2"
              >
                <Mail className="w-4 h-4" />
                {/* <span className="sr-only">Mark as unread</span> */}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMarkAsRead(alert.id)}
                className="p-2"
              >
                <Check className="w-4 h-4" />
                {/* <span className="sr-only">Mark as read</span> */}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(alert.id)}
              className="p-2"
            >
              <Trash className="w-4 h-4" />
              {/* <span className="sr-only">Delete</span> */}
            </Button>
          </>
        ) : (
          <span className="text-sm text-gray-500 text-nowrap">
            {getRelativeTime(alert.createdAt)}
          </span>
        )}
      </div>
    </div>
  );
};
