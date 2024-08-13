import { formatNumber } from "@/utils/format";
import DashboardCard from "./dashboard-card";

export default function NewLeadsCard() {
  return (
    <>
      <DashboardCard text="New Leads This Month" value={formatNumber(236)} />
    </>
  );
}
