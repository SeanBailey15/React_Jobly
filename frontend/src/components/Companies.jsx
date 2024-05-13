import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import JoblyApi from "../api";
import "../styles/Companies.css";
import CompanySearchForm from "./CompanySearchForm";

export default function Companies() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCompanies() {
      try {
        const res = await JoblyApi.getAllCompanies();
        setData(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getCompanies();
  }, []);

  if (isLoading)
    return (
      <div className="Companies">
        <Spinner className="Companies-spinner" color="secondary">
          Loading...
        </Spinner>
      </div>
    );
  if (error) {
    return (
      <div className="Companies">
        <h1 className="Companies-title">Error: {error}</h1>
      </div>
    );
  }
  if (data.length === 0) {
    return (
      <div className="Companies">
        <h1 className="Companies-title">Company Directory</h1>
        <div className="Companie-searchForm">
          <CompanySearchForm
            setData={setData}
            setIsLoading={setIsLoading}
            setError={setError}
          />
        </div>
        <h1 className="Companies-title">No Results</h1>
      </div>
    );
  }

  return (
    <div className="Companies">
      <h1 className="Companies-title">Company Directory</h1>
      <div className="Companie-searchForm">
        <CompanySearchForm
          setData={setData}
          setIsLoading={setIsLoading}
          setError={setError}
        />
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
