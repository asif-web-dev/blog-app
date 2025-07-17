import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="p-4">Loading...</p>;

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
