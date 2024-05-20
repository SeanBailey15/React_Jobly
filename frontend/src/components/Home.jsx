import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import "../styles/Home.css";

export default function Home() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Home">
      <h1 className="Home-title">Welcome to Jobly</h1>
      <h2 className="Home-msg">Your Job Search Headquarters!</h2>
      {currentUser && (
        <h3 className="Home-msg">{`Nice to see you again ${currentUser.username}!`}</h3>
      )}
      {!currentUser && (
        <h3 className="Home-msg">
          Please{" "}
          <Link className="Home-msg-link" to="/signup">
            sign up
          </Link>{" "}
          or{" "}
          <Link className="Home-msg-link" to="/login">
            login
          </Link>{" "}
          to use our service.
        </h3>
      )}
      <p className="Home-text">
        Whether you are out of work, looking for your first job, looking for a
        second job, or looking for a better job, Jobly is the place to be!
      </p>
      <p className="Home-text">
        You can find your next job by checking out our{" "}
        <Link to={`/companies`}>Company Directory</Link>. There you can browse
        available jobs on a per-company basis. Otherwise, you can jump directly
        to the <Link to={`/jobs`}>Job Directory</Link> where you can browse all
        available jobs.
      </p>
    </div>
  );
}
