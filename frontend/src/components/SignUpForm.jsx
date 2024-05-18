import { Formik } from "formik";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import JoblyApi from "../api";
import { useContext } from "react";
import { jwtDecode } from "jwt-decode";
import UserContext from "../contexts/UserContext";
import "../styles/SignUpForm.css";

export default function SignUpForm() {
  const { currentUser, setCurrentUser, token, setToken } =
    useContext(UserContext);

  async function processToken(formData) {
    const token = await JoblyApi.registerUser(formData);
    setToken(token);
    setCurrentUser(decodeToken(token));
  }

  function decodeToken(token) {
    const data = jwtDecode(token);
    console.log(`I am in decodeToken`, data);
    return data.username;
  }

  return (
    <div className="Form">
      <h1 className="Form-title">Sign up to access Jobly opportunities!</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.firstName) {
            errors.firstName = "Required";
          } else if (values.firstName.length > 30) {
            errors.firstName = "First name must be 30 characters or less.";
          }

          if (!values.lastName) {
            errors.lastName = "Required";
          } else if (values.lastName.length > 30) {
            errors.lastName = "Last name must be 30 characters or less.";
          }

          if (!values.username) {
            errors.username = "Required";
          } else if (values.username.length > 30) {
            errors.username = "Username must be 30 characters or less.";
          }

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address.";
          } else if (values.email.length < 6) {
            errors.email = "Email must be 6 characters or more.";
          } else if (values.email.length > 60) {
            errors.email = "Email must be 60 characters or less.";
          }

          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length > 20) {
            errors.password = "Password must be 20 characters or less.";
          } else if (values.password.length < 5) {
            errors.password = "Password must be 5 characters or more.";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          await processToken(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup floating>
              <Input
                className="Form-input"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                type="text"
                value={values.firstName}
                onChange={handleChange}
              />
              <Label className="Form-label" for="firstName">
                First Name
              </Label>
              {errors.firstName && touched.firstName && (
                <div className="Form-error">
                  {errors.firstName && touched.firstName && errors.firstName}
                </div>
              )}
            </FormGroup>
            <FormGroup floating>
              <Input
                className="Form-input"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                type="text"
                value={values.lastName}
                onChange={handleChange}
              />
              <Label className="Form-label" for="lastName">
                Last Name
              </Label>
              {errors.lastName && touched.lastName && (
                <div className="Form-error">
                  {errors.lastName && touched.lastName && errors.lastName}
                </div>
              )}
            </FormGroup>
            <FormGroup floating>
              <Input
                className="Form-input"
                id="username"
                name="username"
                placeholder="Username"
                type="text"
                autoComplete="username"
                value={values.username}
                onChange={handleChange}
              />
              <Label className="Form-label" for="username">
                Username
              </Label>
              {errors.username && touched.username && (
                <div className="Form-error">
                  {errors.username && touched.username && errors.username}
                </div>
              )}
            </FormGroup>
            <FormGroup floating>
              <Input
                className="Form-input"
                id="email"
                name="email"
                placeholder="Email"
                type="text"
                value={values.email}
                onChange={handleChange}
              />
              <Label className="Form-label" for="email">
                Email
              </Label>
              {errors.email && touched.email && (
                <div className="Form-error">
                  {errors.email && touched.email && errors.email}
                </div>
              )}
            </FormGroup>
            <FormGroup floating>
              <Input
                className="Form-input"
                id="password"
                name="password"
                placeholder="Password"
                type="text"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
              />
              <Label className="Form-label" for="password">
                Password
              </Label>
              {errors.password && touched.password && (
                <div className="Form-error">
                  {errors.password && touched.password && errors.password}
                </div>
              )}
            </FormGroup>
            <Button className="Form-btn" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {console.log(`I have set the token to:`, token)}
      {console.log(`I have set the user to:`, currentUser)}
    </div>
  );
}
