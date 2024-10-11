import { useContactFilter } from "@/contexts/FilterContactContext";
import { ContactInCadenceStatistics } from "@/services/contactsService";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const stageDict: Record<string, string> = {
  totalCount: "Total",
  coldCount: "Cold",
  approachingCount: "Approaching",
  repliedCount: "Replied",
  interestedCount: "Interested",
  notInterestedCount: "Not Interested",
  unResponsiveCount: "Unresponsive",
  doNotContactCount: "Do Not Contact",
  badDataCount: "Bad Data",
  changedJobCount: "Changed Job",
  // openDealCount: "Open Deal",
};

// { label: "Cold", count: 6 },
// { label: "Approaching", count: 1 },
// { label: "Replied", count: 0 },
// { label: "Interested", count: 0 },
// { label: "Not Interested", count: 0 },
// { label: "Unresponsive", count: 1 },
// { label: "Do Not Contact", count: 0 },
// { label: "Bad Data", count: 1 },
// { label: "Changed Job", count: 0 },
// { label: "Open", count: 0 },
// { label: "Open Deal", count: 0 },
// { label: "Unqualified", count: 0 },
// { name: "All in Progress", count: 7 },
// { name: "All Succeeded Stage", count: 0 },
// { name: "All Failed Stage", count: 1 },

const ContactToolbar = ({ data }: { data: any }) => {
  const { contactFilterConfig, setContactFilterConfig } = useContactFilter();
  return (
    <div className="w-full flex items-center gap-2 border-b border-gray-100 text-sm overflow-auto">
      <button
        className="min-w-32 flex justify-center items-center gap-2 border-2 border-gray-300 py-1 px-2 rounded-md hover:bg-gray-200"
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
          {Object.keys(stageDict).map((stage: any) => (
            <div
              key={stage}
              className="min-w-20 max-w-28 py-1 flex flex-col text-xs text-center cursor-pointer border-b hover:bg-gray-100 hover:border-b-blue-600"
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
