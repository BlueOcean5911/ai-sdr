import { TaskModel } from "@/services/taskService";
import { formatDateTimeReadable } from "@/utils/format";

const TaskView = ({ task }: { task?: TaskModel }) => {
  return (
    <div className="max-w-80 flex flex-1 flex-col">
      <div className="px-5 flex flex-row items-center gap-3">
        <span className="text-lg font-semibold text-nowrap text-ellipsis overflow-hidden ">
          {task?.title}
        </span>
      </div>
      <div className="px-5 py-1.5">
        <span
          className={`p-1 text-xs capitalize rounded-md ${task?.taskPriority}`}
        >
          {task?.taskPriority}
        </span>
      </div>
      <div className="p-4 flex flex-1 flex-col lg:flex-row gap-3 bg-gray-100 transition-all duration-500">
        <div className="w-full flex flex-col gap-3">
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
                {task?.endDate ? formatDateTimeReadable(task.endDate) : "N/A"}
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
      </div>
    </div>
  );
};

export default TaskView;
