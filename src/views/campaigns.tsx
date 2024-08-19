import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

const campaigns = [
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
  {
    id: "M909",
    name: "Lindsay Walton",
    goal: "Generate Leads",
    creator: "John Doe",
    createdDate: "2024/08/12",
    status: "Active",
  },
];

export default function Campaigns() {
  return (
    <div className="card mt-8 p-4 flex flex-col flex-1">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <form action="#" method="GET" className="relative hidden md:flex ">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            />
            <input
              id="search-field"
              name="search"
              type="search"
              placeholder="Search..."
              className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            />
          </form>
          <div className="flex flex-4 gap-4">
            <div className="btn-secondary flex-center gap-2 p-2">
              <EllipsisVerticalIcon className="w-4 h-4" />
              <span>Bulk Auction</span>
            </div>
            <div className="btn-primary flex-center gap-2 p-2">
              <PlusCircleIcon className="w-4 h-4 stroke-white" />
              Build Campaign
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-4 sm:px-6 lg:px-8 flex-1">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Goal
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Creator
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {campaigns.map((campaign) => (
                    <tr
                      key={campaign.id}
                      className="even:bg-olive-green-100 hover:bg-gray-100 "
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 rounded-l-md">
                        {campaign.id}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {campaign.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.goal}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.creator}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.createdDate}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.status}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3 rounded-r-md">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {campaign.name}</span>
                        </a>
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
