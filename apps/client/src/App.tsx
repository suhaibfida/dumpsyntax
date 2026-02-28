import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Join } from "./components/Join";
import { CreateDoc } from "./components/CreateDoc";
import { LivePage } from "./components/LivePage";
import { useRef } from "react";
import { Page } from "./components/Page";

function App() {
  const inpRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/join" element={<Join inpRef={inpRef} />} />
          <Route path="/createdocument" element={<CreateDoc />} />
          <Route path="/document/live" element={<LivePage docRef={inpRef} />} />
          <Route path="/" element={<Page />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
