"use client";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  return (
    <>
      <div className="p-2 flex flex-1 bg-gray-100 overflow-auto text-sm">
        <div className="flex flex-1 justify-center items-center rounded-md bg-white">
          <div className="p-8 max-w-lg w-full flex flex-col gap-5 rounded-md bg-gray-100">
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="title">
                Title:
              </label>
              <input id="title" type="text" className="input-primary" />
            </div>
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="amount">
                Amount:
              </label>
              <input id="amount" type="text" className="input-primary" />
            </div>
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="desctiption">
                Description:
              </label>
              <input id="desctiption" type="text" className="input-primary" />
            </div>
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="status">
                Status:
              </label>
              <input id="status" type="text" className="input-primary" />
            </div>
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="createdDate">
                Created Date:
              </label>
              <input id="createdDate" type="text" className="input-primary" />
            </div>
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="creator">
                Creator:
              </label>
              <input id="creator" type="text" className="input-primary" />
            </div>
            <div className="flex items-center gap-4">
              <button
                className="w-full p-2 rounded-md text-white bg-blue-500 hover:bg-blue-400"
                onClick={() => router.push("/campaigns/campaign.id/")}
              >
                Save
              </button>
              <button
                className="w-full p-2 rounded-md bg-gray-300 hover:bg-gray-200"
                onClick={() => router.push("/campaigns/campaign.id/")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
