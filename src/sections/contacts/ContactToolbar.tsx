import { useContactFilter } from "@/contexts/FilterContactContext";
import { classNames } from "@/utils";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const stageDict: Record<string, string> = {
  totalCount: "Total",
  coldCount: "Cold",
  approachingCount: "Approaching",
  repliedCount: "Replied",
  interestedCount: "Interested",
  notInterestedCount: "Not Interested",
  unresponsiveCount: "Unresponsive",
  doNotContactCount: "Do Not Contact",
  badDataCount: "Bad Data",
  changedJobCount: "Changed Job",
  // openDealCount: "Open Deal",
};

const ContactToolbar = ({ data }: { data: any }) => {
  const { contactFilterConfig, setContactFilterConfig } = useContactFilter();
  return (
    <div className="w-full flex items-center gap-2 border-b border-gray-100 text-sm overflow-auto justify-between">
      <button
        className="btn-secondary"
        onClick={() => {
          if (contactFilterConfig.isOpen) {
            setContactFilterConfig({ ...contactFilterConfig, isOpen: false });
          } else {
            setContactFilterConfig({ ...contactFilterConfig, isOpen: true });
          }
        }}
      >
        <AdjustmentsHorizontalIcon className="w-4 h-4" />
        {contactFilterConfig.isOpen ? (
          <span>Hide Filters</span>
        ) : (
          <span>Show Filters</span>
        )}
      </button>
      <div className="flex gap-2 overflow-auto">
        <div className="flex-1 overflow-auto flex gap-2">
          {Object.keys(stageDict).map((stage: string) => (
            <div
              key={stage}
              className={classNames(
                "min-w-20 max-w-28 py-1 flex flex-col text-xs text-center cursor-pointer border-b hover:bg-gray-100 hover:border-b-blue-600",
                (stage === "totalCount" &&
                  contactFilterConfig.stage === undefined) ||
                  stage.replace("Count", "") === contactFilterConfig.stage
                  ? "border-b-blue-500 bg-gray-100"
                  : "hover:bg-gray-100 hover:border-b-blue-500"
              )}
              onClick={() =>
                setContactFilterConfig({
                  ...contactFilterConfig,
                  stage:
                    stage === "totalCount"
                      ? undefined
                      : stage.replace("Count", ""),
                })
              }
            >
              <span className="text-inherit">{data ? data[stage] : "-"}</span>
              <span className="text-inherit text-nowrap overflow-hidden">
                {stageDict[stage]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactToolbar;
