// app/integration/excel/layout.tsx

import MainCard from "@/components/main-card";
import NavTitle from "@/components/Nav/Title";
import { ROUTE_INTEGRATION, ROUTE_INTEGRATION_EXCEL } from "@/data/routes";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {" "}
      <NavTitle>
        <Link href={ROUTE_INTEGRATION} className="hover:underline">
          Integration
        </Link>
        &nbsp;/&nbsp;
        <Link href={ROUTE_INTEGRATION_EXCEL} className="hover:underline">
          Excel
        </Link>
      </NavTitle>
      <MainCard>{children}</MainCard>
    </>
  );
};

export default Layout;
