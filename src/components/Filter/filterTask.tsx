import { useEffect, useState } from "react";
import {
  ListBulletIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Select from "react-tailwindcss-select";
import DatePicker from "react-datepicker";
import FilterItem from "./filter-item";

import { getMe, getUsers, UserModel } from "@/services/userService";
import { useTaskFilter } from "@/contexts/FilterTaskContext";
import { handleError, runService } from "@/utils/service_utils";
import { priorityOptions, stateOptions } from "@/data/filter.data";
import { AlertTriangle, Calendar, CheckCircle2, User2 } from "lucide-react";

export default function FilterTask() {
  const { taskFilterConfig, setTaskFilterConfig } = useTaskFilter();
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
    <div className="card pt-6 px-2 w-64 h-full flex flex-col rounded-xl bg-white">
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
            placeholder="Search Tasks..."
            value={taskFilterConfig.search}
            onChange={(e) => {
              setTaskFilterConfig((prev) => ({
                ...prev,
                search: e.target.value,
              }));
            }}
            className="flex w-full border-0 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
          />
        </form>
        <div>
          <FilterItem icon={<User2 className="w-4 h-4" />} title="Assignee">
            <Select
              value={taskFilterConfig.fromUser}
              onChange={(value) =>
                setTaskFilterConfig({
                  ...taskFilterConfig,
                  fromUser: value,
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
            icon={<AlertTriangle className="w-4 h-4" />}
            title="Priority"
          >
            <Select
              value={taskFilterConfig.priority}
              onChange={(value) =>
                setTaskFilterConfig({
                  ...taskFilterConfig,
                  priority: value,
                })
              }
              options={priorityOptions}
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
            icon={<CheckCircle2 className="w-4 h-4" />}
            title="Task State"
          >
            <Select
              value={taskFilterConfig.state}
              onChange={(value) =>
                setTaskFilterConfig({
                  ...taskFilterConfig,
                  state: value,
                })
              }
              options={stateOptions}
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
          <FilterItem icon={<Calendar className="w-4 h-4" />} title="Due Date">
            <div className="flex justify-between items-center gap-1">
              <DatePicker
                selected={taskFilterConfig.fromDate}
                placeholderText="From"
                onChange={(date) => {
                  setTaskFilterConfig({
                    ...taskFilterConfig,
                    fromDate: date || undefined,
                  });
                }}
                isClearable
                selectsStart
                startDate={taskFilterConfig.fromDate}
                endDate={taskFilterConfig.toDate}
                maxDate={taskFilterConfig.toDate}
                className="w-[92px] p-1 text-xs rounded-md transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                popperClassName="z-50"
              />
              -
              <DatePicker
                selected={taskFilterConfig.toDate}
                placeholderText="To"
                onChange={(date) => {
                  setTaskFilterConfig({
                    ...taskFilterConfig,
                    toDate: date || undefined,
                  });
                }}
                isClearable
                selectsEnd
                startDate={taskFilterConfig.fromDate}
                endDate={taskFilterConfig.toDate}
                minDate={taskFilterConfig.fromDate}
                className="w-[92px] p-1 text-xs rounded-md transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500/20"
                popperClassName="z-50"
              />
            </div>
          </FilterItem>
        </div>
      </div>
    </div>
  );
}
