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
import CompanyOverview from "./CompanyOverview";
import CreateCompany from "./CreateCompany";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

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

  const [create, setCreate] = useState(false);
  const [overview, setOverview] = useState(false);
  const [selected, setSelected] = useState<CompanyModel>();
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
      {
        offset,
        limit,
        targeted,
        company: companyFilterConfig.company,
        location: companyFilterConfig.location,
        industry: companyFilterConfig.industry,
      },
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
      {
        targeted,
        company: companyFilterConfig.company,
        location: companyFilterConfig.location,
        industry: companyFilterConfig.industry,
      },
      getCompanyTotalCount,
      (data: CountModel) => {
        console.log("company total count", data);
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
  }, [companyFilterConfig, searchParams, currentPage, pageSize]);

  const handleAllSelected = (id: any, checked: boolean) => {
    if (checked) {
      setSelectedCompanies(totalCompanies.map((company: any) => company));
    } else {
      setSelectedCompanies([]);
    }
  };

  const handleSave = () => {};

  const handleClose = () => {
    setCreate(false);
    setSelected(undefined);
  };

  return (
    <>
      <div className="flex-1 flex flex-col overflow-auto">
        <CreateCompany
          open={create}
          company={selected}
          handleSave={handleSave}
          handleClose={handleClose}
        />
        <CompanyOverview
          show={overview}
          company={selected}
          handleClose={() => setOverview(false)}
        />
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
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Action
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
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Keywords
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Locaiton
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Stage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {totalCompanies.map((company: CompanyModel) => (
                <tr
                  key={company.id}
                  className="even:bg-blue-50 hover:bg-gray-300 cursor-pointer"
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
                      <span
                        className="flex-1 hover:underline"
                        onClick={() => {
                          setSelected(company);
                          setOverview(true);
                        }}
                      >
                        {company.name}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap text-sm text-gray-500">
                    <Menu>
                      <MenuButton className="">
                        <div className="p-1 border rounded-md bg-white">
                          <EllipsisHorizontalIcon className="w-5 h-5 stroke-gray-500" />
                        </div>
                      </MenuButton>
                      <MenuItems
                        anchor="bottom end"
                        className="flex flex-col w-32 origin-top-right bg-white rounded-md shadow-md border-2 border-white/5 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
                      >
                        <MenuItem>
                          <button
                            className="p-2 text-xs font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100"
                            onClick={() => {
                              setSelected(company);
                              setCreate(true);
                            }}
                          >
                            Edit
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <button className="p-2 text-xs font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100">
                            Delete
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {company.size}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {company.industry}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {company.keywords}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {company.city} {company.state}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {company.stage}
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
