import { fetchHubspotCompanies } from "@/services/hubspotIntegrationService";
import { handleError, runService } from "@/utils/service_utils";
import { useEffect, useState } from "react";

const HubspotCompanyTable = () => {
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    const limit: number = 10;
    const offset: number = 0;

    runService(
      { limit, offset },
      fetchHubspotCompanies,
      (data) => {
        console.log("data", data);
        setCompanies(data);
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
              <div className="flex gap-2">Company Name</div>
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
              Current Location
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
              Industry
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {companies.map((company) => (
            <tr
              key={company.id}
              className="even:bg-blue-50 hover:bg-gray-300 cursor-pointer"
            >
              <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                <div className="flex gap-2">{company.name}</div>
              </td>
              <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {company.phone}
              </td>
              <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {company.country}
              </td>
              <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {company.employee}
              </td>
              <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {company.industry}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HubspotCompanyTable;
