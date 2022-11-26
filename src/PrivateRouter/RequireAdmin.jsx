import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../Component/Spinner/Loading";
import { UserContext } from "../Context/AuthProvider";
import useAdmin from "../Hooks/useAdmin";

const RequireAdmin = ({ children }) => {
  const { user } = useContext(UserContext);
  const { isAdmin, loading } = useAdmin(user?.email);

  if (loading) {
    return <Loading />;
  }
  if (isAdmin) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default RequireAdmin;
