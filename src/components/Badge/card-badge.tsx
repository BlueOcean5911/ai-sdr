import { classNames } from "@/utils";
import { formatPercentage } from "@/utils/format";

export default function CardBadge({ value }: { value: number }) {
  return (
    <div
      className={classNames(
        value > 0 ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900",
        "p-1 px-4 rounded-full text-base"
      )}
    >
      {formatPercentage(value)}
    </div>
  );
}
