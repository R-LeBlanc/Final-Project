import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

// This context will allow access to the cureent user throught the app
export const AuthContext = React.createContext();

// This function will allow us to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState();

  // Using the auth module to sign up in a user
  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  // Using the auth module to log in a user
  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signOut = () => {
    return auth.signOut();
  };

  // Can combine all 3 updates into one and also update photo
  const updateProfile = (update) => {
    return currentUser.updateProfile(update);
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    //   Uses a Firebase method to set the current user
    // Which we only want to mount once
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    // When this method is called, it'll unsubscribe the onAuthStateChanged event
    // whenever we unmount this component
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signIn,
    signOut,
    updateEmail,
    updatePassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
