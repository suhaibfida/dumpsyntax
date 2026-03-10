import { useEffect, useState } from "react";
import { Button } from "@repo/ui/Button";
import { Card } from "./Card";
import { useNavigate } from "react-router-dom";

import { apiShow } from "./api/api";
const api_Url = import.meta.env.VITE_API_URL;
export const Dashboard = () => {
  const res = async () => {
    const res = await fetch("/me", { credentials: "include" });
    if (!res) {
      navigate("/login");
    }
  };
  res();
  const navigate = useNavigate();
  const [output, setOutput] = useState<any[]>([]);

  const onClick = async () => {
    navigate("/createdocument");
  };
  const logout = async () => {
    console.log("hello");
    const e = await fetch(`${api_Url}/logout`, {
      method: "POST",
      credentials: "include",
    });
    console.log(e);
  };
  useEffect(() => {
    async function call() {
      try {
        if (!output) {
          return;
        }
        setOutput(await apiShow());
      } catch (err) {
        console.log(err);
      }
    }
    call();
  }, []); //

  return (
    <>
      <div className="h-screen bg-gradient-to-b from-black to-purple-900 ">
        <div className="fixed top-5 right-10">
          <Button
            className="mr-5 bg-purple-700 font-bold  border-purple-900"
            onClick={onClick}
          >
            Create Document +
          </Button>
          <Button
            className="mr-5 bg-purple-700 font-bold border-purple-900"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
        <div className="flex absolute top-0 left-3 w-15">
          <img className=" rouned-xl" src="./../../dump.svg" />
          <span className="pt-7 text-gray-300 text-2xl font-bold">
            <span className=" font-bold text-3xl pr-1">
              <span className="text-4xl text-purple-600">D</span>
              <span className="font-mono">ump</span>
            </span>
            <span className="text-purple-600">{"</>"}</span>
          </span>
        </div>
        <div className="fixed top-20 border-1 border-gray-800 w-screen"></div>
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-wrap h-3/4 w-5/6 mt-20 border bg-gradient-to-b from black to-gray-800 rounded-2xl border-gray-800 border-3 w-4xl">
            {output.length === 0 ? (
              <p className="text-2xl text-white font-mono p-50 pl-130">
                No data here
              </p>
            ) : (
              output.map((doc) => <Card key={doc.id} doc={doc.value} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
};
