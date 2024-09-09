import ComingSoon from "@/components/coming-soon";
import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_CALLS } from "@/data/routes";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_CALLS}>Setting</Link>
      </NavTitle>
      <div className="relative p-2 flex-1 bg-gray-100 overflow-auto">
        <div className="relative card min-h-full overflow-auto flex flex-col">
          <div className="flex-1 flex-center">
            <ComingSoon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
