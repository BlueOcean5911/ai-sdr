import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaLinkedinIn } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

import CreateLead from "./CreateLead";
import SelectPhone from "./SelectPhone";
import LeadOverview from "./LeadOverview";
import CheckBox from "@/components/extends/CheckBox";
import Pagination from "@/components/extends/Pagination/Pagination";
import SortableHeader from "@/components/ui/SortableHeader";
import Loading from "@/components/Loading";

import {
  deleteLead,
  getLeads,
  getLeadTotalCount,
  LeadModel,
  LeadModelWithCompanyModel,
} from "@/services/leadService";
import { useLeadFilter } from "@/contexts/FilterLeadContext";
import { useLeadSelection } from "@/contexts/LeadSelectionContext";

import { handleError, runService } from "@/utils/service_utils";
import { getFormattedAddress } from "@/utils/format";
import { CountModel } from "@/types";
import { Building2, MapPin, Users } from "lucide-react";

const LeadTable = () => {
  const { leadFilterConfig, setLeadFilterConfig } = useLeadFilter();
  const { totalLeads, setTotalLeads, selectedLeads, setSelectedLeads } =
    useLeadSelection();

  const [create, setCreate] = useState(false);
  const [overview, setOverview] = useState(false);
  const [selected, setSelected] = useState<LeadModelWithCompanyModel>();
  const [selectPhone, setSelectPhone] = useState<boolean>(false);

  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [allSelected, setAllSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const fetchLeads = (targeted: boolean = false) => {
    setLoading(true);
    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    runService(
      {
        offset,
        limit,
        targeted,
        filter: leadFilterConfig,
      },
      getLeads,
      (data) => {
        console.log("leads data", data);
        setTotalLeads([...data]); // if total changed, leads will update
        setLoading(false);
      },
      (status, error) => {
        handleError(status, error);
        setLoading(false);
      }
    );
  };

  const fetchTotalCount = (targeted: boolean = false) => {
    runService(
      {
        targeted,
        filter: leadFilterConfig,
      },
      getLeadTotalCount,
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
    fetchLeads();
  }, []);

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams);
    if (currentParams.targeted) {
      fetchTotalCount(true);
      fetchLeads(true);
    } else {
      fetchTotalCount();
      fetchLeads(false);
    }
  }, [leadFilterConfig, searchParams, currentPage, pageSize]);

  const handleAllSelected = (id: any, checked: boolean) => {
    if (checked) {
      setSelectedLeads(totalLeads.map((lead: any) => lead));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleEdit = (lead: LeadModel) => {
    setSelected(lead);
    setCreate(true);
  };

  const handleDelete = (leadId: string) => {
    runService(
      leadId,
      deleteLead,
      (data) => {
        if (data.success === true) {
          toast.success("Lead updated successfully");
          fetchTotalCount();
          fetchLeads();
        } else {
          toast.error("Something went wrong.");
        }
        handleClose();
      },
      (status, error) => {
        console.log(status, error);
        toast.error(error);
      }
    );
  };

  const handleClose = () => {
    setCreate(false);
    setSelected(undefined);
  };

  const handleChangeSort = (label: string) => {
    console.log(label);
    if (leadFilterConfig.orderBy === label)
      setLeadFilterConfig((config) => {
        return {
          ...config,
          isAscending: !config.isAscending,
        };
      });
    else
      setLeadFilterConfig((config) => {
        return {
          ...config,
          orderBy: label,
          isAscending: true,
        };
      });
  };

  const handleCall = (lead: LeadModel) => {
    setSelected(lead);
    setSelectPhone(true);
  };

  return (
    <>
      <div className="flex-1 flex flex-col overflow-auto">
        <CreateLead open={create} lead={selected} handleClose={handleClose} />
        <SelectPhone
          open={selectPhone}
          lead={selected}
          handleClose={() => setSelectPhone(false)}
        />
        <LeadOverview
          show={overview}
          lead={selected}
          handleClose={() => setOverview(false)}
        />
        {/* Table */}
        <div className="flex flex-1 flex-col w-full align-middle border rounded-md overflow-auto">
          {loading ? (
            <Loading />
          ) : (
            <table className="flex-1 w-full">
              <thead className="sticky top-0 z-10 bg-gray-50 shadow-md">
                <tr className="text-nowrap">
                  <th
                    scope="col"
                    className="flex gap-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-3"
                  >
                    <CheckBox
                      id="All Selection"
                      content=""
                      checked={allSelected}
                      onChange={(id, checked) => {
                        handleAllSelected(id, checked);
                        setAllSelected(!allSelected);
                      }}
                    />
                    <SortableHeader
                      label="full name"
                      value="firstName"
                      orderBy={leadFilterConfig.orderBy}
                      isAscending={leadFilterConfig.isAscending}
                      handleChangeSort={handleChangeSort}
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-3 text-left text-sm font-semibold text-gray-500"
                  >
                    Action
                  </th>
                  <th>
                    <SortableHeader
                      label="job title"
                      value="title"
                      orderBy={leadFilterConfig.orderBy}
                      isAscending={leadFilterConfig.isAscending}
                      handleChangeSort={handleChangeSort}
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-3 text-left text-sm font-semibold text-gray-500"
                  >
                    Lead Location
                  </th>
                  <th
                    scope="col"
                    className="px-3 text-left text-sm font-semibold text-gray-500"
                  >
                    Company
                  </th>

                  <th
                    scope="col"
                    className="px-3 text-left text-sm font-semibold text-gray-500"
                  >
                    Employees
                  </th>
                  <th
                    scope="col"
                    className="px-3 text-left text-sm font-semibold text-gray-500"
                  >
                    Industry
                  </th>
                  <th
                    scope="col"
                    className="px-3 text-left text-sm font-semibold text-gray-500 min-w-72"
                  >
                    Keywords
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {totalLeads.map((lead: LeadModelWithCompanyModel) => (
                  <tr
                    key={lead.id}
                    className="h-20 cursor-pointer even:bg-blue-50 hover:bg-gray-300 "
                  >
                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      <div className="flex items-center gap-2">
                        <CheckBox
                          id={lead.id}
                          key={lead.id}
                          content=""
                          value={lead}
                          checked={selectedLeads.find(
                            (itemLead: any) => itemLead.id === lead.id
                          )}
                          onChange={(changedLead, checked) => {
                            if (!checked) {
                              setSelectedLeads(
                                selectedLeads.filter(
                                  (lead: any) => changedLead.id !== lead.id
                                )
                              );
                            } else {
                              console.log(checked);
                              setSelectedLeads([...selectedLeads, changedLead]);
                            }
                          }}
                        />
                        <span
                          className="hover:underline text-blue-900 font-bold"
                          onClick={() => {
                            setSelected(lead);
                            setOverview(true);
                          }}
                        >
                          {lead.firstName} {lead.lastName}
                        </span>
                        <Link href={`${lead?.linkedin}`}>
                          <FaLinkedinIn className="w-6 h-6 p-1 rounded-md border bg-white fill-blue-500" />
                        </Link>
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
                          className="flex flex-col w-16 origin-top-right bg-white rounded-md shadow-md border-2 border-white/5 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
                        >
                          <MenuItem>
                            <button
                              className="p-2 text-xs font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100"
                              onClick={() => handleCall(lead)}
                            >
                              Call
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              className="p-2 text-xs font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100"
                              onClick={() => handleEdit(lead)}
                            >
                              Edit
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              className="p-2 text-xs font-semibold flex w-full items-center rounded-md data-[focus]:bg-blue-100"
                              onClick={() => handleDelete(lead.id)}
                            >
                              Delete
                            </button>
                          </MenuItem>
                        </MenuItems>
                      </Menu>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      {lead.title}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      {getFormattedAddress(lead.city, lead.state, lead.country)}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      <a
                        className="hover:underline hover:text-blue-900"
                        href={`companies/${lead.company?.id}`}
                      >
                        <span className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-500 inline-block" />
                          {lead.company?.name}
                        </span>
                      </a>
                      <span className="flex items-center gap-2 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        {getFormattedAddress(
                          lead.company?.city,
                          lead.company?.state,
                          lead.company?.country
                        )}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        {lead.company?.size}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      {lead.company?.industry}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      <div className="flex gap-2 min-w-32 flex-wrap">
                        {lead.company?.keywords
                          ?.split(",")
                          .slice(0, 3)
                          .map((keyword, idx) => (
                            <span
                              key={idx}
                              className="px-2 border bg-blue-100 text-blue-800 rounded-full text-xs capitalize min-w-16 text-center"
                            >
                              {keyword}
                            </span>
                          ))}
                        {(lead.company?.keywords?.split(",")?.length || 0) >
                          3 && (
                          <>
                            <a
                              className="max-w-48"
                              data-tooltip-id={`my-tooltip-company-keywords-${lead.company?.id}`}
                            >
                              <span className="text-gray-500">
                                +
                                {(lead.company?.keywords?.split(",")?.length ||
                                  0) - 3}{" "}
                                more
                              </span>
                            </a>
                            <Tooltip
                              id={`my-tooltip-company-keywords-${lead.company?.id}`}
                              className="z-50"
                            >
                              <div className="flex gap-2 flex-wrap max-w-72 justify-center">
                                {lead.company?.keywords
                                  ?.split(",")
                                  .map((keyword, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 border-white border rounded-full text-[10px] capitalize min-w-16 text-center text-white"
                                    >
                                      {keyword}
                                    </span>
                                  )) || <></>}
                              </div>
                            </Tooltip>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                <tr></tr>
              </tbody>
            </table>
          )}
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

export default LeadTable;
