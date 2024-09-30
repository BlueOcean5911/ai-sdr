"use client";

import { useState } from "react";

export default function CheckBox({
  id,
  content,
  value,
  checked = false,
  onChange: handleClick,
  ...others
}: {
  id: string;
  content: string;
  value?: any;
  checked?: boolean;
  onChange?: (value: any, checked: boolean) => void;
  [key: string]: any;
}) {
  return (
    <div className="flex items-center">
      <div className="cntr">
        <input
          type="checkbox"
          id={id}
          // className="hidden-xs-up input-cbx"
          className="text-blue-500 focus:ring-0"
          checked={checked}
          onChange={(e) => {
            if (handleClick) {
              if (value) {
                handleClick(value, e.target.checked);
              } else {
                handleClick(undefined, e.target.checked);
              }
            }
          }}
        />
        {/* <label htmlFor={id} className="cbx"></label> */}
      </div>
      <label htmlFor={id} className="label-cbx mx-2 cursor-pointer">
        {content}
      </label>
    </div>
  );
}
