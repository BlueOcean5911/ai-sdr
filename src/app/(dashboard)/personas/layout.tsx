// app/personas/layout.tsx

import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_PERSONAS } from "@/data/routes";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_PERSONAS}>Personas</Link>
      </NavTitle>
      <>{children}</>
    </>
  );
};

export default Layout;
