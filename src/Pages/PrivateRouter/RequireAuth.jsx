import React, { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/AuthProvider";

const RequireAuth = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();
  if (loading) {
    return <button className="btn loading">loading...</button>;
  }
  if (user && user?.uid) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
