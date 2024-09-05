import { useCadenceFilter } from "@/contexts/FilterCadenceContext";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const CadenceToolbar = () => {
  const { cadenceFilterConfig, setCadenceFilterConfig } = useCadenceFilter();

  return (
    <>
      <div className="flex items-center gap-2 border-b-1 border-gray-100 py-1 text-sm">
        <button
          className="flex items-center gap-2 border-2 border-gray-300 py-1 px-3 rounded-md hover:bg-gray-200"
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
      </div>
    </>
  );
};

export default CadenceToolbar;
