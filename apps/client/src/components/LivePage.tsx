import io, { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import Quill, { Delta } from "quill";
import { Input } from "@repo/ui/Input";
import { Button } from "@repo/ui/Button";
import { apiMessage, apiSave } from "./api/api";
import "quill/dist/quill.snow.css";

interface Ref {
  docRef: React.RefObject<HTMLInputElement | null>;
}
export const LivePage = ({ docRef }: Ref) => {
  const socketRef = useRef<Socket | null>(null);
  const quillEdit = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [message, setMessage] = useState<string | "">("");
  const documentRef = useRef<Delta>(null);
  const [messagev, setMessagev] = useState<string[]>([]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    try {
      await apiMessage(message);
    } catch (err) {
      console.log(err);
    }
  };
  const onClick = async () => {
    try {
      if (!socketRef.current) {
        return;
      }
      await apiMessage(message);
      socketRef.current.emit("chat", { docRef, message });
      setMessagev((prev) => [...prev, message]);

      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  const saveDoc = async () => {
    try {
      await apiSave(documentRef.current);
    } catch (err) {
      console.log(err);
    }
  };
  const leaveDoc = async () => {
    try {
      if (!socketRef.current) {
        return;
      }
      socketRef.current.on("leave-document", () => {
        if (!socketRef.current) {
          return;
        }
        console.log("exiting...");
        socketRef.current.disconnect();
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log("hello");
    if (!quillEdit.current) {
      return;
    }
    if (quillRef.current) {
      return;
    }

    const quill = new Quill(quillEdit.current, {
      theme: "snow",
    });
    console.log("hello12");
    quillRef.current = quill;
    documentRef.current = quillRef.current.getContents();
    socketRef.current = io("ws://localhost:8080");
    console.log("hello12");
    socketRef.current.on("connection", () => {
      console.log("Connection established successfully");
    });
    console.log("hello123");
    socketRef.current.emit(
      "get-document",
      { documentId: docRef.current?.value },
      (response: string) => {
        console.log(response);
      },
    );
    socketRef.current.on("user-error", (message) => {
      console.log(message);
    });
    socketRef.current.on("doc-error", (message) => {
      console.log(message);
    });
    socketRef.current.on("document joined", (docid) => {
      console.log(docid);
    });
    socketRef.current.on("document-loaded", (content, messages) => {
      console.log(content, messages);
    });
    quillRef.current.on("text-change", (delta) => {
      if (!socketRef.current) {
        return;
      }
      socketRef.current.emit("send-changes", { docRef, delta });
    });

    socketRef.current.on("chat-error", (message) => {
      console.log(message);
    });
    socketRef.current.on("save-error", (message) => {
      console.log(message);
    });
    socketRef.current.on("receive-message", (message) => {
      console.log(message);
    });
    socketRef.current.on("message-sent", (message) => {
      console.log(message);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
    console.log("hello12");
  }, []);
  return (
    <>
      <div className="flex h-screen bg-gradient-to-b from-black to-purple-500 p-10">
        <div className="flex absolute top-0 left-3 w-15 mb-">
          <img className=" rouned-xl" src="./../../dump.svg" />
          <span className="pt-7 text-gray-300 text-2xl font-bold">
            <span className=" font-bold text-3xl pr-1">
              <span className="text-4xl text-purple-600">D</span>
              <span className="font-mono">ump</span>
            </span>
            <span className="text-purple-600">{"</>"}</span>
          </span>
        </div>
        <div className="w-4xl h-9/10 pb-15 rounded-xl bg-gradient-to-b from-purple-400 to-purple-500 ml-10 mt-10 border border-purple-500 border-5">
          <div
            className="h-full bg-gray-900 text-white text-xl rounded-3xl ml-2 mr-2 font-mono"
            ref={quillEdit}
          />
        </div>
        <div className="flex absolute bottom-3 left-191">
          <div className="pr-5">
            <Button
              type="button"
              className="bg-black border-purple-300 border-3 pr-1"
              onClick={saveDoc}
            >
              Save
            </Button>
          </div>
          <div>
            <Button
              type="button"
              className="bg-black border-purple-300 border-3"
              onClick={leaveDoc}
            >
              Leave
            </Button>
          </div>
        </div>
        <div className="w-96 h-3/4 bg-zinc-900 border border-3 border-purple-500 rounded-xl m-20 flex flex-col">
          <div className="flex-1">{messagev}</div>
          <div className="flex">
            <Input
              className="mt-8 m-5 mr-4 pr-5 text-white"
              type="text"
              placeholder="Send message....."
              value={message}
              onChange={onChange}
            />
            <Button
              type="button"
              className="mt-8 bg-purple-800 mb-5 mr-2 p-1 pl-5 pr-5 border-purple-400 rounded-4xl"
              onClick={onClick}
            >
              ➤
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
