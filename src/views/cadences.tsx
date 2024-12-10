"use client";

import { useEffect, useState } from "react";

import Pagination from "@/components/extends/Pagination/Pagination";
import { useCadenceFilter } from "@/contexts/FilterCadenceContext";
import FilterCadence from "@/components/Filter/filterCadence";
import CadenceToolbar from "@/sections/cadences/CadenceToolbar";
import CadenceItem from "@/sections/cadences/CadenceItem";
import SortButton from "@/components/ui/SortableHeader";
import Loading from "@/components/Loading";

import { handleError, runService } from "@/utils/service_utils";
import {
  deleteCadence,
  FetchCadenceModel,
  getCadences,
  getCadencesTotalCount,
} from "@/services/cadenceService";
import { CadenceItemProps, CountModel } from "@/types";
import SortableHeader from "@/components/ui/SortableHeader";
import { toast } from "react-toastify";

export default function Cadences(
  { campaignId }: { campaignId?: string } = { campaignId: "" }
) {
  const { cadenceFilterConfig, setCadenceFilterConfig } = useCadenceFilter();
  const [cadences, setCadences] = useState<FetchCadenceModel[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const fetchCadences = () => {
    setLoading(true);
    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    runService(
      {
        offset,
        limit,
        campaignId,
        starred: cadenceFilterConfig.starred,
        isActive: cadenceFilterConfig.isActive,
        ownedBy: cadenceFilterConfig.ownedBy,
        orderBy: cadenceFilterConfig.orderBy,
        isAscending: cadenceFilterConfig.isAscending,
        search: cadenceFilterConfig.search,
      },
      getCadences,
      (data) => {
        console.log(data);
        setCadences(data);
        setLoading(false);
      },
      (status, error) => {
        handleError(status, error);
        setLoading(false);
      }
    );
  };

  const fetchTotalCount = () => {
    runService(
      undefined,
      getCadencesTotalCount,
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
    fetchCadences();
  }, [cadenceFilterConfig, pageSize, currentPage]);

  const handleChangeSort = (label: string) => {
    if (cadenceFilterConfig.orderBy === label)
      setCadenceFilterConfig((config) => {
        return {
          ...config,
          isAscending: !config.isAscending,
        };
      });
    else
      setCadenceFilterConfig((config) => {
        return {
          ...config,
          orderBy: label,
          isAscending: true,
        };
      });
  };

  const handleDeleteCadence = (cadenceId: string) => {
    runService(
      { cadenceId: cadenceId },
      deleteCadence,
      (data) => {
        console.log("cadence deleted", data);
        toast.success("Cadence deleted successfully");
        fetchCadences();
      },
      (status, error) => {
        console.log(status, error);
        handleError(status, error);
      }
    );
  };

  return (
    <div className="flex gap-4 p-4 flex-1 overflow-auto">
      {cadenceFilterConfig.isOpen && <FilterCadence />}
      <div className="card p-4 pt-7 flex-1 flex flex-col gap-2 overflow-auto shadow-lg min-w-[420px]">
        <div className="overflow-auto">
          <CadenceToolbar />
        </div>

        {/* Table */}
        <div className="flex flex-1 flex-col w-full align-middle border rounded-md overflow-auto">
          {loading ? (
            <Loading />
          ) : (
            <table className="flex-1 w-full">
              <thead className="sticky top-0 z-10 bg-gray-50 shadow-md">
                <tr>
                  <th></th>
                  <th>
                    <SortableHeader
                      label="name"
                      value="name"
                      orderBy={cadenceFilterConfig.orderBy}
                      isAscending={cadenceFilterConfig.isAscending}
                      handleChangeSort={handleChangeSort}
                    />
                  </th>
                  <th className="py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cadences.map((cadence: FetchCadenceModel, index) => (
                  <CadenceItem
                    key={index}
                    cadence={cadence}
                    onDelete={handleDeleteCadence}
                  />
                ))}
                <tr></tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-end">
          <Pagination
            className="pagination-bar"
            totalCount={totalCount}
            onPageChange={(pageSize: number, currentPage: number) => {
              setPageSize(pageSize);
              setCurrentPage(currentPage);
            }}
          />
        </div>
      </div>
    </div>
  );
}
