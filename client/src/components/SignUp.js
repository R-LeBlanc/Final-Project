import styled from "styled-components";
import React, { useRef, useState } from "react";
import { useAuth } from "./AuthContext";

const SignUp = () => {
  const { signup, currentUser } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <>
      <Wrapper>
        <h1>Sign Up</h1>
        {/* {currentUser && currentUser.email} */}
        {error && <h1>{error}</h1>}
        {/* <form onSubmit={handleSubmit}> */}
        <label>Email</label>
        <input type="email" ref={emailRef} required />
        <label>Password</label>
        <input type="password" ref={passwordRef} required />
        <label>Confirm Password</label>
        <input type="password" ref={passwordConfirmRef} required />
        <button type="submit" disabled={loading} onClick={handleSubmit}>
          Sign Up
        </button>
        {/* </form> */}
      </Wrapper>
    </>
  );
};

export default SignUp;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
