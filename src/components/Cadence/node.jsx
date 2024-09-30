import React from "react";
import { Handle, Position } from "@xyflow/react";
import { PhoneIcon, PlayIcon } from "@heroicons/react/24/outline";

//custome node
const Node = ({ data, selected, icon, title, description, children }) => {
  return (
    <div
      className={`shadow-md rounded-md bg-white border-solid border-2 ${
        selected
          ? "border-solid border-2 border-blue-900"
          : "border-transparent"
      } `}
    >
      <div className="flex flex-col  px-2 py-1 gap-2">
        <div className="max-h-maxtext-left text-black font-bold rounded-t-md flex items-center gap-2">
          {icon}
          <span className="text-gray-600">{title}</span>
        </div>
        <p className="ml-6 text-xs text-blue-500">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default Node;
