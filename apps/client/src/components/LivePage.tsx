import io, { Socket } from "socket.io-client";
import { TextArea } from "@repo/ui/TextArea";
import { useEffect, useRef } from "react";
export const LivePage = () => {
  const socketRef = useRef<Socket | null>(null);
  const inptRef = useRef<HTMLInputElement>;
  useEffect(() => {
    socketRef.current = io("ws://localhost:8080");
    socketRef.current.on("connection", () => {
      console.log("Connection established successfully");
    });
    socketRef.current.on("get-document", () => {});
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);
  return (
    <>
      <div className="flex bg-black h-screen">
        <TextArea className="bg-gray-800 w-4xl h-3/4 border-2 border-gray-500 mt-20 ml-30 text-gray-300 p-10 font-mono text-xl" />
        <TextArea className="w-90 h-96 mt-20 ml-10 border-2 border-gray-500" />
      </div>
    </>
  );
};
