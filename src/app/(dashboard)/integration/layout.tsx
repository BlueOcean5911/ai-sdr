// app/integration/layout.tsx

import MainCard from "@/components/main-card";
import NavTitle from "@/components/Nav/Title";
import { ROUTE_INTEGRATION } from "@/data/routes";
import Integration from "@/views/integration";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
