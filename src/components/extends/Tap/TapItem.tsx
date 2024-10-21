import { classNames } from "@/utils";
import Link from "next/link";
import React from "react";

const TapItem = ({
  content,
  link,
  active = false,
}: {
  content: string | React.ReactNode;
  link: string;
  active?: boolean;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <>
      <Link href={link}>
        <span
          className="flex flex-col rounded-md text-sm hover:bg-gray-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span
            className={classNames(
              "p-1.5 cursor-pointer font-semibold",
              active && "text-blue-500 hover:text-blue-400"
            )}
          >
            {content}
          </span>
          <span
            className="w-full border-b-2 border-blue-500 transition-all duration-400"
            style={{ width: isHovered ? "100%" : !active ? "0%" : "" }}
          />
        </span>
      </Link>
    </>
  );
};

export default TapItem;
