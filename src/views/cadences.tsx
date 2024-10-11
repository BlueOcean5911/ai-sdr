"use client";

import { useEffect, useState } from "react";

import Pagination from "@/components/extends/Pagination/Pagination";
import { useCadenceFilter } from "@/contexts/FilterCadenceContext";
import FilterCadence from "@/components/Filter/filterCadence";
import CadenceToolbar from "@/sections/cadences/CadenceToolbar";
import CadenceItem from "@/sections/cadences/CadenceItem";
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

  const fetchCadences = () => {
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
      },
      (status, error) => {
        handleError(status, error);
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
      <div className="card p-4 pt-7 flex-1 flex flex-col overflow-auto shadow-lg">
        <div className="overflow-auto">
          <CadenceToolbar />
        </div>

        {/* Table */}
        <div className="flex flex-1 flex-col w-full py-2 align-middle overflow-auto">
          <div className="w-full h-full border rounded-md overflow-auto">
            {cadences.map((cadence: FetchCadenceModel, index) => (
              <CadenceItem key={index} cadence={cadence} />
            ))}
          </div>
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
