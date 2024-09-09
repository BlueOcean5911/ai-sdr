import { useEmailFilter } from "@/contexts/FilterEmailContext";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const EmailToolbar = () => {
  const { emailFilterConfig, setEmailFilterConfig } = useEmailFilter();

  return (
    <div className="w-full flex items-center gap-2 border-b border-gray-100 text-sm overflow-auto">
      <button
        className="min-w-32 px-2 py-1.5 flex justify-center items-center gap-2 border-2 border-gray-300 rounded-md hover:bg-gray-200"
        onClick={() => {
          if (emailFilterConfig.isOpen) {
            setEmailFilterConfig({ ...emailFilterConfig, isOpen: false });
          } else {
            setEmailFilterConfig({ ...emailFilterConfig, isOpen: true });
          }
        }}
      >
        <AdjustmentsHorizontalIcon className="w-4 h-4" />
        {emailFilterConfig.isOpen ? (
          <span>Hide Filters</span>
        ) : (
          <span>Show Filters</span>
        )}
      </button>
      <div className="w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer text-blue-500 border-b bg-gray-100 border-b-blue-500">
        <span className="text-inherit">17</span>
        <span className="text-inherit">Total</span>
      </div>
      <div className="w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b hover:bg-gray-100 hover:border-b-blue-500">
        <span className="text-inherit">5</span>
        <span className="text-inherit">Drafted</span>
      </div>
      <div className="w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b hover:bg-gray-100 hover:border-b-blue-500">
        <span className="text-inherit">4</span>
        <span className="text-inherit">Delivered</span>
      </div>
      <div className="w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b hover:bg-gray-100 hover:border-b-blue-500">
        <span className="text-inherit">4</span>
        <span className="text-inherit">Not Opened</span>
      </div>
      <div className="w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b hover:bg-gray-100 hover:border-b-blue-500">
        <span className="text-inherit">1</span>
        <span className="text-inherit">Bounced</span>
      </div>
      <div className="w-28 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b hover:bg-gray-100 hover:border-b-blue-500">
        <span className="text-inherit">7</span>
        <span className="text-inherit">Not Sent</span>
      </div>
    </div>
  );
};

export default EmailToolbar;
