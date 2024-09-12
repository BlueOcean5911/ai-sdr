"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";

const Select = ({
  data,
  defaultValue = data[0],
  onChange: handleChange,
  ...others
}: {
  data: any;
  defaultValue?: any;
  onChange?: (item: any) => void;
  [key: string]: any;
}) => {
  console.log("defaultValue", defaultValue);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    if (handleChange) {
      handleChange(selected);
    }
  }, [selected, handleChange]);

  return (
    <div className="min-w-36 w-full" {...others}>
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={clsx(
            "min-h-10 relative block w-full rounded-lg bg-white py-1.5 pr-8 pl-3 text-left text-sm/6 text-gray-900 border-2 border-gray-200",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 text-xs"
          )}
        >
          {selected?.name}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-gray-900 stroke-gray-900"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--button-width)] mt-2 max-h-60 overflow-auto rounded-xl border border-white/5 bg-white shadow-md p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-50"
          )}
        >
          {data.map((item: any) => (
            <ListboxOption
              key={item.name}
              value={item}
              className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-200"
            >
              <CheckIcon className="invisible size-4 fill-gray-900 group-data-[selected]:visible" />
              <div className="text-xs text-gray-900">{item.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default Select;
