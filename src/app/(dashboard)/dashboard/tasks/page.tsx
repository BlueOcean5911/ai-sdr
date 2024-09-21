"use client";
import { TaskFilterProvider } from "@/contexts/FilterTaskContext";
import { TaskSelectionProvider } from "@/contexts/TaskSelectionContext";
import Tasks from "@/views/tasks";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <div className="flex-1 flex flex-col">
        <TaskFilterProvider>
          <TaskSelectionProvider>
            <Suspense>
              <Tasks />
            </Suspense>
          </TaskSelectionProvider>
        </TaskFilterProvider>
      </div>
    </>
  );
}
