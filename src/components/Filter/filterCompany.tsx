import { ListBulletIcon } from "@heroicons/react/24/outline";
import FilterItem from "./filter-item";
import { useCompanyFilter } from "@/contexts/FilterCompanyContext";

export default function FilterCompany() {
  const { companyFilterConfig, setCompanyFilterConfig } = useCompanyFilter();

  return (
    <div className="card px-2 w-64 h-full flex flex-col shadow-lg min-w-[256px]">
      <h3 className="p-2 border-b border-gray-100">Search</h3>
      <div className="flex-1 flex flex-col gap-0 p-2 overflow-auto">
        <FilterItem
          icon={<ListBulletIcon className="w-4 h-4" />}
          title="Company Name"
        >
          <input
            type="text"
            className="input-primary w-full"
            value={companyFilterConfig.company}
            onChange={(e) => {
              setCompanyFilterConfig({
                ...companyFilterConfig,
                company: e.target.value,
              });
            }}
          />
        </FilterItem>
        <FilterItem
          icon={<ListBulletIcon className="w-4 h-4" />}
          title="Location"
        >
          <div className="">
            <label htmlFor="country" className="text-xs">
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              className="input-primary w-full"
              value={companyFilterConfig.country}
              onChange={(e) => {
                setCompanyFilterConfig({
                  ...companyFilterConfig,
                  country: e.target.value,
                });
              }}
            />
          </div>
          <div className="">
            <label htmlFor="state" className="text-xs">
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              className="input-primary w-full"
              value={companyFilterConfig.state}
              onChange={(e) => {
                setCompanyFilterConfig({
                  ...companyFilterConfig,
                  state: e.target.value,
                });
              }}
            />
          </div>
          <div className="">
            <label htmlFor="city" className="text-xs">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className="input-primary w-full"
              value={companyFilterConfig.city}
              onChange={(e) => {
                setCompanyFilterConfig({
                  ...companyFilterConfig,
                  city: e.target.value,
                });
              }}
            />
          </div>
          <div className="">
            <label htmlFor="street-address" className="text-xs">
              Street Address
            </label>
            <input
              id="street-address"
              name="street-address"
              type="text"
              className="input-primary w-full"
              value={companyFilterConfig.streetAddress}
              onChange={(e) => {
                setCompanyFilterConfig({
                  ...companyFilterConfig,
                  streetAddress: e.target.value,
                });
              }}
            />
          </div>
        </FilterItem>
        {/* <FilterItem
          icon={<ListBulletIcon className="w-4 h-4" />}
          title="Employees"
        >
          <Select
            value={companyFilterConfig.employee}
            onChange={(value) =>
              setCompanyFilterConfig({
                ...companyFilterConfig,
                employee: value,
              })
            }
            options={employeeOptions}
            isMultiple={true}
            primaryColor="lightgreen"
            classNames={{
              menuButton: (value) => {
                const isDisabled = value?.isDisabled;
                return `flex text-xs text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                }`;
              },
              menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-xs text-gray-700",
              listItem: (value) => {
                const isSelected = value?.isSelected;
                return `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                  isSelected
                    ? `text-white bg-blue-500`
                    : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                }`;
              },
              searchBox:
                "text-xs w-full py-2 pl-8 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none",
              searchIcon: "absolute w-4 h-4 mt-2.5 pb-0.5 ml-1.5 text-gray-500",
            }}
          ></Select>
        </FilterItem> */}
        <FilterItem
          icon={<ListBulletIcon className="w-4 h-4" />}
          title="Industry"
        >
          <input
            type="text"
            className="input-primary w-full"
            value={companyFilterConfig.industry}
            onChange={(e) => {
              setCompanyFilterConfig({
                ...companyFilterConfig,
                industry: e.target.value,
              });
            }}
          />
        </FilterItem>
      </div>
    </div>
  );
}
