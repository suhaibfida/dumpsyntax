import { Input } from "@repo/ui/Input";
import { Button } from "@repo/ui/Button";
export const Join = () => {
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
            <Input type="text" placeholder="Code" />
          </div>
          <div className="pl-7 pt-10 text-white">
            <Button type="submit">Join</Button>
          </div>
        </div>
      </div>
    </>
  );
};
