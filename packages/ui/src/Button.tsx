interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
        className={`w-3xs p-2 rounded-lg bg-gray-200 text-white bg-purple-900 hover:bg-purple-800 cursor-pointer border border-gray-900 font-mono ${className}`}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};
