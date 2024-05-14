import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function ErrorPage() {
  const { state } = useLocation();

  return (
    <div className="Error">
      <ul className="Error-list">
        {state.error.map((e) => (
          <li key={uuid()}>{e}</li>
        ))}
      </ul>
    </div>
  );
}
