import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import ProfileForm from "./components/ProfileForm";
import Companies from "./components/Companies";
import Company from "./components/Company";
import Jobs from "./components/Jobs";
import Job from "./components/Job";
import ErrorPage from "./components/ErrorPage";

export default function RouteList({ signUp, login }) {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<LoginForm login={login} />} />
      <Route exact path="/signup" element={<SignUpForm signUp={signUp} />} />
      <Route element={<ProtectedRoute />}>
        <Route exact path="/users/:username" element={<ProfileForm />} />
        <Route exact path="/companies" element={<Companies />} />
        <Route exact path="/companies/:handle" element={<Company />} />
        <Route exact path="/jobs" element={<Jobs />} />
        <Route exact path="/jobs/:id" element={<Job />} />
      </Route>
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
