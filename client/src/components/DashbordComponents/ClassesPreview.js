import styled from "styled-components";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DashboardContext } from "./DashboardContext";
import { ReportContext } from "../ReportCardComponents/ReportContext";

const ClassesPreview = () => {
  const { userDashboard } = useContext(DashboardContext);
  const { grades, setGrades, allClasses, setAllClasses } =
    useContext(ReportContext);
  // console.log(userDashboard);
  const classesArr = () => {
    return allClasses.map((c) => {
      return (
        <ClassesWrap key={c.classID}>
          {/* <Image src="/images/superhero3.png" /> */}
          <p>{c.name}</p>
          <h3>{c.classID}</h3>
        </ClassesWrap>
      );
    });
  };

  return (
    <Wrapper>
      <h2>Classes:</h2>
      {allClasses && classesArr()}
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

const ClassesWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  align-items: center;
`;
