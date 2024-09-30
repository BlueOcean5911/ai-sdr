import DashboardCard from "./dashboard-card";
import { formatNumber } from "@/utils/format";
export default function SalesCard() {
  return (
    <>
      <DashboardCard
        text="Total Sales"
        value={formatNumber(526000)}
        rate={3.4}
      />
    </>
  );
}
