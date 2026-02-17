import React, { forwardRef } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type, placeholder, name, onChange, onBlur, value, className = "" },
    ref,
  ) => {
    return (
      <input
        className={`p-3 w-3xs rounded-xl border border-gray-600 ${className}`}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        value={value}
      />
    );
  },
);
