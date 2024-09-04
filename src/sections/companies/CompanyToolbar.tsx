import {
  CheckCircleIcon,
  EnvelopeIcon,
  MinusCircleIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCompanySelection } from "@/contexts/CompanySelectionContext";

import { useSearchParams } from "next/navigation";
import { useCompanyFilter } from "@/contexts/FilterCompanyContext";
import { useRouter } from "next/navigation";

const CompanyToolbar = () => {
  const searchParams = useSearchParams();

  const { selectedCompanies, setSelectedCompanies, handleSaveCompanies } =
    useCompanySelection();
  const { companyFilterConfig, setCompanyFilterConfig } = useCompanyFilter();
  const [isSavedView, setIsSavedView] = useState(false);
  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    if (currentParams.prospectedByCurrentTeam) {
      setIsSavedView(true);
    } else {
      setIsSavedView(false);
    }
  });

  const handleSaveCompany = () => {
    if (selectedCompanies.length > 0) {
      handleSaveCompanies(selectedCompanies);
      setSelectedCompanies([]);
      toast.success("Companies saved successfully");
    } else {
      toast.info("Please select one company to save");
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 border-b-1 border-gray-100 py-1 text-sm">
        <button
          className="flex items-center gap-2 border-2 border-gray-300 py-1 px-3 rounded-md hover:bg-gray-200"
          onClick={() => {
            if (companyFilterConfig.isOpen) {
              setCompanyFilterConfig({ ...companyFilterConfig, isOpen: false });
            } else {
              setCompanyFilterConfig({ ...companyFilterConfig, isOpen: true });
            }
          }}
        >
          {companyFilterConfig.isOpen ? (
            <span>Hide Filters</span>
          ) : (
            <span>Show Filters</span>
          )}
        </button>
        {!isSavedView && (
          <button
            className="flex items-center gap-2 border-2 border-gray-300 py-1 px-3 rounded-md hover:bg-gray-200"
            onClick={() => handleSaveCompany()}
          >
            <PlusIcon className="w-4 h-4" /> Save
          </button>
        )}
      </div>
    </>
  );
};

export default CompanyToolbar;
