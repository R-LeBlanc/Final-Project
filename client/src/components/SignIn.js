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
        <MainWrap>
          <Img>
            <Blur>
              <h1>Teachers only</h1>
              <p>For now</p>
            </Blur>
          </Img>
          <Signin>
            <h1>Sign In</h1>
            {error && <h1>{error}</h1>}
            {/* <form onSubmit={handleSubmit}> */}
            <Wrap>
              <label>Email:</label>
              <Input type="email" ref={emailRef} required />
            </Wrap>
            <Wrap>
              <label>Password:</label>
              <Input type="password" ref={passwordRef} required />
            </Wrap>
            <Button type="submit" disabled={loading} onClick={handleSubmit}>
              Sign In
            </Button>
          </Signin>
        </MainWrap>
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
  height: 90vh;
`;

const MainWrap = styled.div`
  border-radius: 15px;
  box-shadow: -1px 1px 5px 9px rgba(0, 0, 0, 0.3);
  display: flex;
  height: 50vh;
  width: 50vw;
`;

const Img = styled.div`
  background-image: url("/images/erik-skof-2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 15px 0 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Blur = styled.div`
  border: 3px solid var(--accent-color);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30%;
  width: 80%;
  /* padding: 20px 30px; */
  backdrop-filter: blur(5px);
`;

const Signin = styled.div`
  /* background-color: pink; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Wrap = styled.div`
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0 0;
  height: 70px;
  width: 100%;
`;

const Input = styled.input`
  border: 2px solid var(--secondary-color);
  border-radius: 10px;
  height: 30px;
  width: 70%;
`;

const Button = styled.button`
  background-color: var(--secondary-color);
  border: none;
  border-radius: 10px;
  color: white;
  margin-top: 40px;
  padding: 10px 0;
  width: 70%;

  &:hover {
    cursor: pointer;
    color: var(--secondary-color);
    background-color: white;
    box-shadow: 0px 0px 0px 1px var(--secondary-color) inset;
  }
`;
