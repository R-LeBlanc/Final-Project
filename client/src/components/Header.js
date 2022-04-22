import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Wrapper>
      <Logo>
        <h1>Smart Reports</h1>
      </Logo>
      <Redirects>
        <Links to="/announcements">Announcements</Links>
        <Links to="/signin">Sign In</Links>
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
  height: 50px;
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
