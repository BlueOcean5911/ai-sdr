import React, { useEffect, useState } from "react";
import { classNames } from "@/utils";
import { usePagination, DOTS } from "./usePagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Select from "../Select/default";

const pageSizes = [
  {
    id: 10,
    name: "10",
    value: 10,
  },
  {
    id: 20,
    name: "20",
    value: 20,
  },
  {
    id: 50,
    name: "50",
    value: 50,
  },
  {
    id: 100,
    name: "100",
    value: 100,
  },
];

const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    pageSize: defaultPageSize = 10,
    className,
  }: {
    onPageChange: (pageSize: number, currentPage: number) => void;
    totalCount: number;
    siblingCount?: number;
    pageSize?: number;
    className?: string;
  } = props;

  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [currentPage, setCurrentPage] = useState(1);

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  let currentIndex = pageSize * (currentPage - 1) + 1;
  if (currentIndex < 0) {
    currentIndex = 1;
  }

  let showCount = totalCount - pageSize * (currentPage - 1);
  if (showCount > pageSize) {
    showCount = pageSize;
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  useEffect(() => {
    onPageChange(pageSize, currentPage);
    if (totalCount < pageSize * (currentPage - 1)) setCurrentPage(lastPage);
  }, [currentPage, pageSize]);

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <div className="flex justify-end items-center pt-2">
      <div className="pr-12 text-sm text-nowrap">
        {totalCount &&
          `${currentIndex} - ${
            currentIndex + showCount - 1
          } of ${totalCount.toLocaleString("en-US")}`}
      </div>
      <Select
        data={pageSizes}
        onChange={(item: any) => setPageSize(item.value)}
      />
      <ul className="flex items-center &>li:hover:bg-gray-200">
        <li
          key={"<"}
          className={classNames(
            "pagination-item",
            currentPage === 1 ? "disabled" : ""
          )}
          onClick={onPrevious}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </li>
        {paginationRange.map((pageNumber: any, index: number) => {
          if (pageNumber === DOTS) {
            return (
              <li key={index} className="pagination-item dots">
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={index}
              className={classNames(
                "pagination-item",
                pageNumber === currentPage ? "selected" : ""
              )}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          key={">"}
          className={classNames(
            "pagination-item",
            currentPage === lastPage ? "disabled" : ""
          )}
          onClick={onNext}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
