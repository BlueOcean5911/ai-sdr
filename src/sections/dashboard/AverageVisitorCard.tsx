import Select from "@/components/extends/Select/default";
import { timeIntervals } from "@/data/timeIntervals";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

export default function AverageVisitorCard() {
  return (
    <>
      <div className="card h-full w-full flex flex-col">
        <div className="flex justify-between">
          <h2>Average visitor</h2>
          <Select data={timeIntervals} />
        </div>
        <p className="text-4xl font-bold">
          560.395
          <span className="text-base text-gray-150">&nbsp;/&nbsp;User</span>
        </p>
        <div className="w-full flex-1"></div>
        <div className="flex-center gap-4">
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-green-900" />
            <span>Current</span>
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-100" />
            <span>Last Month</span>
          </div>
          <div className="flex gap-2">
            <span>20%</span>
            <ArrowTrendingUpIcon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </>
  );
}
