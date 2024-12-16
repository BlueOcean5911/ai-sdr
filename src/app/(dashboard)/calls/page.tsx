"use client";
import Link from "next/link";
import { Suspense } from "react";
import { ROUTE_CALLS } from "@/data/routes";
import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { useAuth } from "@/contexts/AuthContext";
import { CallFilterProvider } from "@/contexts/FilterCallContext";
import { CallSelectionProvider } from "@/contexts/CallSelectionContext";
import Calls from "@/views/calls";
import SetupPhone from "@/sections/calls/SetupPhone";

export default function Page() {
  const { me } = useAuth();
  console.log("phone: ", me?.phone);
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_CALLS}>Calls</Link>
      </NavTitle>
      <div className="relative flex flex-1 bg-gray-100 overflow-auto">
        <div className="overflow-auto flex-1 flex flex-col">
          <CallFilterProvider>
            <CallSelectionProvider>
              {me?.phone && me?.phone !== "" ? (
                <Suspense>
                  <Calls />
                </Suspense>
              ) : (
                <SetupPhone />
              )}
            </CallSelectionProvider>
          </CallFilterProvider>
        </div>
      </div>
    </>
  );
}
