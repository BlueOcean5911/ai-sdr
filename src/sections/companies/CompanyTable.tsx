import CheckBox from "@/components/extends/CheckBox";
import { useCompanyFilter } from "@/contexts/FilterCompanyContext";
import { useCompanySelection } from "@/contexts/CompanySelectionContext";
import { contain } from "@/utils/string";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/extends/Pagination/Pagination";
import { CompanyProps, CountModel } from "@/types";
import { handleError, runService } from "@/utils/service_utils";
import {
  CompanyModel,
  getCompanies,
  getCompanyTotalCount,
} from "@/services/companyService";

const CompanyTable = () => {
  const { companyFilterConfig } = useCompanyFilter();
  const {
    totalCompanies,
    setTotalCompanies,
    savedCompanies,
    setSavedCompanies,
    selectedCompanies,
    setSelectedCompanies,
  } = useCompanySelection();

  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allSelected, setAllSelected] = useState(false);
  const searchParams = useSearchParams();

  // useEffect(() => {
  // console.log("here", totalCompanies);
  // setCompanies([...totalCompanies]);
  // }, [totalCompanies]);

  // useEffect(() => {
  // console.log("companies", companies);
  // }, [companies]);

  const fetchCompanies = (targeted: boolean = false) => {
    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    runService(
      { offset, limit, targeted },
      getCompanies,
      (data) => {
        console.log("company data", data);
        setTotalCompanies(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const fetchTotalCount = (targeted: boolean = false) => {
    runService(
      { targeted },
      getCompanyTotalCount,
      (data: CountModel) => {
        setTotalCount(data?.count ? data?.count : 0);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchTotalCount();
    fetchCompanies();
  }, []);

  useEffect(() => {
    console.log("total count", totalCount);
  }, [totalCount]);

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams);
    if (currentParams.targeted) {
      fetchTotalCount(true);
      fetchCompanies(true);
    } else {
      fetchTotalCount(false);
      fetchCompanies(false);
    }
    setSelectedCompanies([]);
    setAllSelected(false);
  }, [searchParams, currentPage, pageSize]);

  // useEffect(() => {
  //   const filteredCompanies = totalCompanies.filter((company: any) => {
  //     if (
  //       companyFilterConfig.company &&
  //       !contain(company.companyName, companyFilterConfig.company)
  //     ) {
  //       return false;
  //     }
  //     if (
  //       companyFilterConfig.location &&
  //       !contain(company.currentLocation, companyFilterConfig.location)
  //     ) {
  //       return false;
  //     }
  //     return true;
  //   });
  //   setCompanies(filteredCompanies);
  //   console.log("companyFilterConfig: ", companyFilterConfig);
  // }, [companyFilterConfig]);

  const handleAllSelected = (id: any, checked: boolean) => {
    if (checked) {
      setSelectedCompanies(totalCompanies.map((company: any) => company));
    } else {
      setSelectedCompanies([]);
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="min-w-full divide-y divide-gray-300 overflow-auto">
            <thead className="bg-white sticky top-0 z-10">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  <div className="flex gap-2">
                    <CheckBox
                      id="All Selection"
                      content=""
                      checked={allSelected}
                      onChange={(id, checked) => {
                        handleAllSelected(id, checked);
                        setAllSelected(!allSelected);
                      }}
                    />{" "}
                    Company Name
                  </div>
                </th>
                {/* <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Name
                </th> */}
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Current Location
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Employees
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Industry
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {totalCompanies
                // .slice(pageSize * (currentPage - 1), pageSize * currentPage)
                .map((company: CompanyModel) => (
                  <tr
                    key={company.id}
                    className="even:bg-blue-50 hover:bg-gray-300 "
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 rounded-l-md">
                      <div className="flex gap-2">
                        <CheckBox
                          id={company.id}
                          key={company.id}
                          content=""
                          value={company}
                          checked={selectedCompanies.find(
                            (itemCompany: any) => itemCompany.id === company.id
                          )}
                          onChange={(changedCompany, checked) => {
                            if (!checked) {
                              setSelectedCompanies(
                                selectedCompanies.filter(
                                  (company: any) =>
                                    changedCompany.id !== company.id
                                )
                              );
                            } else {
                              console.log(checked);
                              setSelectedCompanies([
                                ...selectedCompanies,
                                changedCompany,
                              ]);
                            }
                          }}
                        />
                        <a
                          className="hover:underline hover:text-blue-900"
                          href={company.linkedin}
                        >
                          {company.name}
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {company.phone}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {company.location}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {company.size}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {company.industry}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end px-16">
          <Pagination
            className="pagination-bar"
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={(pageSize: number, currentPage: number) => {
              setPageSize(pageSize);
              setCurrentPage(currentPage);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyTable;
