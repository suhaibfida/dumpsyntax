import { Input } from "@repo/ui/Input";
import { Button } from "@repo/ui/Button";
import { apiJoin } from "./api/api.ts";
import { useNavigate } from "react-router-dom";
interface Ref {
  inpRef: React.RefObject<HTMLInputElement | null>;
}
const api_url = import.meta.env.VITE_API_URL;
export const Join = ({ inpRef }: Ref) => {
  const navigate = useNavigate();

  const onClick = async () => {
    const response = await fetch(`${api_url}/me`, {
      method: "get",
      credentials: "include",
    });
    if (!response.ok) {
      return;
    }
    if (!inpRef.current) {
      return;
    }
    const value = inpRef.current.value;
    if (!value) {
      throw new Error("Failed Operation");
    }
    try {
      const response = await apiJoin({ data: value });
      console.log(response);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-black to-purple-500">
        <div className="flex fixed top-0 left-3 w-15">
          <img className=" rouned-xl" src="./../../dump.svg" />
          <span className="pt-7 text-gray-300 text-2xl font-bold">
            <span className=" font-bold text-3xl pr-1">
              <span className="text-4xl text-purple-600">D</span>
              <span className="font-mono">ump</span>
            </span>
            <span className="text-purple-600">{"</>"}</span>
          </span>
          <div className="flex fixed bottom-5 left-5 lg:top-5 lg:right-10 lg:left-auto lg:bottom-auto"></div>
        </div>
        <div className="flex-col pt-5 h-96 w-80 backdrop-blur-xl bg-black/50 rounded-xl border border-gray-500">
          <div className="font-bold pl-22 text-xl underline text-purple-500">
            Join Document
          </div>
          <div className="text-gray-300 pl-10 pb-1 pt-15 text-md font-mono">
            {" "}
            Enter the document code :
          </div>
          <div className="pl-7 pt-2 text-white">
            <Input ref={inpRef} type="text" placeholder="Code" />
          </div>
          <div className="pl-28 pt-10 text-white">
            <Button
              className="border-purple-500 pl-5 pr-5"
              type="submit"
              onClick={onClick}
            >
              Join
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
