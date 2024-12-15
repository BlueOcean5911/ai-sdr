import React, { forwardRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, className = "", ...props }, ref) => {
    return (
      <input
        type="checkbox"
        id={id}
        ref={ref}
        className={`h-4 w-4 rounded border-gray-300 text-blue-600 outline-none focus:ring-transparent ${className}`}
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";
