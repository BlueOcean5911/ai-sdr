import { MAILING_STATE } from "@/types/enums";
import { Calendar, Check, Mail, Eye, MessageCircle } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { MailingModel } from "@/services/mailingService";
import { formatDateTimeReadable } from "@/utils/format";

export default function EmailTrackingStatus({
  mailing,
}: {
  mailing: MailingModel;
}) {
  console.log("here--------->", mailing);
  const timestamps: Record<string, string> = {
    [MAILING_STATE.SCHEDULED]: mailing.scheduledAt,
    [MAILING_STATE.DELIVERED]: mailing.deliveredAt,
    [MAILING_STATE.OPENED]: mailing.openedAt,
    [MAILING_STATE.REPLIED]: mailing.repliedAt,
    [MAILING_STATE.BOUNCED]: mailing.bouncedAt,
  };

  const states = [
    { key: MAILING_STATE.SCHEDULED, icon: Calendar, label: "Scheduled" },
    { key: MAILING_STATE.BOUNCED, icon: Mail, label: "Sent" },
    { key: MAILING_STATE.DELIVERED, icon: Check, label: "Delivered" },
    { key: MAILING_STATE.OPENED, icon: Eye, label: "Opened" },
    { key: MAILING_STATE.REPLIED, icon: MessageCircle, label: "Replied" },
  ];

  const currentStateIndex = states.findIndex(
    (s) => s.key === mailing.mailingStatus
  );

  return (
    <div className="flex items-center p-4 overflow-x-auto">
      {currentStateIndex !== null &&
        states.map((state, index) => {
          const Icon = state.icon;
          const isCompleted = index <= currentStateIndex;
          const isLast = index === states.length - 1;

          return (
            <>
              <div key={state.key} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center gap-1">
                  <a data-tooltip-id={`my-tooltip-${state.key}`}>
                    <div
                      className={`rounded-full p-2 ${
                        isCompleted
                          ? "bg-blue-500 text-green-600"
                          : "border border-gray-500 text-gray-400"
                      }`}
                    >
                      <Icon
                        className={`h-3 w-3 ${
                          isCompleted ? "stroke-white" : ""
                        }`}
                      />
                    </div>
                  </a>
                  <Tooltip id={`my-tooltip-${state.key}`} className="z-50">
                    <span className="text-xs text-white">
                      {state.label}
                      {timestamps[state.key] !== null &&
                        timestamps[state.key] !== undefined &&
                        ` at: ${formatDateTimeReadable(timestamps[state.key])}`}
                    </span>
                  </Tooltip>
                </div>
              </div>
              {!isLast && (
                <div
                  className={`h-[2px] w-3 ${
                    index < currentStateIndex ? "bg-blue-500" : "bg-gray-200"
                  }`}
                />
              )}
            </>
          );
        })}
    </div>
  );
}
