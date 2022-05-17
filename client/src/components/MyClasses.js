import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";

import { DashboardContext } from "./DashbordComponents/DashboardContext";
import SideMenu from "./DashbordComponents/SideMenu";

const MyClasses = () => {
  const { userDashboard } = useContext(DashboardContext);
  const [classes, setClasses] = useState();
  // console.log(userDashboard);

  const getClasses = async () => {
    const response = await fetch(`/classlist/${userDashboard.id}`);
    const data = await response.json();
    console.log(data.data);
    setClasses(data.data);
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <Wrapper>
      <SideMenu />
      <SecondaryWrap>
        <Title>My Classes</Title>
        <ClassesWrap>
          <ClassesWrap2>
            {/* <Buttons>
              <View>Class View</View>
              <View>Student View</View>
            </Buttons> */}
            <Table>
              <Row>
                <TableTitles>Sheet Name</TableTitles>
                <TableTitles>Class Code</TableTitles>
                <TableTitles>Grade</TableTitles>
                <TableTitles>Teacher(s)</TableTitles>
                <TableTitles>Average</TableTitles>
                <TableTitles>Median</TableTitles>
              </Row>
              {!classes ? (
                <h1>Loading</h1>
              ) : (
                classes.map((c) => {
                  return (
                    <Row key={c.classID}>
                      <Classes>{c.name}</Classes>
                      <Classes>{c.classID}</Classes>
                      <Classes>5</Classes>
                      <Classes>{userDashboard.name}</Classes>
                      {/* TEMP DATA */}
                      <Classes>78</Classes>
                      <Classes>70</Classes>
                    </Row>
                  );
                })
              )}
            </Table>
          </ClassesWrap2>
        </ClassesWrap>
      </SecondaryWrap>
    </Wrapper>
  );
};

export default MyClasses;

const Wrapper = styled.div`
  display: flex;
`;

const SecondaryWrap = styled.div`
  /* background-color: lightblue; */
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
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
  /* flex-direction: column; */
  justify-content: center;
  height: 100%;
`;

const ClassesWrap2 = styled.div`
  background-color: var(--primary-color);
  border-radius: 15px;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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

const View = styled.button`
  border: none;
  padding: 5px 10px;
  margin-left: 7px;

  &:hover {
    color: white;
    background-color: var(--accent-color);
    cursor: pointer;
  }
`;

const Table = styled.table`
  /* background-color: pink; */
  font-family: var(--font-body);
  text-align: left;
  width: 90%;

  th,
  td {
    border: 1px solid var(--accent-color);
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: var(--secondary-color);
  }
`;

const Row = styled.tr``;

const TableTitles = styled.th`
  /* background-color: var(--accent-color); */
  font-family: var(--font-header);
`;

const Classes = styled.td`
  /* background-color: pink; */
  /* display: flex;
  justify-content: space-evenly;
  width: 100%; */
`;
