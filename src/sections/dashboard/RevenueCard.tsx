import { formatNumber } from "@/utils/format";
import DashboardCard from "./dashboard-card";

export default function RevenueCard() {
  return (
    <>
      <DashboardCard
        text="TotalRevenue"
        value={formatNumber(1287000)}
        rate={-2.5}
      />
    </>
  );
}
