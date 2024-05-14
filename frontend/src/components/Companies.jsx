import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Spinner } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import JoblyApi from "../api";
import CompanySearchForm from "./CompanySearchForm";
import "../styles/Companies.css";

export default function Companies() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getCompanies() {
      try {
        const res = await JoblyApi.getAllCompanies();
        setData(res);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    getCompanies();
  }, []);

  if (error !== null) {
    navigate("/error", { state: { error } });
  }

  if (isLoading)
    return (
      <div className="Companies">
        <Spinner className="Companies-spinner" color="secondary">
          Loading...
        </Spinner>
      </div>
    );

  if (data.length === 0) {
    return (
      <div className="Companies">
        <h1 className="Companies-title">Company Directory</h1>
        <div className="Companies-searchForm">
          <CompanySearchForm setData={setData} setIsLoading={setIsLoading} />
        </div>
        <h1 className="Companies-title">No Results</h1>
      </div>
    );
  }

  return (
    <div className="Companies">
      <h1 className="Companies-title">Company Directory</h1>
      <div className="Companies-searchForm">
        <CompanySearchForm setData={setData} setIsLoading={setIsLoading} />
      </div>
      <ListGroup className="Companies-list">
        {data.map((company) => (
          <ListGroupItem className="Companies-listItem" key={company.handle}>
            <Link
              className="Companies-link"
              to={`/companies/${company.handle}`}
            >
              {company.name}
            </Link>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
