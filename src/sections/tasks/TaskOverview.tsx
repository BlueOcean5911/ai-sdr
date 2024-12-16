import OverviewLayout from "@/layouts/OverviewLayout";
import LeadView from "@/sections/leads/LeadView";
import { LeadModelWithCompanyModel } from "@/services/leadService";
import { TaskModel } from "@/services/taskService";
import { TASK_STATE } from "@/types/enums";
import TaskView from "./TaskView";

const TaskOverview = ({
  show,
  task,
  lead,
  handleUpdate,
  handleClose,
}: {
  show: boolean;
  task?: TaskModel;
  lead?: LeadModelWithCompanyModel;
  handleUpdate: (id: string, type: string, value: TASK_STATE | string) => void;
  handleClose: () => void;
}) => {
  return (
    <OverviewLayout
      show={show}
      handleClose={handleClose}
      linkHref={`/tasks/${task?.id}`}
      width="w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-2/3 max-w-6xl"
    >
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r">
          <TaskView task={task} handleUpdate={handleUpdate} />
        </div>
        <div className="w-full lg:w-2/3">
          <LeadView lead={lead} />
        </div>
      </div>
    </OverviewLayout>
  );
};

export default TaskOverview;
