import Select from "@/components/extends/Select/default";
import { useLeadSelection } from "@/contexts/LeadSelectionContext";
import { CadenceModel, getCadences } from "@/services/cadenceService";
import { addLeadsToExistingCadence, LeadModel } from "@/services/leadService";
import { handleError, runService } from "@/utils/service_utils";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoPersonAddOutline } from "react-icons/io5";

const AddCadence = ({
  children,
  open,
  close,
}: {
  children?: React.ReactNode;
  open: boolean;
  close: () => void;
}) => {
  const [cadences, setCadences] = React.useState([]);
  const [selectedCadenceId, setSelectedCadenceId] = useState<string>("");
  const { selectedLeads, setSelectedLeads } = useLeadSelection();
  const fetchCadences = () => {
    runService(
      undefined,
      getCadences,
      (resCadences) => {
        setCadences(resCadences);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchCadences();
  }, []);

  const handleAddToCadence = () => {
    if (selectedCadenceId === "" || selectedCadenceId === undefined) {
      toast.info("Please select at least one cadence.");
      return;
    }

    let leadIds = selectedLeads.map((lead: LeadModel) => lead.id);

    runService(
      { leadIds, cadenceId: selectedCadenceId },
      addLeadsToExistingCadence,
      (data) => {
        toast.success("Successfully Added");
        setSelectedLeads([]);
        close();
      },
      (status, error) => {
        console.log(status, error);
        handleError(status, error);
      }
    );
  };

  return (
    <>
      <div>{children}</div>
      <Dialog
        open={open}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 bg-black/65 z-40" />
        <div className="fixed inset-0 py-10 overflow-y-auto z-40">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="bg-white w-full max-w-md rounded-xl backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="px-6 py-3 flex justify-between items-center rounded-md text-lg font-semibold leading-6 bg-white text-gray-900"
              >
                <h4 className="text-xl">Add to Cadence</h4>
                <div
                  className="p-1 rounded-md hover:bg-gray-100"
                  onClick={close}
                >
                  <XMarkIcon className="w-5 h-5 hover:cursor-pointer" />
                </div>
              </DialogTitle>
              <hr />
              <div className="p-6 w-full flex flex-col gap-4">
                <div className="border rounded-full w-64 h-64 flex-center m-auto shadow-lg">
                  <IoPersonAddOutline className="w-48 h-48 p-8 m-auto stroke-blue-900" />
                </div>
                <span className="mb-8 text-center text-sm">
                  Choose a cadence from the list to add this lead to. This will
                  help you manage your outreach efforts effectively and ensure
                  timely follow-ups. Once selected, you can proceed by clicking
                  "Add Lead to Cadence" or cancel if you change your mind.
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Sequences:</span>
                  <Select
                    className="w-full"
                    data={cadences}
                    onChange={(item: CadenceModel) =>
                      setSelectedCadenceId(item?.id ? item.id : "")
                    }
                  />
                </div>
                <div className="flex items-center gap-6">
                  <button
                    className="btn-primary w-full"
                    onClick={() => handleAddToCadence()}
                  >
                    Save
                  </button>
                  <button className="w-full btn-secondary" onClick={close}>
                    Close
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddCadence;
