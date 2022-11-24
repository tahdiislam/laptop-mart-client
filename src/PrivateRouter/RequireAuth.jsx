import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Component/Spinner/Loading";
import { UserContext } from "../Context/AuthProvider";

const RequireAuth = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();
  if (loading) {
    return <Loading/>
  }
  if (user && user?.uid) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
