import styled from "styled-components";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const SideMenu = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      {/* placeholder logo */}
      <Logo
        src="/images/superhero4.png"
        onClick={() => {
          navigate("/dashboard");
        }}
      />
      <Links to="/updateProfile">Update Profile</Links>
      {/* <Links to="/myclasses">My Classes</Links> */}
      <Links to="/mystudentlist">My Students</Links>
      <Links to="/myreports">My Report Cards</Links>
      <Links to="/post">Make Announcement</Links>
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
  margin-right: 20px;
`;

const Logo = styled.img`
  /* background-color: white; */
  /* border-radius: 100px; */
  height: 70px;
  width: 70px;
  margin-top: 25px;

  &:hover {
    cursor: pointer;
  }
`;

const Links = styled(Link)`
  color: white;
  padding: 25px 0;
  text-decoration: none;
`;
