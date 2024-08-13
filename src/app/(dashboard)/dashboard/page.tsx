import NavTitle from "@/components/Nav/Title";
import Dashboard from "@/views/dashboard";

export default function Page() {
  return (
    <>
      <NavTitle>Dashboard</NavTitle>
      <div className="relative py-10 px-8 flex-1 bg-gray-100 overflow-auto">
        <div className="min-h-full overflow-auto flex flex-col">
          <Dashboard />
        </div>
      </div>
    </>
  );
}
