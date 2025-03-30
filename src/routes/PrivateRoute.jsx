import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component, redirectTo }) => {
  // NOTE: replace this with authentication logic later
  const isAuthenticated = false;
  return isAuthenticated ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
