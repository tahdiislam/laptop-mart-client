import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Loading from "../Component/Spinner/Loading";
import { UserContext } from "../Context/AuthProvider";
import useSeller from "../Hooks/useSeller";

const RequireSeller = ({ children }) => {
  const { user } = useContext(UserContext);
  const { isSeller, loading } = useSeller(user?.email);
  if (loading) {
    return <Loading />;
  }
  if (isSeller) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default RequireSeller;
