import {
  CheckCircleIcon,
  EnvelopeIcon,
  MinusCircleIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLeadSelection } from "@/contexts/LeadSelectionContext";

import { useSearchParams } from "next/navigation";
import EmailSendWindow from "../email/EmailSendWindow";
import { useLeadFilter } from "@/contexts/FilterLeadContext";
import AddCadence from "../cadences/AddCadence";
import CreateCadence from "../cadences/CreateCadence";
import NewCadenceFromScratch from "../cadences/NewCadenceFromScratch";
import { useRouter } from "next/navigation";

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
    if (currentParams.prospectedByCurrentTeam) {
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
      setSelectedLeads([]);
      toast.success("Leads saved successfully");
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

  const handleNewCadenceFromScratch = () => {
    router.push("/cadences/cadences-1/");
  };

  return (
    <>
      <div className="flex items-center gap-2 border-b-1 border-gray-100 py-1 text-sm">
        <button
          className="min-w-32 px-2 py-1.5 flex justify-center items-center gap-2 border-2 border-gray-300 rounded-md hover:bg-gray-200"
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
          <button
            className="min-w-32 px-2 py-1.5 flex justify-center items-center gap-2 border-2 border-gray-300 rounded-md hover:bg-gray-200"
            onClick={() => handleSaveLead()}
          >
            <PlusIcon className="w-4 h-4" /> Save
          </button>
        )}

        <button
          className="min-w-32 px-2 py-1.5 flex justify-center items-center gap-2 border-2 border-gray-300 rounded-md hover:bg-gray-200"
          onClick={() => handleSendMail()}
        >
          <EnvelopeIcon className="w-4 h-4" /> Email
        </button>
        <Menu>
          <MenuButton className="inline-flex items-center gap-2 rounded-md border-2 border-gray-300 py-1 px-3 text-gray-900 focus:outline-none data-[hover]:bg-gray-200 data-[open]:bg-gray-200 data-[focus]:outline-1 data-[focus]:outline-white">
            <PaperAirplaneIcon className="w-4 h-4" /> Cadence
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="w-46 origin-top-right bg-white rounded-xl border border-white/5 shadow-md p-1 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
          >
            <MenuItem>
              <button
                className="group text-xs flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100"
                onClick={() => setOpenAddCadence(true)}
              >
                <PaperAirplaneIcon className="size-4" />
                Add to existing Cadence
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="group text-xs flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100"
                onClick={() => setOpenCreateCadence(true)}
              >
                <PlusCircleIcon className="size-4" />
                Add to new Cadence
              </button>
            </MenuItem>
            {/* <MenuItem>
              <button className="group text-xs flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                <CheckCircleIcon className="size-4" />
                Mark Cadence as finished
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group text-xs flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                <MinusCircleIcon className="size-4" />
                Remove from Cadence
              </button>
            </MenuItem> */}
          </MenuItems>
        </Menu>
        {isOpenSendEmail && (
          <>
            <EmailSendWindow close={() => setIsOpenSendEmail(false)} />
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
            close={() => setOpenNewCadenceFromScratch(false)}
            click={() => handleNewCadenceFromScratch()}
          />
        )}
      </div>
    </>
  );
};

export default LeadToolbar;
