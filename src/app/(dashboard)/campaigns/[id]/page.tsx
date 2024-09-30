import ComingSoon from "@/components/coming-soon";

export default function Page() {
  return (
    <>
      <div className="relative p-2 flex flex-1 items-center bg-gray-100 overflow-auto">
        <div className="flex flex-1 flex-col overflow-auto">
          <ComingSoon />
        </div>
      </div>
    </>
  );
}
