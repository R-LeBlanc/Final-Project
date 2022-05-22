import styled from "styled-components";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Header = () => {
  const [error, setError] = useState();
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    setError("");
    try {
      await signOut();
      navigate("/");
    } catch {
      setError("Failed to logout");
    }
  };

  return (
    <Wrapper>
      <Logo onClick={() => navigate("/")}>
        <Img src="/images/geography.png" />
        <h1>A+las</h1>
      </Logo>
      {error && alert(error)}
      <Redirects>
        <Links to="/announcements">Announcements</Links>
        {currentUser ? (
          <Button onClick={handleSignOut}>Sign Out</Button>
        ) : (
          <Links to="/signin">Sign In</Links>
        )}
      </Redirects>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  align-items: center;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  height: 10vh;
  justify-content: space-between;
  padding: 0 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  height: 50px;
  padding-right: 10px;
`;

const Redirects = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 250px;
`;

const Links = styled(Link)`
  color: white;
  /* padding-right: 10px; */
  text-decoration: none;
`;

const Button = styled.button`
  border: none;
  background-color: var(--secondary-color);
  border-radius: 15px;
  color: white;
  padding: 10px 20px;

  &:hover {
    cursor: pointer;
    color: var(--secondary-color);
    background-color: var(--primary-color);
    box-shadow: 0px 0px 0px 1px var(--secondary-color) inset;
  }
`;
