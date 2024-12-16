"use client";
import { useEffect, useState } from "react";
import { TaskModel } from "@/services/taskService";
import { TASK_STATE } from "@/types/enums";
import { formatDate } from "@/utils/format";
import { Info, Calendar, CheckCircle, Clock } from "lucide-react";
import Tag from "@/components/ui/tag";

const TaskView = ({
  task,
  handleUpdate,
}: {
  task?: TaskModel;
  handleUpdate: (id: string, type: string, value: TASK_STATE | string) => void;
}) => {
  const [content, setContent] = useState<string>(task?.content || "");

  useEffect(() => {
    setContent(task?.content || "");
  }, [task]);

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Info className="w-8 h-8 text-gray-400" />
        <p className="text-sm text-gray-400">No task selected</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-white">
      <header className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            {task.title}
          </h1>
          <Tag
            color={
              task.taskPriority === "high"
                ? "bg-red-100 text-red-800"
                : task.taskPriority === "medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }
          >
            {task.taskPriority}
          </Tag>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-gray-600 capitalize">
          {task.taskType} • Due:{" "}
          {task.endDate ? formatDate(task.endDate) : "N/A"}
        </p>
      </header>
      <main className="p-4 space-y-4">
        <section className="bg-white p-4 rounded-lg shadow-sm border">
          <h2 className="text-base font-semibold mb-3">Task Information</h2>
          <div className="space-y-2">
            {[
              {
                icon: Calendar,
                label: "Due Date",
                value: task.endDate ? formatDate(task.endDate) : "N/A",
              },
              { icon: CheckCircle, label: "Status", value: task.status },
              { icon: Clock, label: "Priority", value: task.taskPriority },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-gray-400" />
                <span className="text-xs sm:text-sm text-gray-700">
                  <span className="font-medium">{item.label}:</span>{" "}
                  <span className="capitalize">{item.value}</span>
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-white p-4 rounded-lg shadow-sm border">
          <h2 className="text-base font-semibold mb-3">Description</h2>
          <textarea
            id="content"
            placeholder="Add a description..."
            className="w-full p-2 text-xs sm:text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className="mt-3 py-1 px-3 text-xs sm:text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => handleUpdate(task.id, "content", content)}
          >
            Save Description
          </button>
        </section>
        <section className="bg-white p-4 rounded-lg shadow-sm border">
          <h2 className="text-base font-semibold mb-3">Actions</h2>
          <div className="flex gap-3">
            <button
              className="flex-1 py-1 px-3 text-xs sm:text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={() =>
                handleUpdate(task.id, "status", TASK_STATE.SKIPPED)
              }
            >
              Skip
            </button>
            <button
              className="flex-1 py-1 px-3 text-xs sm:text-sm bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={() =>
                handleUpdate(task.id, "status", TASK_STATE.COMPLETE)
              }
            >
              Complete
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TaskView;
