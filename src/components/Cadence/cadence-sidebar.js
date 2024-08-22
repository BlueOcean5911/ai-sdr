import { ArchiveBoxIcon, ClockIcon, EnvelopeIcon, PhoneIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function Sidebar({
  nodeName,
  setNodeName,
  selectedNode,
  setSelectedElements,
}) {
  const handleInputChange = (event) => {
    setNodeName(event.target.value);
  };
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="border-r-2 border-blue-200 p-4 text-sm bg-gray-200 rounded-l-md w-64 h-screen text-black">
      {selectedNode ? (
        //settings panel
        <div>
          <h3 className="text-xl mb-2 text-blue-900">Update Node</h3>
          <label className="block mb-2 text-sm font-medium text-blue-900">
            Node Name:
          </label>
          <input
            type="text"
            className="block w-full pt-2 px-3 pb-3 text-gray-700 border border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
            value={nodeName}
            onChange={handleInputChange}
          />
          <button
            className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
            onClick={() => setSelectedElements([])}
          >
            Go Back
          </button>
        </div>
      ) : (
        //node panel
        <>
          <h3 className="text-xl mb-4 text-olive-green-900">Steps</h3>
          <div className="flex flex-col gap-2">
            <div
              className="cadence-navbar"
              onDragStart={(event) => onDragStart(event, "phone-node")}
              draggable
            >
              <PhoneIcon className="w-4 h-4" />
              <span className="pl-4">Phone call</span>

            </div>
            <div
              className="cadence-navbar"
              onDragStart={(event) => onDragStart(event, "email-node")}
              draggable
            >
              <EnvelopeIcon className="w-4 h-4" />
              <span className="pl-4">Email</span>
            </div>
            <div
              className="cadence-navbar"
              onDragStart={(event) => onDragStart(event, "wait-node")}
              draggable
            >
              <ClockIcon className="w-4 h-4" />
              <span className="pl-4">Wait</span>
            </div>
            <div
              className="cadence-navbar"
              onDragStart={(event) => onDragStart(event, "remove-node")}
              draggable
            >
              <XCircleIcon className="w-4 h-4" />
              <span className="pl-4">Remove from Cadence</span>
            </div>
            <div
              className="cadence-navbar"
              onDragStart={(event) => onDragStart(event, "linkedin-node")}
              draggable
            >
              <ArchiveBoxIcon className="w-4 h-4" />
              <span className="pl-4">Linkedin</span>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
