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

  useEffect(() => {
    onPageChange(pageSize, currentPage);
  }, [currentPage, pageSize]);

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="flex justify-end p-4">
      <Select
        data={pageSizes}
        onChange={(item: any) => setPageSize(item.value)}
      />
      <ul className="flex items-center &>li:hover:bg-gray-200">
        <li
          className={classNames(
            "pagination-item",
            currentPage === 1 ? "disabled" : ""
          )}
          onClick={onPrevious}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </li>
        {paginationRange.map((pageNumber: any) => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }

          return (
            <li
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
          className={classNames(
            "pagination-item",
            currentPage === lastPage ? "disabled" : ""
          )}
          onClick={onNext}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
