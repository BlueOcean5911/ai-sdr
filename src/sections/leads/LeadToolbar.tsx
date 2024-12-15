"use client";
import dynamic from "next/dynamic";
import {
  EnvelopeIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLeadSelection } from "@/contexts/LeadSelectionContext";

import { useSearchParams } from "next/navigation";
import { useLeadFilter } from "@/contexts/FilterLeadContext";
import AddCadence from "../cadences/AddCadence";
import CreateCadence from "../cadences/CreateCadence";
import NewCadenceFromScratch from "../cadences/NewCadenceFromScratch";
import { useRouter } from "next/navigation";
import { runService } from "@/utils/service_utils";
import {
  LeadModelWithCompanyModel,
  updateLeadsAsTargeted,
} from "@/services/leadService";
import { addCadence } from "@/services/cadenceService";

const EmailSendWindow = dynamic(
  () => import("@/sections/email/EmailSendWindow"),
  {
    ssr: false,
  }
);
const LeadToolbar = () => {
  const searchParams = useSearchParams();

  const { selectedLeads, setSelectedLeads, handleSaveLeads } =
    useLeadSelection();
  const { leadFilterConfig, setLeadFilterConfig } = useLeadFilter();
  const [isOpenSendEmail, setIsOpenSendEmail] = useState(false);
  const [isSavedView, setIsSavedView] = useState(false);
  const [openAddCadence, setOpenAddCadence] = useState(false);
  const [openCreateCadence, setOpenCreateCadence] = useState(false);
  const [openNewCadenceFromScratch, setOpenNewCadenceFromScratch] =
    useState(false);
  const router = useRouter();
  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    if (currentParams.targeted) {
      setIsSavedView(true);
    } else {
      setIsSavedView(false);
    }
  });

  const handleSendMail = () => {
    if (selectedLeads.length === 0) {
      toast.error("Select one lead to send mail");
    } else if (selectedLeads.length === 1) {
      setIsOpenSendEmail(true);
      toast.info("Let's send email");
    } else {
      toast.error("Select only one lead to send mail");
    }
  };

  const handleSaveLead = () => {
    if (selectedLeads.length > 0) {
      handleSaveLeads(selectedLeads);
      //  TODO: Add logic to handle save the leads. We need to update the selected lead as target
      // So add logic for this
      const leadIds = selectedLeads.map(
        (lead: LeadModelWithCompanyModel) => lead.id
      );
      runService(
        leadIds,
        updateLeadsAsTargeted,
        (data) => {
          toast.success("Successfully saved");
        },
        (status, error) => {
          // handleError(status, error);
          toast.error(error);
        }
      );
      setSelectedLeads([]);
    } else {
      toast.info("Please select one lead to save");
    }
  };

  const handleCreateCadence = (type: any) => {
    if (type === "from-scratch") {
      setOpenNewCadenceFromScratch(true);
      setOpenAddCadence(false);
      setOpenCreateCadence(false);
    } else {
      toast.info("Only support from-scratch cadences");
    }
  };

  const handleNewCadenceFromScratch = (name: string) => {
    runService(
      { name },
      addCadence,
      (data) => {
        router.push(`/cadences/${data.id}/`);
      },
      (status, error) => {
        console.log(status, error);
      }
    );
  };

  return (
    <>
      <div className="flex items-center gap-2 border-b-1 border-gray-100 p-1 text-sm">
        <button
          className="btn-secondary"
          onClick={() => {
            if (leadFilterConfig.isOpen) {
              setLeadFilterConfig({ ...leadFilterConfig, isOpen: false });
            } else {
              setLeadFilterConfig({ ...leadFilterConfig, isOpen: true });
            }
          }}
        >
          {leadFilterConfig.isOpen ? (
            <span>Hide Filters</span>
          ) : (
            <span>Show Filters</span>
          )}
        </button>
        {!isSavedView && (
          <button className="btn-secondary" onClick={() => handleSaveLead()}>
            <PlusIcon className="w-4 h-4" /> Save
          </button>
        )}

        <button className="btn-secondary" onClick={() => handleSendMail()}>
          <EnvelopeIcon className="w-4 h-4" /> Email
        </button>
        <Menu>
          <MenuButton className="btn-secondary">
            <PaperAirplaneIcon className="w-4 h-4" /> Cadence
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="w-46 origin-top-right bg-white rounded-xl border border-white/5 shadow-md p-1 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
          >
            <MenuItem>
              <button
                className="group text-sm flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100"
                onClick={() => {
                  if (selectedLeads && selectedLeads.length > 0) {
                    setOpenAddCadence(true);
                  } else {
                    toast.info("Please select one lead to add to cadence");
                  }
                }}
              >
                <PaperAirplaneIcon className="size-4" />
                Add to existing Cadence
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="group text-sm flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100"
                onClick={() => setOpenCreateCadence(true)}
              >
                <PlusCircleIcon className="size-4" />
                Add to new Cadence
              </button>
            </MenuItem>
            {/* <MenuItem>
              <button className="group text-sm flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                <CheckCircleIcon className="size-4" />
                Mark Cadence as finished
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group text-sm flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                <MinusCircleIcon className="size-4" />
                Remove from Cadence
              </button>
            </MenuItem> */}
          </MenuItems>
        </Menu>
        {isOpenSendEmail && (
          <>
            <EmailSendWindow
              close={() => setIsOpenSendEmail(false)}
              lead={selectedLeads[0]}
            />
          </>
        )}
        {openAddCadence && (
          <AddCadence
            open={openAddCadence}
            close={() => setOpenAddCadence(false)}
          />
        )}
        {openCreateCadence && (
          <CreateCadence
            close={() => setOpenCreateCadence(false)}
            click={(type: any) => handleCreateCadence(type)}
          />
        )}
        {openNewCadenceFromScratch && (
          <NewCadenceFromScratch
            handleClose={() => setOpenNewCadenceFromScratch(false)}
            handleCreate={(name: string) => handleNewCadenceFromScratch(name)}
          />
        )}
      </div>
    </>
  );
};

export default LeadToolbar;
