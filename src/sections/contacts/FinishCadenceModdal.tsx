"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { LEAD_STAGE } from "@/types/enums";
import { handleError, runService } from "@/utils/service_utils";
import { updateLead } from "@/services/leadService";

interface FinishCadenceModalProps {
  open: boolean;
  onClose: () => void;
  handleMarkAsFinished: (actionIndex: number) => void;
  contactName: string;
  cadenceName: string;
}

const reasons = [
  "Selected contacts replied",
  "Selected contacts expressed interest",
  "Selected contacts unsubscribed",
  "Selected contacts has left the company",
];

const updates = [
  "Update Contact Stage to Replied",
  "Update Contact Stage to Interested",
  "Update Contact Stage to Do Not Contact",
  "Update Contact Stage to Changed Job",
];

export default function FinishCadenceModal({
  open,
  onClose,
  handleMarkAsFinished,
  contactName = "Russell Johnson",
  cadenceName = "Copy",
}: FinishCadenceModalProps) {
  if (!open) return null;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [actionIndex, setActionIndex] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-16 px-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Finish Cadence: {cadenceName} - {contactName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <p className="text-sm text-gray-500">
              We will stop the Cadence for selected contacts.{" "}
              <span className="text-red-500">You cannot undo this action.</span>
            </p>
          </div>

          {/* Why mark as finished section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Why mark as finished?
            </label>
            <p className="text-sm text-gray-500">
              Specifying this will allow Apollo to perform a series of related
              tasks for you.
            </p>

            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50"
              >
                <span>{reasons[actionIndex]}</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                  <div className="py-1">
                    {reasons.map((reason, index) => (
                      <button
                        key={reason}
                        onClick={() => {
                          setActionIndex(index);
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional tasks section */}
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Ok! We will also do the following tasks for you:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-500">
              <li>{updates[actionIndex]}</li>
            </ul>
          </div>

          {/* Action button */}
          <button
            className="mt-4 bg-blue-400 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => handleMarkAsFinished(actionIndex)}
          >
            Mark finished
          </button>
        </div>
      </div>
    </div>
  );
}
