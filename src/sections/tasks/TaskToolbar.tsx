import { useTaskFilter } from "@/contexts/FilterTaskContext";
import { getTasksStatistics, TasksStatistics } from "@/services/taskService";
import { classNames } from "@/utils";
import { handleError, runService } from "@/utils/service_utils";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdCheckboxOutline } from "react-icons/io";

const TaskToolbar = ({ handleCreate }: { handleCreate: () => void }) => {
  const path = usePathname();
  const currentParams = Object.fromEntries(useSearchParams());
  const { taskFilterConfig, setTaskFilterConfig } = useTaskFilter();
  const [statistics, setStatistics] = useState<TasksStatistics>({
    total: 0,
    action: 0,
    email: 0,
    call: 0,
    meet: 0,
    linkedin: 0,
  });

  // const fetchStatistics = () => {
  //   runService(
  //     undefined,
  //     getTasksStatistics,
  //     (data) => {
  //       setStatistics(data);
  //     },
  //     (status, error) => {
  //       console.log(status, error);
  //       handleError(status, error);
  //     }
  //   );
  // };

  // useEffect(() => {
  //   fetchStatistics();
  // }, []);

  return (
    <div className="flex flex-row justify-between items-center gap-4 text-sm border-b border-gray-100">
      <div className="flex items-center gap-2">
        <button
          className="min-w-32 px-2 py-1.5 flex justify-center items-center gap-2 border-2 border-gray-300 rounded-md hover:bg-gray-200"
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
        {Object.entries(statistics).map(([key, count]) => (
          <Link key={key} href={`${path}?${key}=true`}>
            <div
              className={classNames(
                "w-24 min-w-20 py-1 flex flex-col text-xs text-center cursor-pointer border-b",
                currentParams[key]
                  ? "border-b-blue-500 bg-gray-100"
                  : "hover:bg-gray-100 hover:border-b-blue-500"
              )}
              onClick={() =>
                setTaskFilterConfig((prev) => ({
                  ...prev,
                  params: { [key]: "true" },
                }))
              }
            >
              <span className="text-inherit">{count}</span>
              <span className="text-inherit capitalize">{key}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex flex-row justify-end items-center gap-2">
        <button
          className="min-w-28 px-2 py-1.5 flex flex-row items-center gap-1 rounded-md bg-blue-500 hover:bg-blue-400"
          onClick={handleCreate}
        >
          <IoMdCheckboxOutline className="w-5 h-5 fill-white" />
          <span className="text-white">New Task</span>
        </button>
      </div>
    </div>
  );
};

export default TaskToolbar;
