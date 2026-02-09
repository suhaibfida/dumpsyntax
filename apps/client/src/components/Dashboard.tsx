import { useEffect, useState } from "react";
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
      <div className="flex-col justify-center p-5 h-screen bg-black">
        <div className="font-bold fixed top-7 left-7 text-xl text-purple-500">
          <span className="text-white text-xl">Welcome to</span> Dump
          {"</>"}
          Syntax
        </div>
        {docs}
        <div className="mt-20">
          {docss.map((u) => (
            <div className="bg-slate-900 h-15 w-2xl mt-10 p-4 mr-8 ml-100 text-md text-white font-bold rounded-xl border border-gray-500">
              {u}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
