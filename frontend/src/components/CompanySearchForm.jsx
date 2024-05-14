import { useState } from "react";
import { Form, FormGroup, Label, Input, FormText, Button } from "reactstrap";
import JoblyApi from "../api";
import "../styles/CompanySearchForm.css";

export default function CompanySearchForm({ setData, setIsLoading }) {
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
      console.error(error);
    } finally {
      setIsLoading(false);
      setFormData(INITIAL_STATE);
    }
  }

  async function handleReset(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await JoblyApi.getAllCompanies();
      setData(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setFormData(INITIAL_STATE);
    }
  }

  return (
    <div className="Form">
      <h3 className="Form-title">Filter Companies By:</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup floating>
          <Input
            className="Form-input"
            id="name"
            name="name"
            placeholder="Company Name*"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          <Label className="Form-label" for="name">
            Company Name*
          </Label>
          <FormText>*Will find any close match.</FormText>
        </FormGroup>
        <FormGroup floating>
          <Input
            className="Form-input"
            id="minEmployees"
            name="minEmployees"
            placeholder="Minimum Number Of Employees"
            type="text"
            value={formData.minEmployees}
            onChange={handleChange}
          />
          <Label className="Form-label" for="minEmployees">
            Minimum Number Of Employees
          </Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            className="Form-input"
            id="maxEmployees"
            name="maxEmployees"
            placeholder="Maximum Number Of Employees"
            type="text"
            value={formData.maxEmployees}
            onChange={handleChange}
          />
          <Label className="Form-label" for="maxEmployees">
            Maximum Number Of Employees
          </Label>
        </FormGroup>
        <Button className="Form-btn" type="submit">
          Search
        </Button>
        <Button className="Form-btn" type="button" onClick={handleReset}>
          Clear Results
        </Button>
      </Form>
    </div>
  );
}
