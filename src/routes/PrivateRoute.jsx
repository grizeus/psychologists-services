import useStore from "../zustand/store";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component, redirectTo }) => {
  const user = useStore(state => state.user);
  return user ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
