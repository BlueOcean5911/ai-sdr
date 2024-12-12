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
  pauseContactInCadence,
  resumeContactInCadence,
  removeContactInCadence,
  finishContactInCadence,
} from "@/services/contactsService";
import GeneralContacts from "./generalContacts";
import Pagination from "@/components/extends/Pagination/Pagination";
import { useEffect, useState } from "react";
import { handleError, runService } from "@/utils/service_utils";
import { SuccessModel } from "@/types";
import { LEAD_STAGE, LEAD_STATUS_IN_CADENCE } from "@/types/enums";
import { toast } from "react-toastify";
import { deleteCadenceState } from "@/services/cadenceState";
import { updateLead } from "@/services/leadService";

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
        cadenceSteps: contactFilterConfig.cadenceSteps,
        search: contactFilterConfig.search,
        owners: contactFilterConfig.owners,
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

  const fetchContactsStatistics = () => {
    runService(
      {
        cadenceId,
        cadenceSteps: contactFilterConfig.cadenceSteps,
        search: contactFilterConfig.search,
        owners: contactFilterConfig.owners,
      },
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

  const handlePause = (contactId: string, cadenceId: string) => {
    runService(
      { contactId, cadenceId },
      pauseContactInCadence,
      (data: SuccessModel) => {
        if (data.success) {
          setContacts(
            contacts.map((contact) => {
              if (contact.leadId === contactId) {
                contact.status = LEAD_STATUS_IN_CADENCE.PAUSED;
              }
              return contact;
            })
          );
          toast.success("Contact paused in this cadence successfully.");
        }
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const handleResume = (contactId: string, cadenceId: string) => {
    runService(
      { contactId, cadenceId },
      resumeContactInCadence,
      (data: SuccessModel) => {
        if (data.success) {
          setContacts(
            contacts.map((contact) => {
              if (contact.leadId === contactId) {
                contact.status = LEAD_STATUS_IN_CADENCE.ACTIVE;
              }
              return contact;
            })
          );
          toast.success("Contact resumed in this cadence successfully.");
        }
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const handleRemove = (contactId: string, cadenceId: string) => {
    runService(
      { contactId, cadenceId },
      removeContactInCadence,
      (data: SuccessModel) => {
        if (data.success) {
          setContacts(
            contacts.map((contact) => {
              if (contact.leadId === contactId) {
                contact.status = LEAD_STATUS_IN_CADENCE.REMOVED;
              }
              return contact;
            })
          );
          toast.success("Contact resumed in this cadence successfully.");
        }
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const handleFinish = (
    contactId: string,
    cadenceId: string,
    leadStage: LEAD_STAGE
  ) => {
    runService(
      { id: contactId, updateData: { stage: leadStage } },
      updateLead,
      (data) => {
        runService(
          { contactId, cadenceId },
          finishContactInCadence,
          (data: SuccessModel) => {
            if (data.success) {
              setContacts(
                contacts.map((contact) => {
                  if (contact.leadId === contactId) {
                    contact.status = LEAD_STATUS_IN_CADENCE.FINISHED;
                  }
                  return contact;
                })
              );
              toast.success("Contact finished in this cadence successfully.");
            }
          },
          (status, error) => {
            handleError(status, error);
          }
        );
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchContactsStatistics();
    fetchContactsInCadence();
  }, [pageSize, totalCount, contactFilterConfig]);

  return (
    <div className="flex gap-4 p-4 flex-1 overflow-auto">
      {contactFilterConfig.isOpen && <FilterContact />}
      <div className="card p-4 pt-7 flex-1 flex flex-col gap-2 overflow-auto shadow-lg min-w-[420px]">
        <div className="overflow-auto">
          <ContactToolbar data={statisticData} />
        </div>

        {/* Table */}
        <GeneralContacts
          contacts={contacts}
          pause={handlePause}
          resume={handleResume}
          remove={handleRemove}
          finish={handleFinish}
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
