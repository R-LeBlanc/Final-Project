import styled from "styled-components";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const SignIn = () => {
  const { signIn, currentUser } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signIn(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  };
  return (
    <>
      <Wrapper>
        <h1>Sign In</h1>
        {currentUser && currentUser.displayName}
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
