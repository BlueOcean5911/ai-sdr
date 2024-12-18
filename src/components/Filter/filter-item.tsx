"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterItemProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const FilterItem: React.FC<FilterItemProps> = ({ icon, title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
      >
        <div className="flex items-center gap-2 text-gray-700">
          {icon}
          <span className="font-medium text-sm">{title}</span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {open && (
        <div className="p-3 space-y-3 bg-white">
          <div className="space-y-2 text-sm">{children}</div>
        </div>
      )}
    </div>
  );
};

export default FilterItem;
