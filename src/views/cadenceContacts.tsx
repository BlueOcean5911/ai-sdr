"use client";

import FilterContact from "@/components/Filter/filterContact";
import ContactToolbar from "@/sections/contacts/ContactToolbar";
import ContactItem from "@/sections/contacts/ContactItem";
import { useContactFilter } from "@/contexts/FilterContactContext";
import {
  ContactInCadence,
  ContactInCadenceStatistics,
  getContactsInCadence,
  getContactsInCadenceStatistics,
} from "@/services/contactsService";
import GeneralContacts from "./generalContacts";
import Pagination from "@/components/extends/Pagination/Pagination";
import { useEffect, useState } from "react";
import { handleError, runService } from "@/utils/service_utils";

export default function CadenceContacts(
  { cadenceId, campaignId }: { cadenceId?: string; campaignId?: string } = {
    cadenceId: "",
    campaignId: "",
  }
) {
  const { contactFilterConfig } = useContactFilter();

  const [contacts, setContacts] = useState<ContactInCadence[]>([]);
  const [statisticData, setStatisticData] =
    useState<ContactInCadenceStatistics>();

  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchContactsInCadence = () => {
    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    runService(
      {
        offset,
        limit,
        cadenceId,
        campaignId,
        cadenceStatus: contactFilterConfig.cadenceStatus,
        cadenceStep: contactFilterConfig.cadenceStep,
        emailFrom: contactFilterConfig.sendEmailsFrom,
      },
      getContactsInCadence,
      (data) => {
        setContacts(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const fetchContactsStatistics = () => {
    runService(
      { cadenceId },
      getContactsInCadenceStatistics,
      (data) => {
        setStatisticData(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const fetchTotalCount = () => {
    // TODO: Get total count for cadence with cadence ID
  };

  useEffect(() => {
    fetchTotalCount();
    fetchContactsStatistics();
    fetchContactsInCadence();
  }, [pageSize, totalCount, contactFilterConfig]);

  useEffect(() => {
    console.log(" contacts here ", contacts);
  }, [contacts]);

  return (
    <div className="flex gap-4 p-4 flex-1 overflow-auto">
      {contactFilterConfig.isOpen && <FilterContact />}
      <div className="card p-4 pt-7 flex-1 flex flex-col overflow-auto shadow-lg">
        <div className="overflow-auto">
          <ContactToolbar data={statisticData} />
        </div>

        {/* Table */}
        <GeneralContacts contacts={contacts} />
        {/* Pagination */}
        <div className="flex justify-end">
          <Pagination
            className="pagination-bar"
            totalCount={0}
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
