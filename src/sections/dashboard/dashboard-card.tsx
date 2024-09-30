import CardBadge from "@/components/extends/Badge/card-badge";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export default function DashboardCard({
  text,
  value,
  rate = null,
}: {
  text: string;
  value: string;
  rate?: number | null;
}) {
  return (
    <>
      <div className="card flex flex-col gap-2 justify-between">
        <div className="flex-center justify-between">
          <p className="text-gray-150 min-w-36 text-ellipsis overflow-hidden whitespace-nowrap">
            {text}
          </p>
          <EllipsisHorizontalIcon className="w-8 h-8 hover:shadow-md hover:stroke-gray-900 rounded-full transition-all cursor-pointer" />
        </div>
        <div className="flex justify-between flex-wrap">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {rate !== null && rate !== undefined && <CardBadge value={rate} />}
        </div>
      </div>
    </>
  );
}
