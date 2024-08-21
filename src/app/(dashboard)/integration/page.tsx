import MainCard from "@/components/main-card";
import NavTitle from "@/components/Nav/Title";
import { ROUTE_INTEGRATION } from "@/data/routes";
import Integration from "@/views/integration";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_INTEGRATION}>Integration</Link>
      </NavTitle>
      <MainCard>
        <Integration />
      </MainCard>
    </>
  );
}
