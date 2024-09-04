import { ListBulletIcon } from "@heroicons/react/24/outline";
import FilterItem from "./filter-item";
import { useCadenceFilter } from "@/contexts/FilterCadenceContext";
import Select from "react-tailwindcss-select";
import { personaOptions, employeeOptions } from "@/data/filter.data";

export default function FilterCadence() {
  const { cadenceFilterConfig, setCadenceFilterConfig } = useCadenceFilter();

  return (
    <div className="card p-2 w-64 h-full flex flex-col">
      <h3 className="p-2 border-b-2 border-gray-100">Search</h3>
      <div className="flex-1 flex flex-col gap-2 p-2 overflow-auto">
        <FilterItem
          icon={<ListBulletIcon className="w-4 h-4" />}
          title="Persona"
        >
          <Select
            value={cadenceFilterConfig.persona}
            onChange={(value) =>
              setCadenceFilterConfig({
                ...cadenceFilterConfig,
                persona: value,
              })
            }
            options={personaOptions}
            isMultiple={true}
            isSearchable={true}
            primaryColor={"indigo"}
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
        </FilterItem>
        <FilterItem
          icon={<ListBulletIcon className="w-4 h-4" />}
          title="Job Title"
        >
          <input
            type="text"
            className="input-primary w-full"
            value={cadenceFilterConfig.title}
            onChange={(e) => {
              setCadenceFilterConfig({
                ...cadenceFilterConfig,
                title: e.target.value,
              });
            }}
          />
        </FilterItem>
        <FilterItem
          icon={<ListBulletIcon className="w-4 h-4" />}
          title="Company Name"
        >
          <input
            type="text"
            className="input-primary w-full"
            value={cadenceFilterConfig.company}
            onChange={(e) => {
              setCadenceFilterConfig({
                ...cadenceFilterConfig,
                company: e.target.value,
              });
            }}
          />
        </FilterItem>
        <FilterItem
          icon={<ListBulletIcon className="w-4 h-4" />}
          title="Location"
        >
          <div>
            <label className="text-sm text-gray-500">Country</label>
            <input
              type="text"
              className="input-primary w-full"
              value={cadenceFilterConfig.location}
              onChange={(e) => {
                setCadenceFilterConfig({
                  ...cadenceFilterConfig,
                  location: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">State</label>
            <input
              type="text"
              className="input-primary w-full"
              value={cadenceFilterConfig.location}
              onChange={(e) => {
                setCadenceFilterConfig({
                  ...cadenceFilterConfig,
                  location: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">City</label>
            <input
              type="text"
              className="input-primary w-full"
              value={cadenceFilterConfig.location}
              onChange={(e) => {
                setCadenceFilterConfig({
                  ...cadenceFilterConfig,
                  location: e.target.value,
                });
              }}
            />
          </div>
        </FilterItem>
        <FilterItem
          icon={<ListBulletIcon className="w-4 h-4" />}
          title="Employees"
        >
          <Select
            value={cadenceFilterConfig.employee}
            onChange={(value) =>
              setCadenceFilterConfig({
                ...cadenceFilterConfig,
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
        </FilterItem>
        <FilterItem
          icon={<ListBulletIcon className="w-4 h-4" />}
          title="Industry & Keywords"
        >
          <input
            type="text"
            className="input-primary w-full"
            value={cadenceFilterConfig.keyword}
            onChange={(e) => {
              setCadenceFilterConfig({
                ...cadenceFilterConfig,
                keyword: e.target.value,
              });
            }}
          />
        </FilterItem>
      </div>
    </div>
  );
}
