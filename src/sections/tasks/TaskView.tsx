import { TaskModel } from "@/services/taskService";
import { TASK_STATE } from "@/types/enums";
import { formatDate } from "@/utils/format";

const TaskView = ({
  task,
  handleUpdate,
}: {
  task?: TaskModel;
  handleUpdate: (id: string, type: TASK_STATE) => void;
}) => {
  return (
    <div className="max-w-80 flex flex-1 flex-col bg-gray-100">
      <div className="px-5 flex flex-row justify-between items-center gap-3 bg-white">
        <span className="text-lg font-semibold text-nowrap text-ellipsis overflow-hidden ">
          {task?.title}
        </span>
        <span
          className={`p-1 text-xs capitalize rounded-md ${task?.taskPriority}`}
        >
          {task?.taskPriority}
        </span>
      </div>
      <div className="p-4 flex flex-1 flex-col gap-3 transition-all duration-500">
        <div className="w-full flex flex-1 flex-col gap-3">
          <div className="w-full p-3 flex flex-col gap-3 rounded-md border bg-white">
            <div className="flex flex-row justify-between items-center">
              <span className="font-semibold">Basic Information</span>
            </div>
            <div className="flex flex-row text-sm">
              <span className="w-1/3">Type</span>
              <span className="w-2/3 capitalize">{task?.taskType}</span>
            </div>
            <div className="flex flex-row text-sm">
              <span className="w-1/3">Due Date</span>
              <span className="w-2/3 capitalize">
                {task?.endDate ? formatDate(task.endDate) : "N/A"}
              </span>
            </div>
            <div className="flex flex-row text-sm">
              <span className="w-1/3">Status</span>
              <span className="w-2/3 capitalize">{task?.status}</span>
            </div>
          </div>
          <div className="w-full p-3 flex flex-col gap-3 rounded-md border bg-white">
            <div className="flex flex-row justify-between items-center">
              <span className="font-semibold">Description</span>
            </div>
            <div className="min-h-20 text-sm break-words">{task?.content}</div>
          </div>
        </div>
        <div className="w-full flex flex-row gap-3">
          <button
            className="w-full btn-secondary"
            onClick={() => task && handleUpdate(task?.id, TASK_STATE.SKIPPED)}
          >
            Skip
          </button>
          <button
            className="w-full btn-primary"
            onClick={() => task && handleUpdate(task?.id, TASK_STATE.COMPLETE)}
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
