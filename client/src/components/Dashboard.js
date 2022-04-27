import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "./AuthContext";

const Dashboard = () => {
  // TODO: Update profile so I can use the profile information
  const { signIn, currentUser } = useAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user.email, user.displayName);
    } else {
      console.log("no user");
    }
  });

  return (
    <>
      {currentUser.displayName ? (
        <h1>{currentUser.displayName}'s Dashboard</h1>
      ) : (
        <h1>Teachers Dashboard</h1>
      )}
      <Link to="/updateProfile">Update Profile</Link>
    </>
  );
};

export default Dashboard;
