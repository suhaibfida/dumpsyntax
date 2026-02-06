interface button {
  type: string;
}
export const Button = ({ type }: button) => {
  return (
    <>
      <button className="w-3xs p-3 rounded-xl bg-gray-900 font-bold">
        Signup
      </button>
    </>
  );
};
