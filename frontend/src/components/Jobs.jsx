import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Spinner } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import JoblyApi from "../api";
import "../styles/Jobs.css";

export default function Jobs() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getJobs() {
      try {
        const res = await JoblyApi.getAllJobs();
        setData(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getJobs();
  }, []);

  if (error !== null) {
    navigate("/error", { state: { error } });
  }

  if (isLoading)
    return (
      <div className="Jobs">
        <Spinner className="Jobs-spinner" color="secondary">
          Loading...
        </Spinner>
      </div>
    );

  if (data.length === 0) {
    return (
      <div className="Jobs">
        <h1 className="Jobs-title">Job Directory</h1>
        <h1 className="Jobs-title">No Results</h1>
      </div>
    );
  }

  return (
    <div className="Jobs">
      <h1 className="Jobs-title">Job Directory</h1>
      <ListGroup className="Jobs-list">
        {data.map((job) => (
          <ListGroupItem className="Jobs-listItem" key={job.id}>
            <Link className="Jobs-link" to={`/jobs/${job.id}`}>
              {job.title}
            </Link>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
