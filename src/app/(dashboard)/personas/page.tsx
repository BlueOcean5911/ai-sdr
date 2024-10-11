// app/personas/page.tsx

import Personas from "@/views/personas";

export default function Page() {
  return (
    <>
      <div className="relative flex-1 bg-gray-100 overflow-auto">
        <div className="h-full p-4 flex flex-col overflow-auto shadow-lg">
          <Personas />
        </div>
      </div>
    </>
  );
}
