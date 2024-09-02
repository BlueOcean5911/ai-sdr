import NavTitle from "@/components/DashboardLayout/Nav/Title";
import ManageStuff from "@/sections/account/ManageStuff";
import Link from "next/link";
import { ROUTE_ACCOUNT } from "@/data/routes";

export default function Account() {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_ACCOUNT}>Account</Link>
      </NavTitle>
      <div className="relative py-10 px-8 flex-1 bg-gray-100 overflow-auto">
        <div className="min-h-full overflow-auto flex flex-col">
          <ManageStuff />
        </div>
      </div>
    </>
  );
}
