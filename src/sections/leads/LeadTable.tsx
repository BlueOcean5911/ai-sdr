import CheckBox from "@/components/extends/CheckBox";
import { useLeadFilter } from "@/contexts/FilterLeadContext";
import { useLeadSelection } from "@/contexts/LeadSelectionContext";
import { contain } from "@/utils/string";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/extends/Pagination/Pagination";
import { CountModel, LeadProps } from "@/types";
import { handleError, runService } from "@/utils/service_utils";
import {
  deleteLead,
  getLeads,
  getLeadTotalCount,
  LeadModel,
  LeadModelWithCompanyModel,
} from "@/services/leadService";
import Link from "next/link";
import LeadOverview from "./LeadOverview";
import { FaLinkedinIn } from "react-icons/fa";
import CreateLead from "./CreateLead";
import { toast } from "react-toastify";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";

const LeadTable = () => {
  const { leadFilterConfig } = useLeadFilter();
  const {
    totalLeads,
    setTotalLeads,
    savedLeads,
    setSavedLeads,
    selectedLeads,
    setSelectedLeads,
  } = useLeadSelection();

  const [create, setCreate] = useState(false);
  const [overview, setOverview] = useState(false);
  const [selected, setSelected] = useState<LeadModelWithCompanyModel>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [allSelected, setAllSelected] = useState(false);
  const searchParams = useSearchParams();

  const fetchLeads = (targeted: boolean = false) => {
    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    runService(
      {
        offset,
        limit,
        targeted,
        jobTitle: leadFilterConfig.title,
        companyName: leadFilterConfig.company,
        location: leadFilterConfig.location,
        industry: leadFilterConfig.industry,
      },
      getLeads,
      (data) => {
        console.log("leads data", data);
        setTotalLeads([...data]); // if total changed, leads will update
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
        jobTitle: leadFilterConfig.title,
        companyName: leadFilterConfig.company,
        location: leadFilterConfig.location,
        industry: leadFilterConfig.industry,
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
        } else toast.error("Something went wrong.");
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

  return (
    <>
      <div className="flex-1 flex flex-col overflow-auto">
        <CreateLead open={create} lead={selected} handleClose={handleClose} />
        <LeadOverview
          show={overview}
          lead={selected}
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
                    Name
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
                  Action
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Job Title
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Company Location
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
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-72"
                >
                  Keywords
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {totalLeads.map((lead: LeadModelWithCompanyModel) => (
                <tr
                  key={lead.id}
                  className="cursor-pointer even:bg-blue-50 hover:bg-gray-300 "
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
                        className="hover:underline hover:text-blue-500"
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
                  {/* <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                    {lead.name}
                  </td> */}
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
                    <a
                      className="hover:underline hover:text-blue-900"
                      href={`companies/${lead.company?.id}`}
                    >
                      {lead.company?.name}
                    </a>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                    {lead.company?.city}, {lead.company?.state}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                    {lead.company?.size}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                    {lead.company?.industry}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                    <div className="flex gap-2 min-w-32 flex-wrap">
                      {lead.company?.keywords
                        ?.split(",")
                        .slice(0, 3)
                        .map((keyword) => (
                          <span className="p-1 px-2 border border-blue-500 rounded-full text-xs capitalize min-w-16 text-center">
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
                            place="top"
                            style={
                              {
                                // backgroundColor: "rgb(255, 255, 255)",
                                // color: "#222",
                              }
                            }
                          >
                            <div className="flex gap-2 flex-wrap max-w-72 justify-center">
                              {lead.company?.keywords
                                ?.split(",")
                                .map((keyword) => (
                                  <span className="p-1 px-2 border border-white text-white rounded-full text-xs capitalize  min-w-16 text-center">
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

export default LeadTable;
