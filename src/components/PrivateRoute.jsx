import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-4 text-center">Checking authentication...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
