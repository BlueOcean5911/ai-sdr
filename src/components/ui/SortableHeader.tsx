import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";

const SortableHeader = ({
  label,
  value,
  orderBy,
  isAscending,
  handleChangeSort,
}: {
  label: string;
  value: string;
  orderBy: string;
  isAscending: boolean | undefined;
  handleChangeSort: (value: string) => void;
}) => {
  return (
    <div
      className="py-2 flex flex-row items-center gap-2 text-left text-xs text-gray-500 uppercase tracking-wider cursor-pointer"
      onClick={() => handleChangeSort(value)}
    >
      <span className="text-nowrap text-gray-500">{label}</span>
      <div className="p-1 flex flex-col -space-y-1.5 rounded-md hover:bg-gray-300">
        <TiArrowSortedUp
          className={
            orderBy === value && isAscending === true
              ? "fill-blue-600"
              : "fill-gray-400"
          }
        />
        <TiArrowSortedDown
          className={
            orderBy === value && isAscending === false
              ? "fill-blue-600"
              : "fill-gray-400"
          }
        />
      </div>
    </div>
  );
};

export default SortableHeader;
