"use client";

import FilterContact from "@/components/Filter/filterContact";
import ContactToolbar from "@/sections/contacts/ContactToolbar";
import { useContactFilter } from "@/contexts/FilterContactContext";
import {
  ContactInCadence,
  ContactInCadenceStatistics,
  getContactsInCadence,
  getContactsInCadenceStatistics,
  updateCadenceState,
} from "@/services/contactsService";
import GeneralContacts from "./generalContacts";
import Pagination from "@/components/extends/Pagination/Pagination";
import { useEffect, useState } from "react";
import { handleError, runService } from "@/utils/service_utils";
import { SuccessModel } from "@/types";
import { toast } from "react-toastify";
import { deleteCadenceState } from "@/services/cadenceState";

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

  const handleUpdateCadenceStep = (id: string, status: string) => {
    runService(
      { id, status },
      updateCadenceState,
      (data: SuccessModel) => {
        if (data.success) {
          setContacts(
            contacts.map((contact) => {
              if (contact.cadenceStepId === id) {
                contact.currentStepStatus = status;
              }
              return contact;
            })
          );
          fetchContactsStatistics();
          toast.success("Cadence step paused successfully.");
        }
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const handleDeleteCadenceStep = (id: string) => {
    runService(
      { id },
      deleteCadenceState,
      (data: SuccessModel) => {
        if (data.success) {
          setContacts(
            contacts.filter((contact) => contact.cadenceStepId !== id)
          );
          fetchContactsStatistics();
          fetchTotalCount();
          toast.success("Cadence step deleted successfully.");
        }
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
        setTotalCount(data.totalCount);
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
        <GeneralContacts
          contacts={contacts}
          handleUpdateCadenceState={(id, status) =>
            handleUpdateCadenceStep(id, status)
          }
          onDeleteOne={(id: string) => handleDeleteCadenceStep(id)}
        />
        {/* Pagination */}
        <div className="flex justify-end">
          <Pagination
            className="pagination-bar"
            totalCount={totalCount}
            pageSize={pageSize}
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
