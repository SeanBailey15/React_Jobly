import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignUpForm from "./components/SignUpForm";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Companies from "./components/Companies";
import Company from "./components/Company";
import Jobs from "./components/Jobs";
import Job from "./components/Job";
import ErrorPage from "./components/ErrorPage";

export default function RouteList() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/companies/:handle" element={<Company />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<Job />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}
