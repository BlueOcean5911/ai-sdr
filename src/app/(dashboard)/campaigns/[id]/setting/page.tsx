"use client";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <div className="p-2 flex flex-1 bg-gray-100 overflow-auto">
        <div className="flex flex-1 justify-center items-center rounded-md bg-white">
          <div className="p-4 max-w-lg w-full flex flex-col gap-5 rounded-md bg-gray-100">
            <div className="flex flex-col">
              <label htmlFor="title">Title:</label>
              <input id="title" type="text" className="input-primary" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="amount">Amount:</label>
              <input id="amount" type="text" className="input-primary" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="desctiption">Description:</label>
              <input id="desctiption" type="text" className="input-primary" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="status">Status:</label>
              <input id="status" type="text" className="input-primary" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="createdDate">Created Date:</label>
              <input id="createdDate" type="text" className="input-primary" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="creator">Creator:</label>
              <input id="creator" type="text" className="input-primary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
