import { useTaskFilter } from "@/contexts/FilterTaskContext";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { IoMdCheckboxOutline } from "react-icons/io";

const TaskToolbar = ({ handleCreate }: { handleCreate: () => void }) => {
  const { taskFilterConfig, setTaskFilterConfig } = useTaskFilter();

  return (
    <div className="flex flex-row justify-between items-center gap-4 text-sm border-b border-gray-100">
      <div className="flex items-center gap-2">
        <button
          className="btn-secondary"
          onClick={() => {
            setTaskFilterConfig((prev) => ({
              ...prev,
              isOpen: !prev.isOpen,
            }));
          }}
        >
          <AdjustmentsHorizontalIcon className="w-4 h-4" />
          <span>
            {taskFilterConfig.isOpen ? "Hide Filters" : "Show Filters"}
          </span>
        </button>
      </div>
      <div className="flex flex-row justify-end items-center gap-2">
        <button className="btn-primary" onClick={handleCreate}>
          <IoMdCheckboxOutline className="w-5 h-5 fill-white" />
          <span className="text-white">New Task</span>
        </button>
      </div>
    </div>
  );
};

export default TaskToolbar;
