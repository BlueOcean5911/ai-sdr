import { classNames } from "@/utils";

const mapStatusToColor = {
  added: { content: "Added", color: "bg-blue-100 text-blue-900" },
  lunched: { content: "Lunched", color: "bg-green-100 text-green-900" },
  paused: { content: "Paused", color: "bg-yellow-100 text-yellow-900" },
};

export default function StatusButton({ status }: { status: string }) {
  const statusInfo = mapStatusToColor[status] || {
    content: "Unknown",
    color: "gray",
  };

  return (
    <div className={classNames(`${statusInfo.color}`, "flex-center p-2")}>
      {statusInfo.content}
    </div>
  );
}
