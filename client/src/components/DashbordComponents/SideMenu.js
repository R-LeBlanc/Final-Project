import styled from "styled-components";
import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const SideMenu = () => {
  return (
    <Wrapper>
      {/* placeholder logo */}
      <Logo src="/images/brain.png" />
      <Links to="/updateProfile">Update Profile</Links>
      <Links to="/myclasses">My Classes</Links>
      <Links to="/mystudentlist">My Students</Links>
    </Wrapper>
  );
};
export default SideMenu;

const Wrapper = styled.div`
  background-color: var(--primary-color);
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  height: 90vh;
`;

const Logo = styled.img`
  border-radius: 100%;
  height: 10%;
  margin-top: 25px;
`;

const Links = styled(Link)`
  color: white;
  padding: 25px 0;
  text-decoration: none;
`;
