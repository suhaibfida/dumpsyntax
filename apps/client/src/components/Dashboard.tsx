import { useEffect, useState } from "react";
import { Button } from "@repo/ui/Button";
import { Navbar } from "./Navbar";
import { Card } from "./Card";
const docss = ["Doc1", "Doc2", "Doc4", "Doc4", "Doc5", "Doc4"];
export const Dashboard = () => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    fetch("http://localhost/api/v1/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setDocs(data);
      });
  }, []); //

  return (
    <>
      <div className="h-screen bg-gradient-to-b from-pink-950 to-purple-900 ">
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
                className="w-33 border-purple-900 bg-black"
                type={"submit"}
              >
                Create +
              </Button>
            </div>
            <div className="pr-5">
              <Button
                className="w-30 border-purple-900 bg-black"
                type={"submit"}
              >
                Join
              </Button>
            </div>
            <div className="pr-5">
              <Button
                className="w-30 border-purple-900 bg-black"
                type={"submit"}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
        <div className="fixed top-20 border-1 border-gray-800 w-screen"></div>
        <div className="flex justify-center items-center h-screen">
          <div className="h-3/4 w-5/6 mt-20 border border-white w-4xl">
            <Card />
          </div>
        </div>
      </div>
    </>
  );
};
