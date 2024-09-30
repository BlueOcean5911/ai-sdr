// app/personas/page.tsx

import Personas from "@/views/personas";

export default function Page() {
  return (
    <>
      <div className="relative py-2 px-2 flex-1 bg-gray-100 overflow-auto">
        <div className="h-full flex flex-col overflow-auto">
          <Personas />
        </div>
      </div>
    </>
  );
}
