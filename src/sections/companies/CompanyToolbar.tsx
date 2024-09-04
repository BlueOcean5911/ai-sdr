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
import { useCompanySelection } from "@/contexts/CompanySelectionContext";

import { useSearchParams } from "next/navigation";
import EmailSendWindow from "../email/EmailSendWindow";
import { useCompanyFilter } from "@/contexts/FilterCompanyContext";
import AddSequence from "../sequence/AddSequence";
import CreateSequence from "../sequence/CreateSequence";
import NewSequenceFromScratch from "../sequence/NewSequenceFromScratch";
import { useRouter } from "next/navigation";

const CompanyToolbar = () => {
  const searchParams = useSearchParams();

  const { selectedCompanies, setSelectedCompanies, handleSaveCompanies } =
    useCompanySelection();
  const { companyFilterConfig, setCompanyFilterConfig } = useCompanyFilter();
  const [isOpenSendEmail, setIsOpenSendEmail] = useState(false);
  const [isSavedView, setIsSavedView] = useState(false);
  const [openAddSequence, setOpenAddSequence] = useState(false);
  const [openCreateSequence, setOpenCreateSequence] = useState(false);
  const [openNewSequenceFromScratch, setOpenNewSequenceFromScratch] =
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
    if (selectedCompanies.length === 0) {
      toast.error("Select one company to send mail");
    } else if (selectedCompanies.length === 1) {
      setIsOpenSendEmail(true);
      toast.info("Let's send email");
    } else {
      toast.error("Select only one company to send mail");
    }
  };

  const handleSaveCompany = () => {
    if (selectedCompanies.length > 0) {
      handleSaveCompanies(selectedCompanies);
      setSelectedCompanies([]);
      toast.success("Companies saved successfully");
    } else {
      toast.info("Please select one company to save");
    }
  };

  const handleCreateSequence = (type: any) => {
    if (type === "from-scratch") {
      setOpenNewSequenceFromScratch(true);
      setOpenAddSequence(false);
      setOpenCreateSequence(false);
    } else {
      toast.info("Only support from-scratch sequences");
    }
  };

  const handleNewSequenceFromScratch = () => {
    router.push("/cadences/cadences-1/");
  };

  return (
    <>
      <div className="flex items-center gap-2 border-b-1 border-gray-100 py-1 text-sm">
        <button
          className="flex items-center gap-2 border-2 border-gray-300 py-1 px-3 rounded-md hover:bg-gray-200"
          onClick={() => {
            if (companyFilterConfig.isOpen) {
              setCompanyFilterConfig({ ...companyFilterConfig, isOpen: false });
            } else {
              setCompanyFilterConfig({ ...companyFilterConfig, isOpen: true });
            }
          }}
        >
          {companyFilterConfig.isOpen ? (
            <span>Hide Filters</span>
          ) : (
            <span>Show Filters</span>
          )}
        </button>
        {!isSavedView && (
          <button
            className="flex items-center gap-2 border-2 border-gray-300 py-1 px-3 rounded-md hover:bg-gray-200"
            onClick={() => handleSaveCompany()}
          >
            <PlusIcon className="w-4 h-4" /> Save
          </button>
        )}

        <button
          className="flex items-center gap-2 border-2 border-gray-300 py-1 px-3 rounded-md hover:bg-gray-200"
          onClick={() => handleSendMail()}
        >
          <EnvelopeIcon className="w-4 h-4" /> Email
        </button>
        <Menu>
          <MenuButton className="inline-flex items-center gap-2 rounded-md border-2 border-gray-300 py-1 px-3 text-gray-900 focus:outline-none data-[hover]:bg-gray-200 data-[open]:bg-gray-200 data-[focus]:outline-1 data-[focus]:outline-white">
            <PaperAirplaneIcon className="w-4 h-4" /> Sequence
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="w-46 origin-top-right bg-white rounded-xl border border-white/5 shadow-md p-1 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
          >
            <MenuItem>
              <button
                className="group text-xs flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100"
                onClick={() => setOpenAddSequence(true)}
              >
                <PaperAirplaneIcon className="size-4" />
                Add to existing Sequence
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="group text-xs flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100"
                onClick={() => setOpenCreateSequence(true)}
              >
                <PlusCircleIcon className="size-4" />
                Add to new Sequence
              </button>
            </MenuItem>
            {/* <MenuItem>
              <button className="group text-xs flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                <CheckCircleIcon className="size-4" />
                Mark Sequence as finished
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group text-xs flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                <MinusCircleIcon className="size-4" />
                Remove from Sequence
              </button>
            </MenuItem> */}
          </MenuItems>
        </Menu>
        {isOpenSendEmail && (
          <>
            <EmailSendWindow close={() => setIsOpenSendEmail(false)} />
          </>
        )}
        {openAddSequence && (
          <AddSequence
            open={openAddSequence}
            close={() => setOpenAddSequence(false)}
          />
        )}
        {openCreateSequence && (
          <CreateSequence
            close={() => setOpenCreateSequence(false)}
            click={(type: any) => handleCreateSequence(type)}
          />
        )}
        {openNewSequenceFromScratch && (
          <NewSequenceFromScratch
            close={() => setOpenNewSequenceFromScratch(false)}
            click={() => handleNewSequenceFromScratch()}
          />
        )}
      </div>
    </>
  );
};

export default CompanyToolbar;
