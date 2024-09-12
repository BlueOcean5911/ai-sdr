"use client";
import Pagination from "@/components/extends/Pagination/Pagination";
import { useContactFilter } from "@/contexts/FilterContactContext";
import FilterContact from "@/components/Filter/filterContact";
import ContactToolbar from "@/sections/contacts/ContactToolbar";
import ContactItem from "@/sections/contacts/ContactItem";
import { useRouter } from "next/navigation";
import { handleError, runService } from "@/utils/service_utils";
import {
  ContactInCadence,
  ContactInCadenceStatistics,
  getContactsInCadence,
  getContactsInCadenceStatistics,
} from "@/services/contactsInCadenceService";
import { useEffect, useState } from "react";

export default function Contacts({ cadenceId }: { cadenceId: string }) {
  const { contactFilterConfig, setContactFilterConfig } = useContactFilter();
  const [contactsInCadence, setContactsInCadence] = useState<
    ContactInCadence[]
  >([]);
  const [statistic, setStatistics] = useState<ContactInCadenceStatistics>();

  const fetchContactsInCadence = () => {
    runService(
      { cadenceId },
      getContactsInCadence,
      (data) => {
        setContactsInCadence(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const fetchContactsInCadenceStatistics = () => {
    runService(
      cadenceId,
      getContactsInCadenceStatistics,
      (data) => {
        setStatistics(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    console.log(" contacts here ", contactsInCadence);
  }, [contactsInCadence]);

  useEffect(() => {
    fetchContactsInCadenceStatistics();
    fetchContactsInCadence();
  }, []);

  return (
    <div className="flex gap-2 flex-1 overflow-auto">
      {contactFilterConfig.isOpen && <FilterContact />}
      <div className="card flex-1 flex flex-col overflow-auto">
        <div className="px-6 overflow-auto">
          <ContactToolbar data={statistic} />
        </div>

        {/* Table */}
        <div className="flex flex-1 flex-col w-full py-2 align-middle sm:px-4 lg:px-6 overflow-auto">
          <div className="w-full h-full border rounded-md overflow-auto">
            {contactsInCadence.length > 0 ? (
              contactsInCadence.map((contact, index) => (
                <ContactItem key={index} contact={contact} />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No contacts found.</p>
            )}
            {/* <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem /> */}
          </div>
        </div>
        {/* Pagination */}
        {/* <div className="flex justify-end">
          <Pagination
            className="pagination-bar"
            totalCount={0}
            onPageChange={
              (pageSize: number, currentPage: number) =>
                console.log(pageSize, currentPage)
              // handlePageChange(pageSize, currentPage)
            }
          />
        </div> */}
      </div>
    </div>
  );
}
