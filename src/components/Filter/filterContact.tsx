import {
  ListBulletIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import FilterItem from "./filter-item";
import { useContactFilter } from "@/contexts/FilterContactContext";
import Select from "react-tailwindcss-select";
import { cadenceStatusOptions, cadenceStepOptions } from "@/data/filter.data";
import { useEffect, useState } from "react";
import { handleError, runService } from "@/utils/service_utils";
import { getMe, getUsers, UserModel } from "@/services/userService";
import { leadStatusInCadenceOptions } from "@/data/filter.data";

export default function FilterContact() {
  const { contactFilterConfig, setContactFilterConfig } = useContactFilter();
  const [fromUserOption, setFromUserOption] = useState([]);
  const fetchUsers = () => {
    runService(
      undefined,
      getUsers,
      (users) => {
        const usersOption = users.map((user: UserModel) => ({
          value: user.id,
          label: user.firstName + " " + user.lastName,
        }));
        setFromUserOption(usersOption);
      },
      (status, error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="card pt-6 px-2 w-64 h-full flex flex-col shadow-lg min-w-[256px]">
      <h3 className="p-2 border-b border-gray-100">Search</h3>
      <div className="flex-1 flex flex-col gap-2 p-2 border rounded overflow-auto">
        <form action="#" method="GET" className="flex px-3 pt-2 items-center">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none h-5 w-5 text-gray-400"
          />
          <input
            id="search-field"
            name="search"
            type="search"
            placeholder="Search Contacts..."
            value={contactFilterConfig.search}
            onChange={(e) => {
              setContactFilterConfig((prev) => ({
                ...prev,
                search: e.target.value,
              }));
            }}
            className="flex w-full border-0 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
          />
        </form>
        <div>
          <FilterItem
            icon={<ListBulletIcon className="w-4 h-4" />}
            title="Assignee"
          >
            <Select
              value={contactFilterConfig.owners}
              onChange={(value) =>
                setContactFilterConfig({
                  ...contactFilterConfig,
                  owners: value,
                })
              }
              options={fromUserOption}
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
                searchIcon:
                  "absolute w-4 h-4 mt-2.5 pb-0.5 ml-1.5 text-gray-500",
              }}
            ></Select>
          </FilterItem>
          <FilterItem
            icon={<ListBulletIcon className="w-4 h-4" />}
            title="Cadence Step"
          >
            <Select
              value={contactFilterConfig.cadenceSteps}
              onChange={(value) =>
                setContactFilterConfig({
                  ...contactFilterConfig,
                  cadenceSteps: value,
                })
              }
              options={cadenceStepOptions}
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
                searchIcon:
                  "absolute w-4 h-4 mt-2.5 pb-0.5 ml-1.5 text-gray-500",
              }}
            ></Select>
          </FilterItem>
          <FilterItem
            icon={<ListBulletIcon className="w-4 h-4" />}
            title="Contact State"
          >
            <Select
              value={contactFilterConfig.contactStates}
              onChange={(value) =>
                setContactFilterConfig({
                  ...contactFilterConfig,
                  contactStates: value,
                })
              }
              options={leadStatusInCadenceOptions}
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
                searchIcon:
                  "absolute w-4 h-4 mt-2.5 pb-0.5 ml-1.5 text-gray-500",
              }}
            ></Select>
          </FilterItem>
        </div>
      </div>
    </div>
  );
}
