import io, { Socket } from "socket.io-client";
import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
interface Ref {
  docRef: React.RefObject<HTMLInputElement | null>;
}
export const LivePage = ({ docRef }: Ref) => {
  const socketRef = useRef<Socket | null>(null);
  const quillEdit = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!quillEdit.current) {
      return;
    }
    if (quillRef.current) {
      return;
    }
    const quill = new Quill(quillEdit.current, {
      theme: "snow",
    });
    quillRef.current = quill;
    socketRef.current = io("ws://localhost:8080");
    socketRef.current.on("connection", () => {
      console.log("Connection established successfully");
    });
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
    // socketRef.current.emit("send-changes", { docRef, delta });
    // socketRef.current.emit("save-document", { docRef, content });
    // socketRef.current.emit("chat", { docRef, message });
    // socketRef.current.on("chat-error", (message) => {
    //   console.log(message);
    // });
    socketRef.current.on("save-error", (message) => {
      console.log(message);
    });
    socketRef.current.on("receive-message", (message) => {
      console.log(message);
    });
    socketRef.current.on("message-sent", (message) => {
      console.log(message);
    });
    // socketRef.current.on("leave-document", (documentId) => {
    //   console.log("exiting...");
    // });
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);
  return (
    <>
      <div className="h-screen bg-gray-800 p-10">
        <div className="w-4xl h-9/10 bg-gray-400 ml-10 mt-7">
          <div
            className="h-9/10 bg-gray-900 text-white text-xl rounded-3xl font-mono"
            ref={quillEdit}
          />
        </div>
      </div>
    </>
  );
};
