import { Navigate } from "react-router-dom";
import { isUserAdmin } from "../utils/tokenUtils";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAdmin = isUserAdmin();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
