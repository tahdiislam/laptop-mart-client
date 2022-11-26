import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/AuthProvider";

const useSeller = (email) => {
  const [loading, setLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const { logOut } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (email) {
      const url = `${import.meta.env.VITE_server_url}seller?email=${email}`;
      axios
        .get(url, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("lmt")}`,
          },
        })
        .then((result) => {
          setIsSeller(result.data.isSeller);
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
  return { isSeller, loading };
};

export default useSeller;
