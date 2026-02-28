import { Input } from "@repo/ui/Input";
import { Button } from "@repo/ui/Button";
import { useRef, useState } from "react";
import { apiCreate } from "./api";
export const CreateDoc = () => {
  const [loading, setLoading] = useState("Create");
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = async () => {
    setLoading("creating....");
    setDisabled(true);
    if (!inputRef.current) {
      return;
    }
    const value = inputRef.current.value.trim();
    if (!value) {
      throw new Error("Error");
    }
    try {
      await apiCreate({ data: value });
      console.log();
      setLoading("Create");
      setDisabled(false);
    } catch (err) {
      console.log(err);
    }
  };
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
            <Input
              ref={inputRef}
              type="text"
              placeholder="Title"
              onKeyDown={(e) => e.key === "Enter" && onClick}
            />
          </div>
          <div className="pl-7 pt-7 text-white">
            <Button type="submit" onClick={onClick} disabled={disabled}>
              {loading}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
