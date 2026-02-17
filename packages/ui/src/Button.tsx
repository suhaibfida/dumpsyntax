interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: string;
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
        className={`text-3xl font-bold bg-gray-200 text-white bg-purple-900 hover:bg-purple-800 cursor-pointer border border-gray-900 font-mono ${className}`}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};
