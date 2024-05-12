import { useEffect, useState } from "react";
import JoblyApi from "../api";

export default function Jobs() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <div>
      <h1>List All Jobs!</h1>
      <ul>
        {data.map((job) => (
          <li key={job.id}>
            {job.title} : Salary - {job.salary ? job.salary : "Unknown"}
          </li>
        ))}
      </ul>
    </div>
  );
}
