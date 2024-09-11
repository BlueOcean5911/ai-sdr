"use client";
import Pagination from "@/components/extends/Pagination/Pagination";
import { useContactFilter } from "@/contexts/FilterContactContext";
import FilterContact from "@/components/Filter/filterContact";
import ContactToolbar from "@/sections/contacts/ContactToolbar";
import ContactItem from "@/sections/contacts/ContactItem";
import { useRouter } from "next/navigation";

export default function Contacts({ cadenceId }: { cadenceId: string }) {
  const { contactFilterConfig, setContactFilterConfig } = useContactFilter();
  const router = useRouter();

  return (
    <div className="flex gap-2 flex-1 overflow-auto">
      {contactFilterConfig.isOpen && <FilterContact />}
      <div className="card flex-1 flex flex-col overflow-auto">
        <div className="px-6 overflow-auto">
          <ContactToolbar />
        </div>

        {/* Table */}
        <div className="flex flex-1 flex-col w-full py-2 align-middle sm:px-4 lg:px-6 overflow-auto">
          <div className="w-full h-full border rounded-md overflow-auto">
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
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
