import Image from "next/image";

const navs = [
  { color: "bg-green-500", content: "Willing to meet", count: 0 },
  { color: "bg-sky-500", content: "Follow-up question", count: 0 },
  { color: "bg-indigo-500", content: "Referred to other person", count: 0 },
  { color: "bg-orange-500", content: "Out of office", count: 0 },
  { color: "bg-red-500", content: "Not the right person", count: 0 },
  { color: "bg-gray-500", content: "Not interested", count: 0 },
  { color: "bg-pink-500", content: "Unsubscribed", count: 0 },
  { color: "bg-slate-200", content: "Uncategorized", count: 0 },
];

export default function Page() {
  return (
    <>
      <div className="flex flex-1 flex-row gap-2">
        <div className="w-80 px-4 py-6 flex flex-col gap-4 gap rounded-md border">
          <div className="flex flex-row justify-between gap-2 text-sm">
            <span>All messages</span>
            <span className="text-xs">0</span>
          </div>
          <span>STATUS</span>
          {navs.map((nav, idx) => (
            <div key={idx} className="flex flex-row items-center gap-2 text-sm">
              <span className={`w-2 h-2 rounded-full ${nav.color}`} />
              <span className="grow">{nav.content}</span>
              <span className="text-xs">{nav.count}</span>
            </div>
          ))}
        </div>
        <div className="p-2 flex flex-1 rounded-md border">
          <div className="flex flex-1 flex-col justify-center items-center text-center gap-2">
            <Image
              src={"/assets/images/nodata.svg"}
              alt={"nodata"}
              width={120}
              height={120}
            />
            <span>No new messages</span>
            <span className="w-1/2 text-xs">
              You'll see new email message here whenever they come in.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
