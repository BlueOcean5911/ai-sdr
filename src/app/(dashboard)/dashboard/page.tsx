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
      <div className="relative py-10 px-8 flex-1 bg-gray-100 overflow-auto flex-1">
        <div className="min-h-full overflow-auto flex flex-col flex-1">
          {/* <Dashboard /> */}
          <ComingSoon />
        </div>
      </div>
    </>
  );
}
