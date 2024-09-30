import ConversationRateCard from "@/sections/dashboard/ConversationRateCard";
import NewLeadsCard from "@/sections/dashboard/NewLeadsCard";
import RevenueCard from "@/sections/dashboard/RevenueCard";
import SalesCard from "@/sections/dashboard/SalesCard";
import TrackChart from "@/sections/dashboard/TrackChart";
import { trackData } from "@/data/tracks";
import AverageVisitorCard from "@/sections/dashboard/AverageVisitorCard";
import RecentActivityCard from "@/sections/dashboard/RecentActivityCard";
export default function Dashboard() {
  return (
    <div className="min-h-full flex flex-col flex-1 gap-y-4">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <SalesCard />
        <RevenueCard />
        <NewLeadsCard />
        <ConversationRateCard />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-7">
          <TrackChart data={trackData} />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <AverageVisitorCard />
        </div>
      </div>
      <div className="flex flex-1">
        <RecentActivityCard />
      </div>
    </div>
  );
}
