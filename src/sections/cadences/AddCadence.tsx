import Select from "@/components/extends/Select/default";
import { useLeadSelection } from "@/contexts/LeadSelectionContext";
// import { CadenceModel, getCadences } from "@/services/cadenceService001";
import { CadenceModel, getCadences } from "@/services/cadenceService";
import { addLeadsToExistingCadence, LeadModel } from "@/services/leadService";
import { handleError, runService } from "@/utils/service_utils";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
        toast.error(`Failed to fetch cadences: ${error}`);
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
        <div className="fixed inset-0 z-50 w-screen h-screen overflow-y-auto bg-black/10" />
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="bg-white w-full max-w-md rounded-xl backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex-center justify-between border-b-2 border-gray-100">
                <h3 className="p-2">Add to Cadence</h3>
                <XCircle
                  className="w-6 h-6 mr-2 cursor-pointer stroke-gray-300 hover:stroke-gray-500"
                  onClick={close}
                />
              </div>
              <div className="p-2 min-h-32 flex-col">
                <span className="text-xs">Sequences:</span>
                <Select
                  className="w-full"
                  data={cadences}
                  onChange={(item: CadenceModel) =>
                    setSelectedCadenceId(item?.id ? item.id : "")
                  }
                />
              </div>

              <div className="flex gap-4 p-2 justify-end">
                <button className="w-full p-1 rounded-md bg-gray-300 hover:bg-gray-200">
                  Cancel
                </button>
                <button
                  className="w-full p-1 rounded-md text-white bg-blue-500 hover:bg-blue-400"
                  onClick={() => handleAddToCadence()}
                >
                  Add Lead to cadence
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddCadence;
