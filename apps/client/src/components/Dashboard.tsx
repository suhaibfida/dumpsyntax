import { useEffect, useRef } from "react";
import { Button } from "@repo/ui/Button";
import { Card } from "./Card";
import { useNavigate } from "react-router-dom";

import { apiShow } from "./api/api";

export const Dashboard = () => {
  const navigate = useNavigate();
  const inpRef = useRef<HTMLInputElement[]>([]);

  const onClick = () => {
    navigate("/createdocument");
  };
  const logout = async () => {
    await fetch("http://localhost:3000/api/v1/logout", {
      method: "POST",
      credentials: "include",
    });
  };
  useEffect(() => {
    async function call() {
      try {
        if (!inpRef.current) {
          return;
        }
        inpRef.current = await apiShow();
      } catch (err) {
        console.log(err);
      }
    }
    call();
  }, []); //
  const items = inpRef.current;
  return (
    <>
      <div className="h-screen bg-gradient-to-b from-black to-purple-900 ">
        <div className="flex fixed top-0 left-3 w-15">
          <img className=" rouned-xl" src="./../../dump.svg" />
          <span className="pt-7 text-gray-300 text-2xl font-bold">
            <span className=" font-bold text-3xl pr-1">
              <span className="text-4xl text-purple-600">D</span>
              <span className="font-mono">ump</span>
            </span>
            <span className="text-purple-600">{"</>"}</span>
          </span>
          <div className="flex fixed bottom-5 left-5 lg:top-5 lg:right-10 lg:left-auto lg:bottom-auto">
            <div className="pr-5">
              <Button
                className="w-33 border-gray-900 bg-purple-900"
                type={"submit"}
                onClick={onClick}
              >
                Create +
              </Button>
            </div>

            <div className="pr-5">
              <Button
                className="w-30 border-gray-900 bg-purple-900"
                type={"submit"}
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
        <div className="fixed top-20 border-1 border-gray-800 w-screen"></div>
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-wrap h-3/4 w-5/6 mt-20 border bg-gradient-to-b from black to-gray-400 rounded-2xl border-gray-400 border-3 w-4xl">
            {items.map((doc) => (
              <Card key={doc.id} doc={doc.value} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
