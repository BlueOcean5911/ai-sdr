"use client";

import { Switch } from "@headlessui/react";

export default function ToggleButton({
  checked = false,
  handleChange = () => {},
}: {
  checked: boolean;
  handleChange: () => void;
}) {
  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      className="group relative inline-flex h-4 w-7 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 focus:bg-blue-100 data-[checked]:bg-blue-900"
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-3"
      />
    </Switch>
  );
}
