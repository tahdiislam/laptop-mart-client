import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/AuthProvider";

const useAdmin = (email) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { logOut } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (email) {
      const url = `${import.meta.env.VITE_server_url}admin?email=${email}`;
      axios
        .get(url, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("lmt")}`,
          },
        })
        .then((result) => {
          setIsAdmin(result.data.isAdmin);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status) {
            logOut()
              .then(() => {
                toast.error("Session Expired Please login again");
                navigate("/login");
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        });
    }
  }, [email]);
  return { isAdmin, loading };
};

export default useAdmin;
