import styled from "styled-components";
import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import { DashboardContext } from "./DashbordComponents/DashboardContext";

const SignIn = () => {
  const { signIn, currentUser } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { userDashboard, setUserDashboard, usersStudents, setUsersStudents } =
    useContext(DashboardContext);
  const navigate = useNavigate();

  // async fetch function for the useEffect
  const dashboardAndStudents = async () => {
    const response = await fetch(`/dashboard/${currentUser.email}`);
    const data = await response.json();
    await setUserDashboard(data.data[0]);
    // setDashboardLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signIn(emailRef.current.value, passwordRef.current.value);
      await dashboardAndStudents();
      navigate("/dashboard");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  };

  // once the current user is set, call the dashboard information
  // useEffect(() => {
  //   if (currentUser) {
  //     dashboardAndStudents();
  //   }
  // }, [currentUser]);

  return (
    <>
      <Wrapper>
        <h1>Sign In</h1>
        {error && <h1>{error}</h1>}
        {/* <form onSubmit={handleSubmit}> */}
        <label>Email</label>
        <input type="email" ref={emailRef} required />
        <label>Password</label>
        <input type="password" ref={passwordRef} required />

        <button type="submit" disabled={loading} onClick={handleSubmit}>
          Sign In
        </button>
        {/* </form> */}
      </Wrapper>
    </>
  );
};

export default SignIn;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// const Form = styled.div`
//   background-color: pink;
//   display: flex;
// `;
