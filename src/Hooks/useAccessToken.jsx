import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../Context/AuthProvider";
const { logOut } = useContext(UserContext);

const useAccessToken = ({ email }) => {
  useEffect(() => {
    if (email) {
      const url = `${import.meta.env.VITE_server_url}jwt?email=${email}`;
      fetch(url)
        .then((res) => {
          if (res.status === 401 || res.status || 403) {
            logOut()
              .then(() => {
                toast.error("Session expire please login again");
              })
              .catch((err) => console.log(err.message));
          }
          return res.json();
        })
        .then((data) => console.log(data.token))
        .catch((err) => console.log(err.message));
    }
  }, [email]);
};

export default useAccessToken;
