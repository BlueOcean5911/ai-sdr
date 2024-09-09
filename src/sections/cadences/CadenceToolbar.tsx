import { useCadenceFilter } from "@/contexts/FilterCadenceContext";
import {
  AdjustmentsHorizontalIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

const CadenceToolbar = () => {
  const { cadenceFilterConfig, setCadenceFilterConfig } = useCadenceFilter();

  return (
    <>
      <div className="flex justify-between items-center gap-2 border-b-1 border-gray-100 py-1 text-sm">
        <button
          className="min-w-32 px-2 py-1.5 flex justify-center items-center gap-2 border-2 border-gray-300 rounded-md hover:bg-gray-200"
          onClick={() => {
            if (cadenceFilterConfig.isOpen) {
              setCadenceFilterConfig({ ...cadenceFilterConfig, isOpen: false });
            } else {
              setCadenceFilterConfig({ ...cadenceFilterConfig, isOpen: true });
            }
          }}
        >
          <AdjustmentsHorizontalIcon className="w-4 h-4" />
          {cadenceFilterConfig.isOpen ? (
            <span>Hide Filters</span>
          ) : (
            <span>Show Filters</span>
          )}
        </button>
        <div className="p-2 flex-center gap-2 rounded-md bg-blue-500 hover:bg-blue-400 cursor-pointer">
          <PlusCircleIcon className="w-4 h-4 stroke-white" />
          <span className="text-sm text-white">Build Cadence</span>
        </div>
      </div>
    </>
  );
};

export default CadenceToolbar;
