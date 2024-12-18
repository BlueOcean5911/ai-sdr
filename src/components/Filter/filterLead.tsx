import { ListBulletIcon } from "@heroicons/react/24/outline";
import FilterItem from "./filter-item";
import { useLeadFilter } from "@/contexts/FilterLeadContext";
import { Briefcase, Building2, Factory, MapPin } from "lucide-react";

export default function FilterLead() {
  const { leadFilterConfig, setLeadFilterConfig } = useLeadFilter();

  return (
    <div className="card pt-6 px-2 w-64 h-full flex flex-col shadow-lg min-w-[256px]">
      <h3 className="p-2 border-b border-gray-100">Search</h3>
      <div className="flex-1 flex flex-col gap-0 p-2 border rounded overflow-auto">
        {/* <FilterItem
          icon={<ListBulletIcon className="w-4 h-4" />}
          title="Persona"
        >
          <Select
            value={leadFilterConfig.persona}
            onChange={(value) =>
              setLeadFilterConfig({
                ...leadFilterConfig,
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
        </FilterItem> */}
        <FilterItem icon={<Briefcase className="w-4 h-4" />} title="Job Title">
          <input
            type="text"
            className="input-primary w-full"
            value={leadFilterConfig.title}
            onChange={(e) => {
              setLeadFilterConfig({
                ...leadFilterConfig,
                title: e.target.value,
              });
            }}
          />
        </FilterItem>
        <FilterItem
          icon={<Building2 className="w-4 h-4" />}
          title="Company Name"
        >
          <input
            type="text"
            className="input-primary w-full"
            value={leadFilterConfig.company}
            onChange={(e) => {
              setLeadFilterConfig({
                ...leadFilterConfig,
                company: e.target.value,
              });
            }}
          />
        </FilterItem>
        <FilterItem icon={<MapPin className="w-4 h-4" />} title="Location">
          <div className="">
            <label htmlFor="country" className="text-xs">
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              className="input-primary w-full"
              value={leadFilterConfig.country}
              onChange={(e) => {
                setLeadFilterConfig({
                  ...leadFilterConfig,
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
              value={leadFilterConfig.state}
              onChange={(e) => {
                setLeadFilterConfig({
                  ...leadFilterConfig,
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
              value={leadFilterConfig.city}
              onChange={(e) => {
                setLeadFilterConfig({
                  ...leadFilterConfig,
                  city: e.target.value,
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
            value={leadFilterConfig.employee}
            onChange={(value) =>
              setLeadFilterConfig({
                ...leadFilterConfig,
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
        <FilterItem icon={<Factory className="w-4 h-4" />} title="Industry">
          <input
            type="text"
            className="input-primary w-full"
            value={leadFilterConfig.industry}
            onChange={(e) => {
              setLeadFilterConfig({
                ...leadFilterConfig,
                industry: e.target.value,
              });
            }}
          />
        </FilterItem>
      </div>
    </div>
  );
}
