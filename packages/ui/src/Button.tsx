interface ButtonProps {
  type?: "button" | "submit" | "reset";
}
export const Button = ({ type }: ButtonProps) => {
  return (
    <>
      <button
        className="w-3xs p-3 rounded-xl bg-gray-900 font-bold"
        type={type}
      >
        Signup
      </button>
    </>
  );
};
