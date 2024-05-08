import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Companies from "./components/Companies";
import Company from "./components/Company";
import Jobs from "./components/Jobs";
import Job from "./components/Job";

export default function RouteList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:handle" element={<Company />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<Job />} />
      </Routes>
    </BrowserRouter>
  );
}
