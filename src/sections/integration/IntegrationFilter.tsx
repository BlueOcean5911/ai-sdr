import GridIcon from "@/components/Icons/grid.icon";
import { classNames } from "@/utils";
import { Bars3Icon } from "@heroicons/react/24/solid";

const Item = ({
  text,
  count,
  selected,
}: {
  text: string;
  count: number;
  selected: boolean;
}) => {
  return (
    <div
      className={classNames(
        selected ? "bg-olive-green-900 text-white" : "bg-white text-gray-900",
        "btn-primary text-sm py-2 px-4 rounded-full min-w-24 text-center cursor-pointer w-fit"
      )}
    >
      {text}
      {selected ? (
        <span className="ml-2 px-3 w-4  rounded-full bg-white text-gray-900 p-1">
          {count}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

const integrationFilterData = {
  active: "All Integrations",
  options: [
    "All Integrations",
    "CMS",
    "Storage",
    "Social Media",
    "Email Marketing",
  ],
};

export default function IntegrationFilter() {
  return (
    <>
      <div className="flex-center flex-wrap justify-between gap-4">
        <div className="flex gap-4 flex-wrap">
          {integrationFilterData.options.map((item) => (
            <Item
              text={item}
              count={9}
              selected={integrationFilterData.active === item ? true : false}
            />
          ))}
        </div>
        <div className="flex-1 float-right">
          <div className="flex rounded-full border-2 border-gray-150 p-1 float-right">
            <div className="w-8 h-8 rounded-full flex-center bg-olive-green-900">
              <GridIcon className="w-6 h-6 stroke-white" />
            </div>
            <div className="w-8 h-8 rounded-full flex-center text-gray-900">
              <Bars3Icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
