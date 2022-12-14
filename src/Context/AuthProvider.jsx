import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/firebase.config";

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user with email and password
  const createUserWithEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in with email and password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign in with provider
  const signInWithProvider = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // update user profile
  const updateUserProfile = (userInfo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, userInfo);
  };

  // log out user
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("lmt");
    return signOut(auth);
  };

  // get the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const authInfo = {
    user,
    createUserWithEmailPassword,
    loading,
    setLoading,
    logOut,
    signInUser,
    updateUserProfile,
    signInWithProvider,
  };
  return (
    <UserContext.Provider value={authInfo}>{children}</UserContext.Provider>
  );
};

export default AuthProvider;
