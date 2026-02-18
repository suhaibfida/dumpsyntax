import { Input } from "@repo/ui/Input";
import { Button } from "@repo/ui/Button";
import { apiJoin } from "./api.ts";
import { useNavigate } from "react-router-dom";
interface Ref {
  inpRef: React.RefObject<HTMLInputElement | null>;
}
export const Join = ({ inpRef }: Ref) => {
  const navigate = useNavigate();

  const onClick = async () => {
    if (!inpRef.current) {
      return;
    }
    const value = inpRef.current.value;
    if (!value) {
      throw new Error("Failed Operation");
    }
    try {
      await apiJoin({ data: value });
      navigate("/document/live");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="flex-col pt-5 h-96 w-80 backdrop-blur-xl bg-white/7 rounded-xl border border-gray-500">
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
          <div className="pl-7 pt-10 text-white">
            <Button type="submit" onClick={onClick}>
              Join
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
