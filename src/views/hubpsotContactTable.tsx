import { fetchHubspotContacts } from "@/services/hubspotIntegrationService";
import { handleError, runService } from "@/utils/service_utils";
import { useEffect, useState } from "react";

const HubspotContactTable = () => {
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    const limit: number = 10;
    const offset: number = 0;

    runService(
      { limit, offset },
      fetchHubspotContacts,
      (data) => {
        setContacts(data);
      },
      (statusCode, error) => {
        handleError(statusCode, error);
      }
    );
  }, []);

  return (
    <div className="flex-1 overflow-auto border-2 p-2 rounded-md min-h-full">
      <table className="min-w-full divide-y divide-gray-300 overflow-auto">
        <thead className="bg-white">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
            >
              <div className="flex gap-2">First Name</div>
            </th>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
            >
              <div className="flex gap-2">Last Name</div>
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Job Title
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Phone
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Country
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Company
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {contacts.map((contact) => (
            <tr
              key={contact.id}
              className="even:bg-blue-50 hover:bg-gray-300 cursor-pointer"
            >
              <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {contact.firstName}
              </td>
              <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {contact.lastName}
              </td>
              <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {contact.jobTitle}
              </td>
              <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {contact.email}
              </td>
              <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {contact.phone}
              </td>
              <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {contact.country}
              </td>
              <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {contact.company}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HubspotContactTable;
