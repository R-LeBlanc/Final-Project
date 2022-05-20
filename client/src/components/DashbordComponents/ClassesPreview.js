import styled from "styled-components";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DashboardContext } from "./DashboardContext";
import { ReportContext } from "../ReportCardComponents/ReportContext";

const ClassesPreview = () => {
  const { userDashboard } = useContext(DashboardContext);
  const { grades, setGrades, allClasses, setAllClasses } =
    useContext(ReportContext);
  // console.log(allClasses);
  return (
    <Wrapper>
      <h2>Classes:</h2>
      {!userDashboard ? (
        <h1>Loading</h1>
      ) : (
        userDashboard.classes.map((c) => {
          return <p key={c}>{c}</p>;
        })
      )}
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
