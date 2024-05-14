import { useContext } from "react";
import ErrorContext from "../ErrorContext";

export default function ErrorPage() {
  const { error } = useContext(ErrorContext);

  return <h1>{error}</h1>;
}
