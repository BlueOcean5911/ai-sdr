import DashboardCard from "./dashboard-card";
import { formatPercentage } from "@/utils/format";
export default function ConversationRateCard() {
  return (
    <>
      <DashboardCard text="Total Sales" value={formatPercentage(5.2, false)} />
    </>
  );
}
