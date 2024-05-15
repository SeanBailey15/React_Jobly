import { BrowserRouter } from "react-router-dom";
import NavComponent from "./components/Navbar";
import RouteList from "./RouteList";
import { useState } from "react";
import UserContext from "./helpers/UserContext";

const App = () => {
  const [currentUser, setCurrentUser] = useState();

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
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
