import NavComponent from "./components/Navbar";
import RouteList from "./RouteList";

const App = () => {
  return (
    <>
      <NavComponent
        color="dark"
        light={false}
        dark={true}
        expand="md"
        container="fluid"
      />
      <RouteList />
    </>
  );
};

export default App;
