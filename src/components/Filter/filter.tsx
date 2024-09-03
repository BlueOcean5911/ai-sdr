import { ListBulletIcon } from "@heroicons/react/24/outline";
import FilterItem from "./filter-item";
import { useLeadFilter } from "@/contexts/FilterLeadContext";
import Select from "react-tailwindcss-select";
import { useState } from "react";

export default function FilterLead() {
  const { leadFilterConfig, setLeadFilterConfig } = useLeadFilter();

  const personaOptions = [
    { value: "CEO", label: "CEO" },
    { value: "Sales Manager", label: "Sales Manager" },
    { value: "Product Manager", label: "Product Manager" },
  ];

  const employeeOptions = [
    { value: "1-10", label: "1-10" },
    { value: "11-20", label: "11-20" },
    { value: "21-50", label: "21-50" },
    { value: "51-100", label: "51-100" },
    { value: "101-200", label: "101-200" },
    { value: "201-500", label: "201-500" },
    { value: "501-1000", label: "501-1000" },
    { value: "1001-2000", label: "1001-2000" },
    { value: "2001-5000", label: "2001-5000" },
    { value: "5001-10000", label: "5001-10000" },
    { value: "10001+", label: "10001+" },
  ];

  return (
    <div className="card p-2 w-64 h-full flex flex-col">
      <h3 className="p-2 border-b-2 border-gray-100">Search</h3>
      <div className="flex-1 flex flex-col gap-2 p-2 overflow-auto">
        <FilterItem
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
          title="Job Title"
        >
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
          icon={<ListBulletIcon className="w-4 h-4" />}
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
        <FilterItem
          icon={<ListBulletIcon className="w-4 h-4" />}
          title="Location"
        >
          <input
            type="text"
            className="input-primary w-full"
            value={leadFilterConfig.location}
            onChange={(e) => {
              setLeadFilterConfig({
                ...leadFilterConfig,
                location: e.target.value,
              });
            }}
          />
        </FilterItem>
        <FilterItem
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
        </FilterItem>
        <FilterItem
          icon={<ListBulletIcon className="w-4 h-4" />}
          title="Industry & Keywords"
        >
          <input
            type="text"
            className="input-primary w-full"
            value={leadFilterConfig.keyword}
            onChange={(e) => {
              setLeadFilterConfig({
                ...leadFilterConfig,
                keyword: e.target.value,
              });
            }}
          />
        </FilterItem>
      </div>
    </div>
  );
}
