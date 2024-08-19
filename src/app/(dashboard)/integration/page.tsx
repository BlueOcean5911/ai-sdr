import NavTitle from "@/components/Nav/Title";
import Integration from "@/views/integration";

export default function Page() {
  return (
    <>
      <NavTitle>Integration</NavTitle>
      <div className="relative py-16 px-8 flex-1 bg-gray-100 overflow-auto">
        <div className="min-h-full overflow-auto flex flex-col">
          <Integration />
        </div>
      </div>
    </>
  );
}
