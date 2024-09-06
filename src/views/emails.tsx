"use client";
import Pagination from "@/components/extends/Pagination/Pagination";
import { useEmailFilter } from "@/contexts/FilterEmailContext";
import FilterEmail from "@/components/Filter/filterEmail";
import EmailToolbar from "@/sections/emails/EmailToolbar";
import EmailItem from "@/sections/emails/EmailItem";
import { useRouter } from "next/navigation";

export default function Emails() {
  const { emailFilterConfig, setEmailFilterConfig } = useEmailFilter();
  const router = useRouter();

  return (
    <div className="flex gap-2 flex-1 overflow-auto">
      {emailFilterConfig.isOpen && <FilterEmail />}
      <div className="card flex-1 flex flex-col overflow-auto">
        <div className="px-6 overflow-auto">
          <EmailToolbar />
        </div>

        {/* Table */}
        <div className="flex flex-1 flex-col w-full py-2 align-middle sm:px-4 lg:px-6 overflow-auto">
          <div className="w-full h-full border rounded-md overflow-auto">
            <EmailItem />
            <EmailItem />
            <EmailItem />
            <EmailItem />
            <EmailItem />
            <EmailItem />
            <EmailItem />
            <EmailItem />
            <EmailItem />
            <EmailItem />
            <EmailItem />
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-end">
          <Pagination
            className="pagination-bar"
            totalCount={0}
            onPageChange={
              (pageSize: number, currentPage: number) =>
                console.log(pageSize, currentPage)
              // handlePageChange(pageSize, currentPage)
            }
          />
        </div>
      </div>
    </div>
  );
}
