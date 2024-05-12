import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";

export default function Company() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getJob() {
      try {
        const res = await JoblyApi.getJob(id);
        setData(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getJob();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <div>
      <h1>Job Title: {data.title}</h1>
      <h2>Salary: {data.salary ? data.salary : "Unknown"}</h2>
      <h2>{data.company.name}</h2>
    </div>
  );
}
