import { useContactFilter } from "@/contexts/FilterContactContext";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const stageArray = [
  { name: "Tatal", count: 9 },
  { name: "Cold", count: 6 },
  { name: "Approaching", count: 1 },
  { name: "Replied", count: 0 },
  { name: "Interested", count: 0 },
  { name: "Not Interested", count: 0 },
  { name: "Unresponsive", count: 1 },
  { name: "Do Not Contact", count: 0 },
  { name: "Bad Data", count: 1 },
  { name: "Changed Job", count: 0 },
  { name: "Open", count: 0 },
  { name: "Open Deal", count: 0 },
  { name: "Unqualified", count: 0 },
  { name: "All in Progress", count: 7 },
  { name: "All Succeeded Stage", count: 0 },
  { name: "All Failed Stage", count: 1 },
];

const ContactToolbar = () => {
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
      {stageArray.map((stage) => (
        <div className="min-w-20 max-w-28 py-1 flex flex-col text-xs text-center cursor-pointer border-b hover:bg-gray-100 hover:border-b-blue-600">
          <span className="text-inherit">{stage.count}</span>
          <span className="text-inherit text-nowrap overflow-hidden">
            {stage.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ContactToolbar;
