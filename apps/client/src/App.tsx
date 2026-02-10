import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Join } from "./components/Join";
import { CreateDoc } from "./components/CreateDoc";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/join" element={<Join />} />
          <Route path="/createdocument" element={<CreateDoc />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
