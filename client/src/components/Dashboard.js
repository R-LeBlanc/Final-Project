import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Doughnut } from "react-chartjs-2";
import { useAuth } from "./AuthContext";
import { DashboardContext } from "./DashbordComponents/DashboardContext";
import { ReportContext } from "./ReportCardComponents/ReportContext";

import SideMenu from "./DashbordComponents/SideMenu";
import StudentPreview from "./DashbordComponents/StudentPreview";
import ClassesPreview from "./DashbordComponents/ClassesPreview";
import { data } from "./DashbordComponents/ChartView";

const Dashboard = () => {
  // TODO: Update profile so I can use the profile information
  const { signIn, currentUser } = useAuth();
  const { grades, setGrades, allClasses, setAllClasses } =
    useContext(ReportContext);
  const { userDashboard, setUserDashboard, usersStudents, setUsersStudents } =
    useContext(DashboardContext);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [useSwitch, setUseSwitch] = useState(true);

  // console.log("", selectedReport);

  // async fetch functions***************
  // Gets the teacher's dashboard info from the data base
  const dashboardAndStudents = async () => {
    const response = await fetch(`/dashboard/${currentUser.email}`);
    const data = await response.json();
    await setUserDashboard(data.data[0]);
  };

  const getAllClasses = async () => {
    setAllClasses([]);
    const classesArray = [];
    const waitForFetch = async () => {
      userDashboard.classes.forEach(async (c) => {
        const response = await fetch(`/classlist/${userDashboard.id}/${c}`);
        const data = await response.json();
        classesArray.push(data.data[0]);
        setAllClasses((prev) => [...prev, data.data[0]]);
      });
      return classesArray;
    };
    await waitForFetch();
  };

  // gets the teacher's students based of the id's retrieved in the teacher dashboard
  const getStudents = async () => {
    setUsersStudents([]);
    const studentArray = [];
    const waitForFetch = async () => {
      userDashboard.students.map(async (student) => {
        const response = await fetch(`/students/${student}`);
        const data = await response.json();
        setUsersStudents((prev) => [...prev, data.data[0]]);
      });
      return studentArray;
    };
    await waitForFetch();
  };
  // *************************************

  useEffect(() => {
    dashboardAndStudents();
    setUseSwitch(false);
  }, []);

  useEffect(() => {
    if (!useSwitch) {
      getAllClasses();
      getStudents();
      setDashboardLoading(false);
      // This switch makes sure that the students are set only once!
      setUseSwitch(true);
    }
  }, [userDashboard]);

  return (
    <Wrapper>
      <SideMenu />
      {dashboardLoading ? (
        <h1>Loading</h1>
      ) : (
        <SecondaryWrap>
          {currentUser.displayName ? (
            <Title> Welcome {currentUser.displayName}!</Title>
          ) : (
            <Title>Teachers Dashboard</Title>
          )}
          {!dashboardLoading && (
            // Preview components for dashboard
            <ComponentWrapper>
              <StudentPreview />
              <LeftSide>
                <ChartWrap>
                  <h2>Class Averages</h2>
                  <Doughnut
                    data={data}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                    }}
                    style={{ height: "50px" }}
                  />
                </ChartWrap>
                <ClassesPreview />
              </LeftSide>
            </ComponentWrapper>
          )}
        </SecondaryWrap>
      )}
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
`;

const SecondaryWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
  font-family: var(--font-header);
  padding-top: 20px;
`;

const ComponentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70%;
`;

const Container = styled.div``;

// const StudentWrap = styled.div`
//   background-color: var(--secondary-color);
//   /* background-image: linear-gradient(
//     to bottom right,
//     var(--secondary-color),
//     var(--primary-color)
//   ); */
//   border-radius: 20px;
//   display: flex;
//   justify-content: space-between;
//   padding: 10px 20px;
//   margin: 10px 0;
// `;

// const Image = styled.div`
//   background-color: white;
//   border-radius: 100%;
//   color: var(--accent-color);
//   width: 20px;
//   height: 20px;
//   text-align: center;
// `;

// const Name = styled.p`
//   /* padding-right: 20px; */
// `;

// const StudentId = styled.h3``;

const ChartWrap = styled.div`
  /* background-color: lightblue; */
  max-width: 300px;
`;

// const ClassList = styled.div``;
