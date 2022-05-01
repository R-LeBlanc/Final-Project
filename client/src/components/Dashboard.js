import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "./AuthContext";
import { DashboardContext } from "./DashbordComponents/DashboardContext";

import SideMenu from "./DashbordComponents/SideMenu";
import StudentPreview from "./DashbordComponents/StudentPreview";

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
  };
  // *************************************

  useEffect(() => {
    dashboardAndStudents();

    if (userDashboard) {
      getStudents();
      setDashboardLoading(false);
    }
  }, []);
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log(user.email, user.displayName);
  //   } else {
  //     console.log("no user");
  //   }
  // });
  console.log(usersStudents);
  return (
    <Wrapper>
      <SideMenu />
      <SecondaryWrap>
        {currentUser.displayName ? (
          <Title>{currentUser.displayName} Dashboard</Title>
        ) : (
          <Title>Teachers Dashboard</Title>
        )}
        {!dashboardLoading && (
          <ComponentWrapper>
            <StudentPreview />
          </ComponentWrapper>
        )}
      </SecondaryWrap>
      {/* <Link to="/updateProfile">Update Profile</Link> */}
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
`;

const SecondaryWrap = styled.div``;

const Title = styled.div`
  background-color: pink;
  /* height: auto; */
`;

const ComponentWrapper = styled.div`
  display: flex;
`;

const ClassList = styled.div``;
