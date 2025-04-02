import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component, redirectTo }) => {
  // NOTE: replace this with authentication logic later
  const isAuthenticated = true;
  return isAuthenticated ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
