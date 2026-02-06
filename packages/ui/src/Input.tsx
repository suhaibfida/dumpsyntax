import React, { forwardRef } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, name, onChange, onBlur }, ref) => {
    return (
      <input
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
