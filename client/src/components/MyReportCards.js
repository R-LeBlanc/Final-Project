import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";

import { DashboardContext } from "./DashbordComponents/DashboardContext";
import { ReportContext } from "./ReportCardComponents/ReportContext";
import SideMenu from "./DashbordComponents/SideMenu";
import ScienceReport from "./ReportCardComponents/ScienceReport";
import EnglishReport from "./ReportCardComponents/EnglishReport";
import MathReport from "./ReportCardComponents/MathReport";

const MyReportCards = () => {
  const { userDashboard, usersStudents } = useContext(DashboardContext);
  const { grades, setGrades, allClasses } = useContext(ReportContext);
  const [classes, setClasses] = useState();
  const [selectedClass, setSelectedClass] = useState();
  // console.log("", usersStudents);

  const handleOnClick = async (event) => {
    // console.log(event.target.value);
    const res = await fetch(
      `/classlist/${userDashboard.id}/${event.target.value}`
    );
    const data1 = await res.json();
    // console.log(data1.data[0]);
    setClasses(data1.data[0]);
    // TODO: Maybe fetch all the grades for the class at once?
    // Also fetch them in the dashboard home so that i can access
    // them on other pages too
    const response = await fetch(`/report/${event.target.value}`);
    const data = await response.json();
    setGrades(data.data);
  };

  // TODO: create a function that will calculate the final grade everytime
  // a grade is changed

  return (
    <Wrapper>
      <SideMenu />
      <SecondaryWrap>
        <Title>My Report Cards</Title>
        <ClassesWrap>
          {/* <ClassesWrap2> */}
          <Buttons>
            <View>Select a class:</View>
            <Select
              id="classSelect"
              name="classSelect"
              onChange={(event) => {
                handleOnClick(event);
              }}
            >
              {userDashboard &&
                userDashboard.classes.map((c) => {
                  return <Option key={c}>{c}</Option>;
                })}
            </Select>
          </Buttons>
          {classes && classes.classID === "SCI_GR5" ? (
            <ScienceReport classes={classes} />
          ) : (
            ""
          )}
          {classes && classes.classID === "ENG_GR5" ? (
            <EnglishReport classes={classes} />
          ) : (
            ""
          )}
          {classes && classes.classID === "MA_GR5" ? (
            <MathReport classes={classes} />
          ) : (
            ""
          )}
        </ClassesWrap>
      </SecondaryWrap>
    </Wrapper>
  );
};

export default MyReportCards;

const Wrapper = styled.div`
  display: flex;
`;

const SecondaryWrap = styled.div`
  /* background-color: lightblue; */
  display: flex;
  flex-direction: column;
  width: 100%;
  /* justify-content: space-between; */
`;

const Title = styled.div`
  font-size: 2rem;
  font-family: var(--font-header);
  padding: 20px 0;
`;

const ClassesWrap = styled.div`
  /* background-color: pink; */
  /* border-radius: 15px; */
  /* color: white; */
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const ClassesWrap2 = styled.div`
  background-color: var(--primary-color);
  border-radius: 15px;
  /* color: white; */
  display: flex;
  align-items: center;
  flex-direction: column;
  /* justify-content: space-evenly; */
  height: 60%;
  width: 80%;
`;

const Buttons = styled.div`
  /* background-color: pink; */
  display: flex;
  justify-content: flex-end;
  padding: 10px 0 30px;
  width: 90%;
`;

const View = styled.label`
  border: none;
  font-size: 1.5rem;
  padding: 5px 10px;
  margin-left: 7px;
`;

const Select = styled.select`
  border-radius: 5px;

  &:hover {
    /* color: white;
    background-color: var(--accent-color); */
    cursor: pointer;
  }
`;

const Option = styled.option``;
