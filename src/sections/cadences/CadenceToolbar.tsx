import { useState } from "react";
import { toast } from "react-toastify";
import { useCadenceFilter } from "@/contexts/FilterCadenceContext";
import {
  AdjustmentsHorizontalIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import AddCadence from "../cadences/AddCadence";
import CreateCadence from "../cadences/CreateCadence";
import NewCadenceFromScratch from "./NewCadenceFromScratch";
import { useRouter } from "next/navigation";
import { runService } from "@/utils/service_utils";
import { addCadence } from "@/services/cadenceService";

const CadenceToolbar = () => {
  const { cadenceFilterConfig, setCadenceFilterConfig } = useCadenceFilter();
  const [openAddCadence, setOpenAddCadence] = useState(false);
  const [openCreateCadence, setOpenCreateCadence] = useState(false);
  const [openNewCadenceFromScratch, setOpenNewCadenceFromScratch] =
    useState(false);
  const router = useRouter();

  const handleCreateCadence = (type: any) => {
    if (type === "from-scratch") {
      setOpenNewCadenceFromScratch(true);
      setOpenAddCadence(false);
      setOpenCreateCadence(false);
    } else {
      toast.info("Only support from-scratch cadences");
    }
  };

  const handleNewCadenceFromScratch = (name: string, ownerId: string) => {
    runService(
      { name, ownerId },
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
      <div className="flex justify-between items-center gap-2 border-b-1 border-gray-100 py-1 text-sm">
        <button
          className="min-w-32 px-2 py-1.5 flex justify-center items-center gap-2 border-2 border-gray-300 rounded-md hover:bg-gray-200"
          onClick={() => {
            if (cadenceFilterConfig.isOpen) {
              setCadenceFilterConfig({ ...cadenceFilterConfig, isOpen: false });
            } else {
              setCadenceFilterConfig({ ...cadenceFilterConfig, isOpen: true });
            }
          }}
        >
          <AdjustmentsHorizontalIcon className="w-4 h-4" />
          {cadenceFilterConfig.isOpen ? (
            <span>Hide Filters</span>
          ) : (
            <span>Show Filters</span>
          )}
        </button>
        <div
          className="p-2 flex-center gap-2 rounded-md bg-blue-500 hover:bg-blue-400 cursor-pointer"
          onClick={() => setOpenCreateCadence(true)}
        >
          <PlusCircleIcon className="w-4 h-4 stroke-white" />
          <span className="text-sm text-white">Build Cadence</span>
        </div>
      </div>

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
          click={(name: string, ownerId: string) =>
            handleNewCadenceFromScratch(name, ownerId)
          }
        />
      )}
    </>
  );
};

export default CadenceToolbar;
