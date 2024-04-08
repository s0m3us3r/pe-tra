import { useRouteError, Link } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Page not found</h1>
      <p>{error.data}</p>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
}