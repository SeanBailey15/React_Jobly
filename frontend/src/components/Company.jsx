import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import JoblyApi from "../api";
import "../styles/Company.css";

export default function Company() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { handle } = useParams();

  useEffect(() => {
    async function getCompany() {
      try {
        const res = await JoblyApi.getCompany(handle);
        setData(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getCompany();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="Company">
      <Card className="Company-card" color="dark">
        <CardTitle className="Company-title" tag="h1">
          {data.name}
        </CardTitle>
        <CardText className="Company-text">
          With supporting text below as a natural lead-in to additional content.
        </CardText>
        <h2 className="Company-msg">Now Hiring For:</h2>
        <ListGroup className="Company-list">
          {data.jobs.map((job) => (
            <ListGroupItem className="Company-listItem" key={job.id}>
              <Link className="Company-link" to={`/jobs/${job.id}`}>
                {job.title}
              </Link>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
}
