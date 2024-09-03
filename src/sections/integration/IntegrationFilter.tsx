import GridIcon from "@/components/Icons/grid.icon";
import { DISPLAY_FLEX, DISPLAY_GRID } from "@/data/variables/constants.data";
import { classNames } from "@/utils";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Item = ({
  text,
  count,
  selected,
  onClick: handleClick,
}: {
  text: string;
  count: number;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={classNames(
        selected ? "bg-blue-900 text-white" : "bg-white text-gray-900",
        "btn-primary text-sm py-2 px-4 rounded-full min-w-24 text-center cursor-pointer w-fit"
      )}
      onClick={() => {
        handleClick();
        console.log("123");
      }}
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
  active: 0,
  options: ["All Integrations", "CRM", "CSV", "Outreach Tools"],
};

export default function IntegrationFilter() {
  const [displayType, setDisplayType] = useState(DISPLAY_FLEX);
  const [filterObject, setFilterObject] = useState({ integrationFilter: 0 });

  const handleIntegrationFilter = (id: number) => {
    setFilterObject({ integrationFilter: id });
  };

  // const handleDisplayType = () => {
  //   if (displayType === DISPLAY_FLEX) {
  //     setDisplayType(DISPLAY_GRID);
  //   } else if (displayType === DISPLAY_GRID) {
  //     setDisplayType(DISPLAY_FLEX);
  //   }
  // };

  return (
    <>
      <div className="flex-center flex-wrap justify-between gap-4">
        <div className="flex gap-4 flex-wrap">
          {integrationFilterData.options.map((item, id) => (
            <Item
              key={id}
              text={item}
              count={9}
              selected={filterObject.integrationFilter === id ? true : false}
              onClick={() => handleIntegrationFilter(id)}
            />
          ))}
        </div>
        {/* <div className="flex-1 float-right">
          <div className="flex rounded-full border-2 border-gray-150 p-1 float-right">
            <div
              className={classNames(
                displayType === DISPLAY_GRID ? "bg-blue-900" : "",
                "w-8 h-8 rounded-full flex-center "
              )}
              onClick={handleDisplayType}
            >
              <GridIcon
                className={classNames(
                  displayType === DISPLAY_GRID ? "stroke-white" : "",
                  "w-6 h-6"
                )}
              />
            </div>
            <div
              className={classNames(
                displayType === DISPLAY_FLEX ? "bg-blue-900" : "",
                "w-8 h-8 rounded-full flex-center"
              )}
              onClick={handleDisplayType}
            >
              <Bars3Icon
                className={classNames(
                  displayType === DISPLAY_FLEX
                    ? "stroke-white fill-white"
                    : "fill-transparent stroke-transparent",
                  "w-6 h-6"
                )}
              />
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
