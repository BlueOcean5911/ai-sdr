import NavTitle from "@/components/Nav/Title";
import { ROUTE_CATENCES } from "@/data/routes";
import Cadences from "@/views/cadences";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_CATENCES}>Cadences</Link>
      </NavTitle>
      <div className="relative py-10 px-8 flex-1 bg-gray-100 overflow-auto">
        <div className="min-h-full overflow-auto flex flex-col">
          <Cadences />
        </div>
      </div>
    </>
  );
}