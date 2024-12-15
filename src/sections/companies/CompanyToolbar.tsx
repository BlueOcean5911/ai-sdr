import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCompanySelection } from "@/contexts/CompanySelectionContext";

import { useSearchParams } from "next/navigation";
import { useCompanyFilter } from "@/contexts/FilterCompanyContext";
import {
  CompanyModel,
  updateCompaniesAsTargeted,
} from "@/services/companyService";
import { runService } from "@/utils/service_utils";

const CompanyToolbar = () => {
  const searchParams = useSearchParams();

  const { selectedCompanies, setSelectedCompanies, handleSaveCompanies } =
    useCompanySelection();
  const { companyFilterConfig, setCompanyFilterConfig } = useCompanyFilter();
  const [isSavedView, setIsSavedView] = useState(false);
  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    if (currentParams.targeted) {
      setIsSavedView(true);
    } else {
      setIsSavedView(false);
    }
  });

  const handleSaveCompany = () => {
    if (selectedCompanies.length > 0) {
      handleSaveCompanies(selectedCompanies);
      const companyIds = selectedCompanies.map(
        (company: CompanyModel) => company.id
      );
      runService(
        companyIds,
        updateCompaniesAsTargeted,
        (data) => {
          toast.success("Successfully saved");
        },
        (status, error) => {
          // handleError(status, error);
          toast.error(error);
        }
      );
      setSelectedCompanies([]);
    } else {
      toast.info("Please select one company to save");
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 border-b-1 border-gray-100 p-1 text-sm">
        <button
          className="btn-secondary"
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
          <button className="btn-secondary" onClick={() => handleSaveCompany()}>
            <PlusIcon className="w-4 h-4" /> Save
          </button>
        )}
      </div>
    </>
  );
};

export default CompanyToolbar;
