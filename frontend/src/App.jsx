import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Spinner } from "reactstrap";
import { jwtDecode } from "jwt-decode";
import NavBar from "./components/Navbar";
import RouteList from "./RouteList";
import UserContext from "./contexts/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import JoblyApi from "./api";
import "./styles/App.css";

export const TOKEN_STORAGE_ID = "jobly-token";

const App = () => {
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [isLoading, setIsLoading] = useState(true);
  const [applicationIds, setApplicationIds] = useState(new Set());

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwtDecode(token);
            JoblyApi.token = token;
            let currentUser = await JoblyApi.getCurrentUser(username);
            setCurrentUser(currentUser);
            setApplicationIds(new Set(currentUser.applications));
          } catch (err) {
            console.error(err);
            setCurrentUser(null);
            setError(err);
          }
        }
        setIsLoading(false);
      }

      setIsLoading(true);
      getCurrentUser();
    },
    [token]
  );

  async function signUp(formData) {
    const token = await JoblyApi.registerUser(formData);
    setToken(token);
  }

  async function login(formData) {
    const token = await JoblyApi.loginUser(formData);
    setToken(token);
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  async function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    try {
      await JoblyApi.applyToJob(currentUser.username, id);
      setApplicationIds(new Set([...applicationIds, id]));
    } catch (err) {
      console.error(err);
      setError(err);
    }
  }

  if (isLoading)
    return (
      <div className="App">
        <Spinner className="App-spinner" color="secondary">
          Loading...
        </Spinner>
      </div>
    );

  if (error !== null) {
    return (
      <div className="App">
        <h1>An error occurred: {error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider
          value={{
            currentUser,
            setCurrentUser,
            token,
            setToken,
            logout,
            hasAppliedToJob,
            applyToJob,
          }}
        >
          <NavBar
            color="dark"
            light={false}
            dark={true}
            expand="md"
            container="fluid"
          />
          <RouteList signUp={signUp} login={login} />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
