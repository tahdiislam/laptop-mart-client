import React, { createContext, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../Firebase/firebase.config";

const auth = getAuth(app);

export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // create user with email and password
  const authInfo = {
    user,
  };
  return (
    <UserContext.Provider value={authInfo}>{children}</UserContext.Provider>
  );
};

export default AuthProvider;
