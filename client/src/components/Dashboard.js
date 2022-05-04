import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Doughnut } from "react-chartjs-2";
import { useAuth } from "./AuthContext";
import { DashboardContext } from "./DashbordComponents/DashboardContext";

import SideMenu from "./DashbordComponents/SideMenu";
import StudentPreview from "./DashbordComponents/StudentPreview";
import ClassesPreview from "./DashbordComponents/ClassesPreview";
import { data } from "./DashbordComponents/ChartView";

const Dashboard = () => {
  // TODO: Update profile so I can use the profile information
  const { signIn, currentUser } = useAuth();
  const { userDashboard, setUserDashboard, usersStudents, setUsersStudents } =
    useContext(DashboardContext);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  // async fetch functions***************
  // Gets the teacher's dashboard info from the data base
  const dashboardAndStudents = async () => {
    const response = await fetch(`/dashboard/${currentUser.email}`);
    const data = await response.json();
    setUserDashboard(data.data[0]);
  };
  // gets the teacher's students based of the id's retrieved in the teacher dashboard
  const getStudents = async () => {
    const studentArray = [];
    userDashboard.students.map(async (student) => {
      const response = await fetch(`/students/${student}`);
      const data = await response.json();
      studentArray.push(data.data[0]);
    });
    setUsersStudents(studentArray);
    // console.log(usersStudents);
  };
  // *************************************

  useEffect(() => {
    // can try moving this to the sign in page?
    dashboardAndStudents();

    // if (userDashboard) {
    // }
    //   getStudents();
    // setDashboardLoading(false);
  }, []);

  useEffect(() => {
    getStudents();
    setDashboardLoading(false);
  }, [userDashboard]);
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log(user.email, user.displayName);
  //   } else {
  //     console.log("no user");
  //   }
  // });
  // console.log(userDashboard);
  return (
    <Wrapper>
      <SideMenu />
      {dashboardLoading ? (
        <h1>Loading</h1>
      ) : (
        <SecondaryWrap>
          {currentUser.displayName ? (
            <Title>{currentUser.displayName} Dashboard</Title>
          ) : (
            <Title>Teachers Dashboard</Title>
          )}
          {!dashboardLoading && (
            // Preview components for dashboard
            <ComponentWrapper>
              <StudentPreview />
              <LeftSide>
                <ChartWrap>
                  <h2>Class Average's</h2>
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
  /* background-color: lightblue; */
  display: flex;
  flex-direction: column;
  width: 100%;
  /* justify-content: space-between; */
`;

const Title = styled.div`
  font-size: 2rem;
  font-family: var(--font-header);
`;

const ComponentWrapper = styled.div`
  /* background-color: pink; */
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  height: 70%;
`;

const ChartWrap = styled.div`
  /* background-color: lightblue; */
  max-width: 300px;
`;

const ClassList = styled.div``;
