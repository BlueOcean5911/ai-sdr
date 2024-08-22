import CheckBox from "@/components/CheckBox";
import { Popover, PopoverButton } from "@headlessui/react";

export const SelectablePerson = ({ data }: { data: any }) => {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
          >
            <CheckBox content="" id="1" />
            Personal Name
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Job Titles
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Industry & Keywords
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
            Location
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Employees
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Lead Count
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Edit
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {data.map((item: any, id: any) => (
          <tr
            key={id}
            className="even:bg-olive-green-100 hover:bg-gray-100 select-none"
            // onClick={() => }
          >
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 rounded-l-md">
              {item.name}
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
              {item.jobTitle}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {item.keywords}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {item.createdDate}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {item.location}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {item.industrySize}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {item.leadCount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
