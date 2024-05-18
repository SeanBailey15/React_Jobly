import { BrowserRouter } from "react-router-dom";
import NavComponent from "./components/Navbar";
import RouteList from "./RouteList";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import JoblyApi from "./api";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  JoblyApi.token = token;
  console.log(token);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider
          value={{ currentUser, setCurrentUser, token, setToken }}
        >
          <NavComponent
            color="dark"
            light={false}
            dark={true}
            expand="md"
            container="fluid"
          />
          <RouteList />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
