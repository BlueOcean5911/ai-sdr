import React from "react";
import { Handle, Position } from "@xyflow/react";
import { ArrowTurnUpRightIcon, PlayIcon } from "@heroicons/react/24/outline";

//custome node
function ExitNode({ data, selected }) {
  return (
    <div
      className={`p-2 bg-olive-green-200 shadow-md rounded-md  border-solid border-2 ${selected ? "border-solid border-2 border-olive-green-900" : "border-transparent"
        } `}
    >
      <div className="flex flex-col">
        <div className="max-h-max px-2 py-1 text-left text-black font-bold rounded-t-md flex-center gap-2">
          <ArrowTurnUpRightIcon className="w-4 h-4 stroke-gray-500" /><span className="text-gray-600">Exit Building Cadence</span>
        </div>
      </div>

      <Handle
        id="b"
        type="target"
        position={Position.Top}
        className="w-1 rounded-full bg-gray-500"
      />
    </div>
  );
}

export default ExitNode;
