import axios from "axios";
import { useEffect, useState } from "react";

const useAccessToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      const url = `${import.meta.env.VITE_server_url}jwt?email=${email}`;
      axios
        .get(url)
        .then((data) => {
          setToken(data.data)
          localStorage.setItem("lmt", data.data.token)
        })
        .catch((err) => console.log(err.message));
    }
  }, [email]);
  return [token];
};

export default useAccessToken;
