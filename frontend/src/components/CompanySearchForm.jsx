import { useState } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import JoblyApi from "../api";

export default function CompanySearchForm({ setData, setIsLoading, setError }) {
  const INITIAL_STATE = {
    name: "",
    minEmployees: "",
    maxEmployees: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  function handleChange(e) {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await JoblyApi.getAllCompanies(formData);
      setData(res);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      setFormData(INITIAL_STATE);
    }
  }

  return (
    <div className="Form">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            id="name"
            name="name"
            placeholder="Company Name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            id="minEmployees"
            name="minEmployees"
            placeholder="Minimum Number Of Employees"
            type="text"
            value={formData.minEmployees}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            id="maxEmployees"
            name="maxEmployees"
            placeholder="Maximum Number Of Employees"
            type="text"
            value={formData.maxEmployees}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">Search</Button>
      </Form>
    </div>
  );
}
