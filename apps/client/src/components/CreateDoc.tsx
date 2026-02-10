import { Input } from "@repo/ui/Input";
import { Button } from "@repo/ui/Button";
export const CreateDoc = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="flex-col pt-5 h-96 w-80 backdrop-blur-xl bg-white/7 rounded-xl border border-gray-500">
          <div className="font-bold pl-22 text-xl underline text-purple-500">
            Create Document
          </div>
          <div className="text-gray-300 pl-5 pb-1 pt-15 text-md font-mono">
            {" "}
            Enter the name of the document:
          </div>
          <div className="pl-7 pt-2 text-white">
            <Input type="text" placeholder="Title" />
          </div>
          <div className="pl-7 pt-7 text-white">
            <Button type="submit">Create</Button>
          </div>
        </div>
      </div>
    </>
  );
};
