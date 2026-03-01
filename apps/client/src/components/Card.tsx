interface CardProps {
  doc?: string;
}
export const Card = ({ doc }: CardProps) => {
  return (
    <div className="w-90 h-50 text-center text-white rounded-xl border bg-gray-400 border-purple-950 border-3 ml-10 mt-10">
      {doc}
    </div>
  );
};
