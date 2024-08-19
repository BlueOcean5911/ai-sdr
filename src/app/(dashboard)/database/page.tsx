import NavTitle from "@/components/Nav/Title";
import DataManagement from "@/views/DataManagement";

export default function Page() {
  return (
    <>
      <NavTitle>Data Management</NavTitle>
      <div className="relative py-10 px-8 flex-1 bg-gray-100 overflow-auto">
        <div className="min-h-full overflow-auto flex flex-col">
          <DataManagement />
        </div>
      </div>
    </>
  );
}
