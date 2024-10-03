import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_CAMPAIGNS } from "@/data/routes";
import Campaigns from "@/views/campaigns";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_CAMPAIGNS}>Campaigns</Link>
      </NavTitle>
      <div className="relative flex-1 bg-gray-100 overflow-auto">
        <div className="h-full p-4 flex flex-col overflow-auto shadow-lg">
          <Campaigns />
        </div>
      </div>
    </>
  );
}
