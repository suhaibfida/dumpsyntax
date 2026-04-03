import type { ReactNode } from "react";
interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
export const Button = ({
  type,
  children,
  onClick,
  className = "",
  disabled,
}: ButtonProps) => {
  return (
    <>
      <button
        className={`text-xl font-mono   hover:bg-purple-700 ${className} duration-400 ease-in cursor-pointer text-center border border-2  rounded-2xl pl-4 pr-4 pt-2 pb-2 `}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};
