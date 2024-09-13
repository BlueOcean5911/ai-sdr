import ComingSoon from "@/components/coming-soon";
import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_DASHBOARD } from "@/data/routes";
import Dashboard from "@/views/dashboard";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_DASHBOARD}>Dashboard</Link>
      </NavTitle>
      <div className="relative py-2 px-2 bg-gray-100 overflow-auto flex-1">
        <div className="min-h-full flex flex-1 flex-col justify-center items-center overflow-auto">
          {/* <Dashboard /> */}
          <ComingSoon />
        </div>
      </div>
    </>
  );
}
