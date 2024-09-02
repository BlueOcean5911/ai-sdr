import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_CAMPAIGNS } from "@/data/routes";
import Campaigns from "@/views/campaigns";
import Link from "next/link";

export default function Page() {
  return (
    <>
      {" "}
      <NavTitle>
        <Link href={ROUTE_CAMPAIGNS}>Campaigns</Link>
      </NavTitle>
      <div className="relative py-10 px-8 flex-1 bg-gray-100 overflow-auto">
        <div className="min-h-full overflow-auto flex flex-col">
          <Campaigns />
        </div>
      </div>
    </>
  );
}
