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
      <div className="relative py-2 px-2 flex-1 bg-gray-100 overflow-auto">
        <div className="h-full flex flex-col overflow-auto">
          <Campaigns />
        </div>
      </div>
    </>
  );
}
