import { useEffect, useState } from "react";
import { Button } from "@repo/ui/Button";
import { Card } from "./Card";
import { useNavigate } from "react-router-dom";

import { apiShow } from "./api/api";
const api_Url = import.meta.env.VITE_API_URL;
type DocumentType = {
  id: string;
  title: string;
  owner: {
    username: string;
  };
};
export const Dashboard = () => {
  const navigate = useNavigate();
  response();
  async function response() {
    const res = await fetch(`${api_Url}/me`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      navigate("/login");
    }
  }

  const [documents, setDocuments] = useState<DocumentType[]>([]);

  const onClick = async () => {
    navigate("/createdocument");
  };
  const logout = async () => {
    console.log("hello");
    await fetch(`${api_Url}/logout`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
  };
  useEffect(() => {
    call();
    async function call() {
      try {
        const { documents } = await apiShow();
        setDocuments(documents);
        // console.log("helloji" + output);
        if (!documents) {
          throw new Error("No data found");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, []); //

  return (
    <>
      <div className="h-screen bg-gradient-to-b from-black to-purple-900 ">
        <div className="fixed top-5 right-10">
          <Button
            className="mr-5 bg-purple-900 font-bold  border-purple-900 border-white"
            onClick={onClick}
          >
            Create Document +
          </Button>
          <Button
            className="mr-5 bg-purple-900 font-bold border-purple-900 border-white"
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
          <div className="flex flex-wrap h-3/4 w-5/6 mt-20 border bg-gradient-to-b from black to-gray-800 rounded-2xl border-gray-500 border-3 w-4xl overflow-y-auto">
            <span className="text-3xl font-bold text-gray-300 h-5 absolute top-23 left-165 underline">
              Live Docs :
            </span>
            {documents.length === 0 ? (
              <p className="text-2xl text-white font-mono p-50 pl-130">
                No data here
              </p>
            ) : (
              documents.map((doc) => (
                <Card
                  id={doc.id}
                  title={doc.title}
                  username={doc.owner.username}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
