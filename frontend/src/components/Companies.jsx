import { useEffect, useState } from "react";
import JoblyApi from "../api";

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <div>
      <h1>List All Companies!</h1>
      <ul>
        {data.map((company) => (
          <li key={company.handle}>{company.name}</li>
        ))}
      </ul>
    </div>
  );
}
