import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Join } from "./components/Join";
import { CreateDoc } from "./components/CreateDoc";
import { LivePage } from "./components/LivePage";
import { useRef } from "react";

function App() {
  const inpRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/join" element={<Join inpRef={inpRef} />} />
          <Route path="/createdocument" element={<CreateDoc />} />
          <Route path="/document/live" element={<LivePage docRef={inpRef} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
