import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { v4 as uuid } from "uuid";
import "../styles/ErrorPage.css";

export default function ErrorPage() {
  const { state } = useLocation();

  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  if (!state) {
    return (
      <div className="Error">
        <h1 className="Error-title">404 Not Found</h1>
        <h2 className="Error-msg">
          Sorry, we could not find what you are looking for.
        </h2>
        <Button className="Error-btn" onClick={goBack}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="Error">
      <h1 className="Error-title">Oh No!</h1>
      <h2 className="Error-msg">The following error has occurred:</h2>
      <ul className="Error-list">
        {state.error.map((e) => (
          <li className="Error-item" key={uuid()}>
            {e}
          </li>
        ))}
      </ul>
      <Button className="Error-btn" onClick={goBack}>
        Go Back
      </Button>
    </div>
  );
}
