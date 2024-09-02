import { ListBulletIcon } from "@heroicons/react/24/outline";
import FilterItem from "./filter-item";
import { useLeadFilter } from "@/contexts/FilterLeadContext";

export default function FilterLead() {
  const { leadFilterConfig, setLeadFilterConfig } = useLeadFilter();
  return (
    <div className="card p-2 w-64 h-full flex flex-col">
      <h3 className="p-2 border-b-2 border-gray-100">Search</h3>
      <div className="flex-1 flex flex-col gap-2 p-2 overflow-auto">
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
          title="Company"
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
      </div>
    </div>
  );
}
