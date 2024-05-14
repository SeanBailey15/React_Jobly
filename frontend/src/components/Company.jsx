import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "reactstrap";
import JoblyApi from "../api";
import "../styles/Company.css";

export default function Company() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { handle } = useParams();

  useEffect(() => {
    async function getCompany() {
      try {
        const res = await JoblyApi.getCompany(handle);
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    getCompany();
  }, []);

  if (isLoading)
    return (
      <div className="Company">
        <Spinner className="Company-spinner" color="secondary">
          Loading...
        </Spinner>
      </div>
    );

  if (data.length === 0) {
    return (
      <div className="Company">
        <h1 className="Company-title">Company Details</h1>
        <h1 className="Company-title">No Results</h1>
      </div>
    );
  }

  return (
    <div className="Company">
      <Card className="Company-card">
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
