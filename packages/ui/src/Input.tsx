import React, { forwardRef } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, name, onChange, onBlur }, ref) => {
    return (
      <input
        className="p-3 text-center w-3xs rounded-xl border border-gray-600 "
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    );
  },
);
