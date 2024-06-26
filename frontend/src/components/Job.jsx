import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardTitle,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Spinner,
  ListGroupItemText,
  Button,
} from "reactstrap";
import JoblyApi from "../api";
import { v4 as uuid } from "uuid";
import "../styles/Job.css";
import UserContext from "../contexts/UserContext";

export default function Job() {
  const { id } = useParams();
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getJob() {
      try {
        const res = await JoblyApi.getJob(id);
        const hasApplied = hasAppliedToJob(parseInt(id));
        setData(res);
        setApplied(hasApplied);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    getJob();
  }, [id, hasAppliedToJob]);

  async function handleApply() {
    if (hasAppliedToJob(data.id)) return;
    try {
      await applyToJob(data.id);
      setApplied(true);
    } catch (err) {
      setError(err);
    }
  }

  if (error !== null) {
    navigate("/error", { state: { error: error } });
  }

  if (isLoading)
    return (
      <div className="Job">
        <Spinner className="Job-spinner" color="secondary">
          Loading...
        </Spinner>
      </div>
    );

  return (
    <div className="Job">
      <Card className="Job-card">
        <CardTitle className="Job-title" tag="h1">
          {data.title}
        </CardTitle>
        <ListGroup className="Job-list">
          <ListGroupItem className="Job-listItem" key={uuid()}>
            <ListGroupItemHeading className="Job-listHeading">
              Salary Offered
            </ListGroupItemHeading>
            <ListGroupItemText className="Job-listText">
              ${data.salary}
            </ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem className="Job-listItem" key={uuid()}>
            <ListGroupItemHeading className="Job-listHeading">
              Equity Offered
            </ListGroupItemHeading>
            <ListGroupItemText className="Job-listText">
              {data.equity ? data.equity : "None"}
            </ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
        <h2 className="Job-msg">Employer Details:</h2>
        <ListGroup className="Job-list">
          <ListGroupItem className="Job-listItem" key={uuid()}>
            <ListGroupItemHeading className="Job-listHeading">
              Company Name
            </ListGroupItemHeading>
            <ListGroupItemText className="Job-listText">
              {data.company.name}
            </ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem className="Job-listItem" key={uuid()}>
            <ListGroupItemHeading className="Job-listHeading">
              Company Handle
            </ListGroupItemHeading>
            <ListGroupItemText className="Job-listText">
              {data.company.handle}
            </ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem className="Job-listItem" key={uuid()}>
            <ListGroupItemHeading className="Job-listHeading">
              Company Description
            </ListGroupItemHeading>
            <ListGroupItemText className="Job-listText">
              {data.company.description}
            </ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem className="Job-listItem" key={uuid()}>
            <ListGroupItemHeading className="Job-listHeading">
              Number Of Employees
            </ListGroupItemHeading>
            <ListGroupItemText className="Job-listText">
              {data.company.numEmployees}
            </ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
        <Button className="Job-btn" onClick={handleApply} disabled={applied}>
          {applied ? "Applied" : "Apply"}
        </Button>
      </Card>
    </div>
  );
}
