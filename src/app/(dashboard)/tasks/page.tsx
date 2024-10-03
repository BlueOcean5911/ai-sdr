"use client";
import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_CATENCES } from "@/data/routes";
import { TaskFilterProvider } from "@/contexts/FilterTaskContext";
import { TaskSelectionProvider } from "@/contexts/TaskSelectionContext";
import Tasks from "@/views/tasks";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_CATENCES}>Tasks</Link>
      </NavTitle>
      <div className="relative flex flex-1 bg-gray-100 overflow-auto">
        <div className="overflow-auto flex-1 flex flex-col">
          <TaskFilterProvider>
            <TaskSelectionProvider>
              <Suspense>
                <Tasks />
              </Suspense>
            </TaskSelectionProvider>
          </TaskFilterProvider>
        </div>
      </div>
    </>
  );
}
