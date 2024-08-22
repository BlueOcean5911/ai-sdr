import React from "react";
import { Handle, Position } from "@xyflow/react";
import { ClockIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Node from "./node";

//custome node
const WaitNode = ({ data, selected }) => {
    return (
        <Node data={data} selected={selected} title="Wait" description="Step information is incomplete" icon={<ClockIcon className="w-4 h-4 stroke-gray-500" />}>
            <Handle
                id="a"
                type="target"
                position={Position.Top}
                className="w-1 rounded-full bg-slate-500"
            />
            <Handle
                id="b"
                type="source"
                position={Position.Bottom}
                className="w-1 rounded-full bg-gray-500"
            />
        </Node>
    );
}

export default WaitNode;
