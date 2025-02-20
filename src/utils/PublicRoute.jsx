import { Navigate } from "react-router";
import Cookies from "js-cookie";

const PublicRoute = ({ children }) => {
  const token = Cookies.get("authToken");
  return token ? <Navigate to="/" /> : children;
};

export default PublicRoute;
