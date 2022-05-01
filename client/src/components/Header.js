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
      <Logo>
        <h1>Smart Reports</h1>
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

const Logo = styled.div``;

const Redirects = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 200px;
`;

const Links = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Button = styled.button`
  &:hover {
    cursor: pointer;
  }
`;
