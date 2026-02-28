import { Navbar } from "./Navbar";
import { Button } from "@repo/ui/Button";
import { Down } from "@repo/ui/Down";
export const HomePage = () => {
  return (
    <>
      <div className="flex bg-gradient-to-b from-black to-purple-600 items-center justify-center flex-col h-screen text-white">
        <Navbar />
        <div className="w-3xl ml-10  space-y-5">
          <div className=" font-bold text-5xl text-gray-200 ml-1">
            Welcome to Dump<span className="text-purple-700">{"</>"}</span>
            syntax
          </div>
          <div className="font-mono text-lg w-130 ml-25 text-gray-300">
            A real-time collaboration platform enabling live{" "}
            <span className="pl-7">
              document editing and instant communication.{" "}
            </span>
          </div>
        </div>
        <div>
          <Down />
        </div>
        <div>
          <Button
            className="bg-gradient-to-r from-black to purple-700 text-xl rounded-md font-bold"
            type="submit"
          >
            Create live document
          </Button>
        </div>
      </div>
    </>
  );
};
