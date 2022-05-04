import styled from "styled-components";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DashboardContext } from "./DashboardContext";

const ClassesPreview = () => {
  return (
    <Wrapper>
      <h2>Classes</h2>
      <p>Some samaple text here</p>
      <p>Some samaple text here</p>
      <p>Some samaple text here</p>
      <p>Some samaple text here</p>
    </Wrapper>
  );
};

export default ClassesPreview;

const Wrapper = styled.div`
  background-color: var(--primary-color);

  border-radius: 15px;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;

  width: 30vw;
  max-height: 350px;
  /* max-height: 50px; */
  /* overflow: scroll; */
`;
