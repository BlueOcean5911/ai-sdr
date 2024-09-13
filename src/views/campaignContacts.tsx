"use client";

import FilterContact from "@/components/Filter/filterContact";
import ContactToolbar from "@/sections/contacts/ContactToolbar";
import ContactItem from "@/sections/contacts/ContactItem";
import { useContactFilter } from "@/contexts/FilterContactContext";
import {
  ContactInCadence,
  ContactInCadenceStatistics,
  getContactsInCampaign,
} from "@/services/contactsService";
import GeneralContacts from "./generalContacts";
import Pagination from "@/components/extends/Pagination/Pagination";
import { useEffect, useState } from "react";
import { handleError, runService } from "@/utils/service_utils";

export default function CampaignContacts({
  campaignId,
}: {
  campaignId: string;
}) {
  const { contactFilterConfig } = useContactFilter();
  const [contacts, setContacts] = useState<ContactInCadence[]>([]);
  const [statisticData, setStatisticData] =
    useState<ContactInCadenceStatistics>();

  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchContactsInCadence = () => {
    runService(
      { campaignId },
      getContactsInCampaign,
      (data) => {
        console.log("contacts in campaign", data);
        setContacts(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const fetchContactsStatistics = () => {
    // runService(
    //   id,
    //   getContactsInCadenceStatistics,
    //   (data) => {
    //     setStatistics(data);
    //   },
    //   (status, error) => {
    //     handleError(status, error);
    //   }
    // );
  };

  const fetchTotalCount = () => {};

  useEffect(() => {
    fetchTotalCount();
    fetchContactsStatistics();
    fetchContactsInCadence();
  }, [pageSize, totalCount, contactFilterConfig]);

  useEffect(() => {
    console.log(" contacts here ", contacts);
  }, [contacts]);

  return (
    <div className="flex gap-2 flex-1 overflow-auto">
      {contactFilterConfig.isOpen && <FilterContact />}
      <div className="card flex-1 flex flex-col overflow-auto">
        <div className="px-6 overflow-auto">
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
