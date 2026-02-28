import { Navbar } from "./Navbar";
import { Button } from "@repo/ui/Button";
import { Down } from "@repo/ui/Down";
export const HomePage = () => {
  return (
    <>
      <div className="flex bg-gradient-to-b from-black to-purple-900 items-center justify-center flex-col h-screen text-white">
        <Navbar />
        <div className="w-3xl ml-17  space-y-5">
          <div className=" font-bold text-5xl text-gray-200 ml-1">
            Welcome to <span className="text-purple-700">D</span>ump
            <span className="text-purple-700">{"</>"}</span>
            Synta<span className="text-purple-700">x</span>
          </div>
          <div className="font-mono text-xl w-140 ml-20 text-gray-300">
            A real-time collaboration platform enabling live{" "}
            <span className="pl-7 text-xl">
              document editing and instant communication.{" "}
            </span>
          </div>
        </div>
        <div>
          <Down />
        </div>
        <div>
          <Button
            className="bg-black  text-
            xl rounded-full border-purple-400 font-mono"
            type="submit"
          >
            Create Live Document{" "}
            <span className="inline-block translate-y-0.5 text-2xl text-purple-300">
              ➤
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};
