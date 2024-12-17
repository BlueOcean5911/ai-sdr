import { classNames } from "@/utils";
import Link from "next/link";
import React from "react";

const TapItem = ({
  content,
  link,
  icon,
  active = false,
}: {
  content: string | React.ReactNode;
  link: string;
  icon?: React.ReactNode;
  active?: boolean;
}) => {
  return (
    <>
      <Link href={link}>
        <button
          className={`
                group inline-flex items-center px-1 py-1   text-sm font-medium border-b-2 hover:border-gray-300 
                ${
                  active
                    ? "border-blue-400 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }
              `}
        >
          <span
            className={`
                inline-flex items-center gap-2 transition-colors duration-200
                ${
                  active
                    ? "text-blue-400 stroke-blue-400"
                    : "text-gray-400 group-hover:text-gray-400"
                }
              `}
          >
            {React.cloneElement(icon as React.ReactElement, {
              className: `w-4 h-4 ${
                active
                  ? "fill-blue-400 stroke-blue-400"
                  : "text-gray-400 group-hover:text-gray-400"
              }`,
            })}
            {content}
          </span>
        </button>
      </Link>
    </>
  );
};

export default TapItem;
