"use client";
import Pagination from "@/components/extends/Pagination/Pagination";
import { useTaskFilter } from "@/contexts/FilterTaskContext";
import FilterTask from "@/components/Filter/filterTask";
import TaskToolbar from "@/sections/tasks/TaskToolbar";
import TaskItem from "@/sections/tasks/TaskItem";
import { handleError, runService } from "@/utils/service_utils";
import { getTasks, getTaskTotalCount, TaskModel } from "@/services/taskService";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const tasks: TaskModel[] = [
  {
    id: "1",
    title: "Follow up on project proposal",
    description:
      "Reach out to the client regarding the project proposal sent last week.",
    type: "Email",
    priority: "High",
    status: "Pending",
    assignee: "Alice Johnson",
    dueDate: "2024-09-30",
  },
  {
    id: "2",
    title: "Schedule team meeting",
    description: "Organize a weekly sync-up to discuss project progress.",
    type: "Meet",
    priority: "Medium",
    status: "Pending",
    assignee: "Bob Smith",
    dueDate: "2024-10-02",
  },
  {
    id: "3",
    title: "Call supplier about delivery delay",
    description:
      "Discuss the delay in delivery with the supplier and find a solution.",
    type: "Call",
    priority: "High",
    status: "In Progress",
    assignee: "Charlie Brown",
    dueDate: "2024-09-28",
  },
  {
    id: "4",
    title: "LinkedIn outreach for networking",
    description:
      "Connect with industry professionals on LinkedIn to expand network.",
    type: "LinkedIn",
    priority: "Low",
    status: "Pending",
    assignee: "Dana White",
    dueDate: "2024-10-05",
  },
  {
    id: "5",
    title: "Action item from last meeting",
    description:
      "Complete the action items discussed in the last team meeting.",
    type: "Action",
    priority: "Medium",
    status: "Pending",
    assignee: "Evan Green",
    dueDate: "2024-10-01",
  },
  {
    id: "6",
    title: "Draft email for client feedback",
    description: "Create an email template to request feedback from clients.",
    type: "Email",
    priority: "Medium",
    status: "Pending",
    assignee: "Fiona Blue",
    dueDate: "2024-09-29",
  },
  {
    id: "7",
    title: "Prepare presentation for client meeting",
    description:
      "Create a PowerPoint presentation for the upcoming client meeting.",
    type: "Meet",
    priority: "High",
    status: "In Progress",
    assignee: "George Black",
    dueDate: "2024-10-03",
  },
  {
    id: "8",
    title: "Follow up on sales call",
    description:
      "Call back the potential client who showed interest in our product.",
    type: "Call",
    priority: "High",
    status: "Pending",
    assignee: "Hannah Grey",
    dueDate: "2024-09-27",
  },
  {
    id: "9",
    title: "Connect with alumni on LinkedIn",
    description:
      "Reach out to alumni from university for potential collaborations.",
    type: "LinkedIn",
    priority: "Medium",
    status: "Pending",
    assignee: "Ian Silver",
    dueDate: "2024-10-04",
  },
  {
    id: "10",
    title: "Review project budget",
    description: "Analyze and review the current project budget and expenses.",
    type: "Action",
    priority: "High",
    status: "In Progress",
    assignee: "Julia Red",
    dueDate: "2024-09-30",
  },
  {
    id: "11",
    title: "Send out newsletter email",
    description: "Prepare and send out the monthly newsletter to subscribers.",
    type: "Email",
    priority: "Medium",
    status: "Pending",
    assignee: "Kevin Yellow",
    dueDate: "2024-10-01",
  },
  {
    id: "12",
    title: "Weekly team check-in meeting",
    description:
      "Conduct a weekly check-in meeting with the team to discuss updates.",
    type: "Meet",
    priority: "Medium",
    status: "Pending",
    assignee: "Laura Purple",
    dueDate: "2024-10-02",
  },
  {
    id: "13",
    title: "Discuss project updates via phone",
    description: "Call team members to discuss their project updates.",
    type: "Call",
    priority: "High",
    status: "Pending",
    assignee: "Mike Orange",
    dueDate: "2024-09-29",
  },
  {
    id: "14",
    title: "Engage with LinkedIn posts",
    description: "Like and comment on relevant posts in your LinkedIn feed.",
    type: "LinkedIn",
    priority: "Low",
    status: "Pending",
    assignee: "Nina Pink",
    dueDate: "2024-10-05",
  },
  {
    id: "15",
    title: "Finalize action plan for Q4",
    description: "Create and finalize the action plan for Q4 deliverables.",
    type: "Action",
    priority: "High",
    status: "In Progress",
    assignee: "Oscar Teal",
    dueDate: "2024-10-01",
  },
  {
    id: "16",
    title: "Client follow-up email",
    description: "Send a follow-up email to check on client's satisfaction.",
    type: "Email",
    priority: "Medium",
    status: "Pending",
    assignee: "Paul Brown",
    dueDate: "2024-09-30",
  },
  {
    id: "17",
    title: "Client strategy meeting",
    description: "Schedule a strategy meeting with key clients.",
    type: "Meet",
    priority: "High",
    status: "Pending",
    assignee: "Quinn White",
    dueDate: "2024-10-03",
  },
  {
    id: "18",
    title: "Sales call with new lead",
    description: "Conduct a sales call with a new lead from last week's event.",
    type: "Call",
    priority: "High",
    status: "Pending",
    assignee: "Rachel Green",
    dueDate: "2024-09-28",
  },
  {
    id: "19",
    title: "LinkedIn connection request",
    description: "Send connection requests to potential clients on LinkedIn.",
    type: "LinkedIn",
    priority: "Medium",
    status: "Pending",
    assignee: "Quinn White",
    dueDate: "2024-10-03",
  },
  {
    id: "20",
    title: "Action items review",
    description: "Review all action items from previous meetings",
    type: "Action",
    priority: "High",
    status: "Completed",
    assignee: "Sam Blue",
    dueDate: "2024-09-30",
  },
];

export default function Tasks(
  { campaignId, cadenceId }: { campaignId?: string; cadenceId?: string } = {
    cadenceId: "",
    campaignId: "",
  }
) {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { taskFilterConfig, setTaskFilterConfig } = useTaskFilter();
  // const [tasks, setTasks] = useState<TaskModel[]>([]);
  const currentParams = Object.fromEntries(useSearchParams());

  // const fetchTasks = (params: { [key: string]: string }) => {
  //   runService(
  //     {
  //       offset: 0,
  //       limit: 100,
  //       campaignId: campaignId,
  //       cadenceId: cadenceId,
  //       fromUser: taskFilterConfig.fromUser,
  //       search: taskFilterConfig.search,
  //       params,
  //     },
  //     getTasks,
  //     (data) => {
  //       setTasks(data);
  //     },
  //     (status, error) => {
  //       handleError(status, error);
  //       console.log(status, error);
  //     }
  //   );
  // };

  // const fetchTaskTotalCount = (params: { [key: string]: string }) => {
  //   runService(
  //     {
  //       campaignId: campaignId,
  //       cadenceId: cadenceId,
  //       fromUser: taskFilterConfig.fromUser,
  //       search: taskFilterConfig.search,
  //       params,
  //     },
  //     getTaskTotalCount,
  //     (data) => {
  //       console.log("Task total", data);
  //       setTotalCount(data?.count ? data?.count : 0);
  //     },
  //     (status, error) => {
  //       handleError(status, error);
  //       console.log(status, error);
  //     }
  //   );
  // };

  // useEffect(() => {
  //   fetchTaskTotalCount(currentParams);
  //   fetchTasks(currentParams);
  // }, []);

  // useEffect(() => {
  //   fetchTaskTotalCount(currentParams);
  //   fetchTasks(currentParams);
  // }, [taskFilterConfig, currentPage, pageSize]);

  return (
    <div className="flex gap-2 flex-1 overflow-auto">
      {taskFilterConfig.isOpen && <FilterTask />}
      <div className="card flex-1 flex flex-col overflow-auto">
        <div className="px-6 overflow-auto">
          <TaskToolbar />
        </div>

        {/* Table */}
        <div className="flex flex-1 flex-col w-full py-2 align-middle sm:px-4 lg:px-6 overflow-auto">
          <div className="h-full border rounded-md overflow-auto">
            {tasks.length > 0 ? (
              tasks.map((task: TaskModel) => (
                <TaskItem key={task.id} task={task} />
              ))
            ) : (
              <div className="h-full flex flex-1 justify-center items-center">
                <p>No tasks</p>
              </div>
            )}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-end">
          <Pagination
            className="pagination-bar"
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={(pageSize: number, currentPage: number) => {
              setPageSize(pageSize);
              setCurrentPage(currentPage);
            }}
          />
        </div>
      </div>
    </div>
  );
}
