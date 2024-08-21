import NavTitle from "@/components/Nav/Title";
import { ROUTE_LEADS } from "@/data/routes";
import Leads from "@/views/leads";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_LEADS}>Leads</Link>
      </NavTitle>
      <div className="relative py-10 px-8 flex-1 bg-gray-100 overflow-auto">
        <div className="min-h-full overflow-auto flex flex-col">
          <Leads />
        </div>
      </div>
    </>
  );
}
