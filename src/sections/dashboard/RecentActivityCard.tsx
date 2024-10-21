import StatusButton from "@/components/extends/Button/status-button";

const people = [
  {
    "activity-type": "New Lead",
    actor: "John Doe",
    "order-date": "January 20, 2020",
    status: "added",
  },
  {
    "activity-type": "New Lead",
    actor: "John Doe",
    "order-date": "January 20, 2020",
    status: "lunched",
  },
  {
    "activity-type": "New Lead",
    actor: "John Doe",
    "order-date": "January 20, 2020",
    status: "paused",
  },
  // {
  //   "activity-type": "New Lead",
  //   actor: "John Doe",
  //   "order-date": "January 20, 2020",
  //   status: "Paused",
  // },
];

export default function RecentActivityCard() {
  return (
    <div className="card flex-1">
      <h2>Recent Activities</h2>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-150 sm:pl-0"
                    >
                      Activity Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-150"
                    >
                      Actor
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-150"
                    >
                      Order Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-150"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {people.map((person, id) => (
                    <tr key={id} className=" hover:bg-gray-100">
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-900 font-bold sm:pl-0">
                        {person["activity-type"]}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-900 font-bold">
                        {person.actor}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {person["order-date"]}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        <StatusButton status={person.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
