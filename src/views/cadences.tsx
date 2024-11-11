"use client";

import { useEffect, useState } from "react";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";

import Pagination from "@/components/extends/Pagination/Pagination";
import { useCadenceFilter } from "@/contexts/FilterCadenceContext";
import FilterCadence from "@/components/Filter/filterCadence";
import CadenceToolbar from "@/sections/cadences/CadenceToolbar";
import CadenceItem from "@/sections/cadences/CadenceItem";
import Loading from "@/components/Loading";

import { handleError, runService } from "@/utils/service_utils";
import {
  FetchCadenceModel,
  getCadences,
  getCadencesTotalCount,
} from "@/services/cadenceService";
import { CountModel } from "@/types";

export default function Cadences(
  { campaignId }: { campaignId?: string } = { campaignId: "" }
) {
  const { cadenceFilterConfig } = useCadenceFilter();
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
        search: cadenceFilterConfig.search,
      },
      getCadences,
      (data) => {
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
  }, [cadenceFilterConfig]);

  return (
    <div className="flex gap-4 p-4 flex-1 overflow-auto">
      {cadenceFilterConfig.isOpen && <FilterCadence />}
      <div className="card p-4 pt-7 flex-1 flex flex-col gap-2 overflow-auto shadow-lg min-w-[420px]">
        <div className="overflow-auto">
          <CadenceToolbar />
        </div>

        {/* Table */}
        <div className="flex flex-1 flex-col w-full align-middle overflow-auto">
          <table className="w-full border rounded-md">
            <thead className="bg-gray-50">
              <tr>
                <th></th>
                <th className="py-3 flex flex-row items-center gap-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                  <div className="flex flex-col -space-y-1.5">
                    <TiArrowSortedUp className="fill-gray-500" />
                    <TiArrowSortedDown className="fill-blue-600" />
                  </div>
                </th>
                <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={4}>
                    <Loading />
                  </td>
                </tr>
              ) : (
                cadences.map((cadence: FetchCadenceModel, index) => (
                  <CadenceItem key={index} cadence={cadence} />
                ))
              )}
            </tbody>
          </table>
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
