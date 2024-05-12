import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";

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
    <div>
      <h1>{data.name}</h1>
      <h2>{data.description}</h2>
      <ul>
        {data.jobs.map((job) => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ul>
    </div>
  );
}
