import { Button } from "@repo/ui/Button";
interface CardProps {
  id: string;
  title: string;
  username: string;
}
import { useNavigate } from "react-router-dom";
export const Card = ({ id, title, username }: CardProps) => {
  const navigate = useNavigate();
  const onClick = async () => {
    navigate("/document/live");
  };
  return (
    <div
      className="group w-90 font-bold text-2xl h-50 text-center text-white rounded-xl border bg-gray-900 border-purple-950 border-3 ml-10 mt-10"
      id={id}
    >
      <div>
        <div className="text-yellow-500 text-sm mb-7">
          <div className="mt-1 pb-3 text-2xl text-gray-200">
            <span className="pl-3 text-blue-300">Title</span> : {title}
          </div>
          <span className="text-blue-300">Created by </span>: {username}
          <div className="text-white pt-3">Code :</div>
          <div className="text-red-300">{id}</div>
        </div>{" "}
      </div>
      <div>
        <Button
          className="w-40 h-10 bg-purple-900 opacity-0 group-hover:opacity-100 transition"
          onClick={onClick}
        >
          Join
        </Button>
      </div>
    </div>
  );
};
